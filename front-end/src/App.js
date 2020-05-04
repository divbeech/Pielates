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
  componentDidMount() {
    this.getUsers();
    this.getStudios();
    this.getMemberships();
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
      let user = JSON.parse(localStorage.getItem('user'));
      if (user) {
        this.checkUsername(user.username)
        this.setRedirect()
      }
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
  logout = () => {
    localStorage.clear();
    this.setState({
      current_user: undefined,
    })
  }
  setSearchResult = (results) => {
    this.setState({ 
      search_results: results
    }, () => console.log("search results", this.state.search_results))
  }
  addMembership =(data) => {
    let new_studio = this.state.studios.find(studio => studio.id === data.studio_id);
    this.setState({
      memberships: [...this.state.memberships, data],
      user_studios: [...this.state.user_studios, new_studio]
    });
  }
  removeStudio =(data) => {
    let newMemberships = this.state.memberships.filter(membership => membership.studio_id !== data.id)
    let newUserStudios = this.state.user_studios.filter(user_studio => user_studio.id !== data.id)
    this.setState({
      memberships: newMemberships,
      user_studios: newUserStudios
    });
  }
  isFavorite = (data) => {
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
            PieLates
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
                isFavorite={this.isFavorite}
                getUsers={this.getUsers}
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