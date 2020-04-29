import React, { Component } from 'react';
import './App.css';
import Home from './components/Home'
import About from './components/About'
import Studios from './components/Studios'
import MenuBar from './components/MenuBar'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      users: [],
      studios: [],
      memberships: []
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
      console.log(json)
    })
  }
  getStudios = () => {
    fetch("http://localhost:3000/studios/")
    .then (resp => resp.json())
    .then (json => {
      this.setState((prevState, props) => ({
        studios: json
      }))
      console.log(json)
    })
  }
  getMemberships = () => {
    fetch("http://localhost:3000/memberships/")
    .then (resp => resp.json())
    .then (json => {
      this.setState((prevState, props) => ({
        memberships: json
      }))
      console.log(json)
    })
  }
  render() {
    return (
      <Router>
      <div id="container">
        <MenuBar />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/studios">
            <Studios />
          </Route>
        </Switch>
      </div>
    </Router>
    );
  }
}
export default App;