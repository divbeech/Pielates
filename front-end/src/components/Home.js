import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
// import { Redirect } from "react-router-dom";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      username: '',
      errors: false
    };
  }
  myChangeHandler = (event) => {
    this.setState({username: event.target.value});
  }
  mySubmitHandler = (e) => {
    e.preventDefault();
    // console.log("user: " + this.state.username);
    if (this.props.checkUsername(this.state.username)) {
        this.props.history.push('/Profile')
    } else {
      this.setState({ 
        errors: true,
        username: ''});
    };
  };
  render() {
    return (
      <div>
        <div id="login-form">
          <form>
          <input placeholder="username"
            type='text'
            onChange={this.myChangeHandler}
          />
          <br></br>
          <br></br>
          <Button variant="primary" onClick={this.mySubmitHandler} type="submit">Login</Button>
          </form>
          <br></br>
          {this.state.errors ? "Incorrect Username" : '' }
        </div>
      </div>
    )
  }
}
export default Home