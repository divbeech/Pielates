import React, { Component } from 'react';

// import { Redirect } from 'react-router-dom'
import ProfileStudioListing from './ProfileStudioListing';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
      // search_results: []
    };
  
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    // alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
    let results = this.props.studios.filter(studio=>studio.name.includes(this.state.value))
    // console.log(results)
    // clearing input
    this.setState({
      value: ''
      // search_results: results
    });
    this.props.setSearchResult(results) 
    this.props.history.push('/SearchResults')
  }

  render() {
    // console.log ("studios in profile: ", this.props)
    // console.log("profile", this.props)
    return (
      <div>
        <h1>Welcome { this.props.current_user.name }</h1>
        <br></br>
        <br></br>
        <form onSubmit={this.handleSubmit}>
          <label>Search for studios: </label>
          <input type="text" value={this.state.value} onChange={this.handleChange} />
          <input type="submit" value="Submit" />
        </form>
        <br/>
        <h4>You currently have memberships at:</h4>
        { this.props.user_studios && this.props.user_studios.map((studio) => <div key={studio.id} > <ProfileStudioListing studio={studio} {...this.props}/> </div>  )}
        </div>
    );
  }
}


export default Profile;
