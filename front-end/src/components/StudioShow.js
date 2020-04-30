import React from 'react';

const StudioShow = (props) => {
  console.log(props);

  function handleMembership (e) {
  let membershipObj = {
    user_id: props.current_user.id,
    studio_id: props.location.state.current_studio.id,
    // favorite: 
  }

  fetch("http://localhost:3000/memberships", {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify(membershipObj)
  })
  .then(resp => resp.json())
  .then(data => {
    // console.log(data)
    // this.add({memberships: data}, ()=>{
      // console.log(this.state.memberships)})
     props.addMembership(data)
    //  <Route path="/searchresults" render={props =>(<SearchResults {...props} {...this.state} />)}/>
    props.history.push("/profile")
  })
} //end of handleMembership

function handleRemove (e) {
  // console.log(e.target.dataset.id)
  fetch(`http://localhost:3000/memberships/${e.target.studio.id}`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "DELETE"
  })
  .then(resp => resp.json())
  .then(data => {
    this.setState({memberships: data}, ()=>{
      console.log("memberships after removal: ", this.state.memberships)})
  })
} //end of handleRemove

    return (
        <div className="polaroid">
          {console.log(props)}
          <button onClick={handleMembership}>Become a Member</button>
          {/* <button onClick={handleRemove}>Delete</button> */}
          <h1>{props.location.state.current_studio.name}<br/>
            <p>{props.location.state.current_studio.address}<br/>
            {props.location.state.current_studio.price}<br/>
            {props.location.state.current_studio.rating} </p> 
            {props.location.state.current_studio.reviews}</h1>
          <img src={props.location.state.current_studio.image_url} />
          <div className="imagecontainer">
          </div>
        </div>
      );
}



export default StudioShow;

