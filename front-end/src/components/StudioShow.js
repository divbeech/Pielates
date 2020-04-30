import React from 'react';

const StudioShow = (props) => {
    return (
        <div className="polaroid">
          {console.log(props)}
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

