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
      user_studios: [],
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
    // this.getMemberships();
    // console(current_user)
    let user = JSON.parse(localStorage.getItem('user'))
    if (user) 
      this.setState({
        current_user: user,
        user_studios: user.studios,
        memberships: user.memberships
      })
    }

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

  // getMemberships = () => {
  //   fetch("http://localhost:3000/memberships/")
  //   .then (resp => resp.json())
  //   .then (json => {
  //     this.setState((prevState, props) => ({
  //       memberships: json
  //     }))
  //     // console.log(json)
  //   })
  // }
  
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
    // console.log("data in addMembership: ", data);
    // console.log("this.state.current_user.studios: ", this.state.current_user.studios)
    // console.log("this.state.memberships: ", this.state.memberships)
    this.setState({
      memberships: [...this.state.memberships, data],
      user_studios: [...this.state.current_user.studios, this.state.memberships[data.studio_id]]
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

