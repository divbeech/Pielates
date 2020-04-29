import React from 'react';

const StudioListing = (props) => {
  return (
    <div className="polaroid">
      <img src={props.studio.image_url} />
      <div className="imagecontainer">
       <p>{props.studio.name}</p> <br />
        <p>{props.studio.address}</p> </div>
    </div>
  );
}

export default StudioListing;
