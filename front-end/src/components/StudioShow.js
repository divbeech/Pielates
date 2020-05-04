import React from 'react';
const StudioShow = (props) => {
    // console.log(props);
    function handleMembership (e) {
        let membershipObj = {
            user_id: props.current_user.id,
            studio_id: props.location.state.current_studio.id,
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
            props.addMembership(data)
            props.history.push("/profile")
            })
    } //end of handleMembership
    return (
        <div className="polaroid-large">
            <div className="imagecontainer">
                <img alt={props.location.state.current_studio.name} src={props.location.state.current_studio.image_url} />
            </div>
            <h1>{props.location.state.current_studio.name}</h1>
            <h5>{props.location.state.current_studio.address}</h5>
            Monthly Cost: {props.location.state.current_studio.price}<br/>
            Rating: {props.location.state.current_studio.rating} <br/>
            Reviews: {props.location.state.current_studio.reviews}<br/>
            <button onClick={handleMembership}>Become a Member</button>
            <br></br>
            <br></br>
        </div>
    );
}
export default StudioShow;