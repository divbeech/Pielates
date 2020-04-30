import React, { Component } from 'react';
import './App.css';
import Home from './components/Home'
import About from './components/About'
import Profile from './components/Profile'
import SearchResults from './components/SearchResults'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import StudioShow from './components/StudioShow';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      current_user: '',
      users: [],
      studios: [],
      memberships: [],
      search_results: []
    };
  }

  // let thisUsersMemberships = memberships.filter(m => m.user_id === current_user.user_id)
  // thisUsersMemberships.map(membership => membership.studio_id)

  componentDidMount() {
    this.getUsers();
    this.getStudios();
    this.getMemberships();
    let user = JSON.parse(localStorage.getItem('user'))
    if (user) 
      this.setState({
        current_user: user
      })
    }
  }

  handleMembership = (e) => {
    let membershipObj = {
      user_id: props.current_user.id,
      studio_id: props.location.state.current_studio.id,
      // favorite: 
    }

    fetch("http://localhost:3000/memberships", {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify(membershipObj)
    })
    .then(resp => resp.json())
    .then(data => {
    // console.log(data)
    // this.add({memberships: data}, ()=>{
      // console.log(this.state.memberships)})
     props.addMembership(data)
    //  <Route path="/searchresults" render={props =>(<SearchResults {...props} {...this.state} />)}/>
    props.history.push("/profile")
  })
} //end of handleBookmark

handleRemoveMembership = (e) => {
  console.log(e)
  // fetch(`http://localhost:3000/memberships/${e.target.value.studio.id}`, {
  //     headers: {
  //       'Accept': 'application/json',
  //       'Content-Type': 'application/json'
  //     },
  //     method: "DELETE"
  // })
  // .then(resp => resp.json())
  // .then(data => {
  //   this.setState({memberships: data}, ()=>{
  //     console.log("memberships after removal: ", this.state.memberships)})
  // })
 } //end of handleRemove

  getUsers = () => {
    fetch("http://localhost:3000/users")
    .then (resp => resp.json())
    .then (json => {
      this.setState((prevState, props) => ({
        users: json
      }))
      // console.log(json)
    })
  }

  getStudios = () => {
    fetch("http://localhost:3000/studios/")
    .then (resp => resp.json())
    .then (json => {
      this.setState((prevState, props) => ({
        studios: json
      }))
      // console.log(json)
    })
  }

  getMemberships = () => {
    fetch("http://localhost:3000/memberships/")
    .then (resp => resp.json())
    .then (json => {
      this.setState((prevState, props) => ({
        memberships: json
      }))
      // console.log(json)
    })
  }
  
  checkUsername = (username) => {
    let user = this.state.users.find((user) => username === user.username)
    if (user) {
      this.setState({
        current_user: user
      }, () => localStorage.setItem('user', JSON.stringify(this.state.current_user)))
      return true;
    } else {
      return false;
    }
  } 

  logout = () => {
    localStorage.clear();
    this.setState({
      current_user: undefined
    })
  }

  setSearchResult = (results) => {
    this.setState({ 
      search_results: results
    }, () => console.log(this.state.search_results) )
  }

  addMembership =(data) => {
    this.setState({
      memberships: [...this.state.memberships, data]
    })

  }


  render() {
    return (
      <Router>
        <div id="container">
          <Switch>
            <Route exact path='/' render={props => (<Home {...props} checkUsername={this.checkUsername} />)}/>
            <Route path="/about">
              <About />
            </Route>
            <Route path="/profile" render={props => (
              <Profile 
                {...props}
                {...this.state}
                logout={this.logout}
                current_user={this.state.current_user} 
                studios={this.state.studios} 
                setSearchResult={this.setSearchResult}
                />)}>
            </Route>
            <Route path="/searchresults" render={props =>(<SearchResults {...props} {...this.state} />)}/>
            <Route path="/studioshow" render={props =>(<StudioShow {...props} {...this.state} addMembership = {this.addMembership} />)}/>
          </Switch>
          
        </div>
      </Router>
    );
  }
}

export default App;

