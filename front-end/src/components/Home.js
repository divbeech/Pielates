import React, { Component } from 'react';
import MenuBar from './MenuBar'
class Home extends Component {
  // componentDidUpdate() {
  //   return this.props.isLoggedIn ? null : this.redirect()
  // }
  // redirect = () => {
  //   this.props.history.push('/login')
  // }
  render() {
    return (
      <div>
        <h1>Home</h1>
      </div>
    )
  }
}
export default Home