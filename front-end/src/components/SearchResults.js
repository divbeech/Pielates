import React from 'react';
import StudioListing from './StudioListing';

const SearchResults = (props) => {
  return (
    <div>
      {console.log(props)}
      <h1>Studios</h1>
      { props.search_results.map((ele) => <StudioListing studio={ele} /> )}
    </div>
  );
}

export default SearchResults;