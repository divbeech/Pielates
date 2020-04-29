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
  componentDidMount() {
    this.getUsers();
    this.getStudios();
    this.getMemberships();
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
      })
      return true;
    } else {
      return false;
    }
  } 

  setSearchResult = (results) => {
    this.setState({ 
      search_results: results
    }, () => console.log(this.state.search_results) )
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
                current_user={this.state.current_user} 
                studios={this.state.studios} 
                setSearchResult={this.setSearchResult}
                />)}>
            </Route>
            <Route path="/searchresults" render={props =>(<SearchResults {...props} {...this.state} />)}/>
          </Switch>
        </div>
      </Router>
    );
  }
}
export default App;