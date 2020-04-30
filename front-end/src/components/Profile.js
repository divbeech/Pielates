import React, { Component } from 'react';
import MenuBar from './MenuBar'
import { Redirect } from 'react-router-dom'
import StudioListing from './StudioListing';

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
console.log(this.props)
    return (
      <div>
        <MenuBar {...this.props} logout={this.props.logout} />
        <h1>Welcome { this.props.current_user.name }</h1>
        <form onSubmit={this.handleSubmit}>
          <label>
            <input type="text" value={this.state.value} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Submit" />
        </form>
        <br/>
        <hr/>
        <br/>
        { this.props.current_user.studios && this.props.current_user.studios.map((studio) => <div> <StudioListing studio= {studio}/> </div>  )}
        </div>
    );
  }
}


export default Profile;
