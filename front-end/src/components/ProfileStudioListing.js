import React, { Component } from 'react'

class ProfileStudioListing extends Component {

  handleRemove = (e) => {

    let membershipToRemove = this.props.memberships.find(membership => membership.studio_id === this.props.studio.id)

    console.log(membershipToRemove.id);

    fetch(`http://localhost:3000/memberships/${membershipToRemove.id}`, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: "DELETE"
    })
    .then(resp => resp.json())
    .then(data => {
      // console.log("ProfileStudioListings  delete:", data)
      this.props.removeStudio(this.props.studio)
    })
  } //end of handleRemove




  handleFavorite = () => {

    let membershipToFavorite = this.props.memberships.find(membership => membership.studio_id === this.props.studio.id)

    fetch(`http://localhost:3000/memberships/${membershipToFavorite.id}`, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: "PATCH",
        body: JSON.stringify({
          favorite: true
        })
    })
    .then(resp => resp.json())
    .then(data => {
      console.log("ProfileStudioListings  patch:", data)
    })
  } //end of handleFavorite


  handleUnfavorite = () => {

    let membershipToFavorite = this.props.memberships.find(membership => membership.studio_id === this.props.studio.id)

    fetch(`http://localhost:3000/memberships/${membershipToFavorite.id}`, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: "PATCH",
        body: JSON.stringify({
          favorite: false
        })
    })
    .then(resp => resp.json())
    .then(data => {
      console.log("ProfileStudioListings  patch:", data)
    })
  } //end of handleUnFavorite



  render() {
    return (
        <div className="polaroid">
            <div className="imagecontainer">
              {console.log("profilestudiolisting: ", this.props)}
              <h3>{this.props.studio.name} {this.props.isFavorite(this.props.studio) ? "*Fav*" : ""}</h3> 
              <img alt={this.props.studio.name} src={this.props.studio.image_url} />
              <p>{this.props.studio.address}</p> 
            <button onClick={this.handleRemove}>Cancel Membership</button>
            <button onClick={this.handleFavorite}>Make Favorite</button>
            <button onClick={this.handleUnfavorite}>UnFavorite</button>
            </div>
            <br></br>
        </div>
    );
  }
}

export default ProfileStudioListing;
