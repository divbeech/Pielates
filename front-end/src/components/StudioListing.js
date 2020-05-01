import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

class StudioListing extends Component {

  state = {
    redirect: false
  }

  setRedirect = () => {
    this.setState({
      redirect: true
    })
  }
  
  renderRedirect = () => {
    if (this.state.redirect) {
      return (<Redirect to={{
        pathname: '/StudioShow',
        state: { current_studio: this.props.studio }
      }} />)
    }
  }
  onClickHandler = (event) => {
    event.preventDefault();
    event.persist()
    console.log(this.props.studio);
    this.setRedirect();
  }

  render() {
    return (
        <div onClick={this.onClickHandler} className="polaroid">
            {this.renderRedirect()}
            <p>{this.props.studio.name}</p> <br />
            <img alt={this.props.studio.name} src={this.props.studio.image_url} />
            <div className="imagecontainer">
            <p>{this.props.studio.address}</p> </div>
            <br></br>
            <br></br>
        </div>
    );
  }
}

export default StudioListing;
