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
import MenuBar from './components/MenuBar'
import { Redirect } from 'react-router-dom'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      current_user: '',
      user_studios: [],
      studios: [],
      memberships: [],
      search_results: [],
      redirect: false
    };
  }

  // let thisUsersMemberships = memberships.filter(m => m.user_id === current_user.user_id)
  // thisUsersMemberships.map(membership => membership.studio_id)

  componentDidMount() {
    this.getUsers();
    this.getStudios();
    // this.getMemberships();
    let user = this.getUser();
    console.log(user)

    if (user) {
      this.setState({
        current_user: user,
        user_studios: user.studios,
        memberships: user.memberships
      }, ()=> this.setRedirect())
    }
  }

  setRedirect = () => {
    this.setState({
      redirect: true
    })
  }
  
  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to='/Profile' />
    }
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
        current_user: user,
        user_studios: user.studios,
        memberships: user.memberships
      }, () => this.saveUser(user))
      return true;
    } else {
      return false;
    }
  } 

  saveUser = (user) => {
    if (user) {
      localStorage.removeItem('user');
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      return false;
    }
  }

  getUser = () => {
    let user = JSON.parse(localStorage.getItem('user'));
    this.getStudios();
    if (user) { 
      return user;
    } else {
      return false;
    }
  }

  logout = () => {
    localStorage.clear();
    this.setState({
      current_user: undefined,
      user_studios: [],
      studios: [],
      memberships: [],
      search_results: []
    })
  }

  setSearchResult = (results) => {
    this.setState({ 
      search_results: results
    }, () => console.log("search results", this.state.search_results))
  }

  addMembership =(data) => {
    // console.log("data in addMembership: ", data);
    // console.log("this.state.current_user.studios: ", this.state.current_user.studios)
    // console.log("state.studios", this.state.studios)
    // console.log("this.state.memberships: ", this.state.memberships)
    // console.log("this.state.memberships[data.studio_id", this.state.studios[data.studio_id])
    // console.log("new_studio", new_studio);

    let new_studio = this.state.studios.find(studio => studio.id === data.studio_id);

    this.setState({
      memberships: [...this.state.memberships, data],
      user_studios: [...this.state.user_studios, new_studio]
    });

    let user = this.getUser()
    if (user) {
      user.memberships = [...this.state.memberships, data];
      user.user_studios = [...this.state.user_studios, new_studio];
      this.saveUser();
    }
  }

  removeStudio =(data) => {
    // console.log("removeStudio - App:", data)
    let newMemberships = this.state.memberships.filter(membership => membership.studio_id !== data.id)
    let newUserStudios = this.state.user_studios.filter(user_studio => user_studio.id !== data.id)
console.log("remove Studio: newmemberships ", newMemberships)
console.log("remove Studio: newuserstudios", newUserStudios)

    this.setState({
      memberships: newMemberships,
      user_studios: newUserStudios
    });

    let user = this.getUser()
    if (user) {
      user.memberships = newMemberships;
      user.user_studios = newUserStudios;
      user.studios = newUserStudios;
      this.saveUser();
      console.log("remove user", user)
    }

  }

  addFavorite =(data) => {
    // add favorite to state
    // add favorite to localStorage
    // 
  }

  removeFavorite =(data) => {
    // remove favorite to state
    // remove favorite to localStorage
    // 
  }

  isFavorite = (data) => {
    // data should be a studio object
    let mb = this.state.memberships.find(membership => membership.studio_id === data.id);

    if (mb.favorite === true) {
      return true
    } else {
      return false
    }
  }

  render() {
    return (
      <Router>
        {this.renderRedirect()}
        <div id="header">
          <MenuBar logout={this.logout} />
          <div id="logo">
            <img alt="Pielates logo" src="pielates.png" />
          </div>
        </div>
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
                removeStudio={this.removeStudio}
                addFavorite={this.addFavorite}
                removeFavorite={this.removeFavorite}
                isFavorite={this.isFavorite}
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

