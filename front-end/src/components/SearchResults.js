import React from 'react';
import StudioListing from './StudioListing';

const SearchResults = (props) => {
  return (
    <div>
      {console.log("search results: ", props.search_results.length)}
      <h1>Studios</h1>
      { (props.search_results.length > 0) 
        ? 
        (props.search_results.map((ele) => <StudioListing key={ele.id} studio={ele} />))
        :
        "No search results found.  Go back and try again." }
    </div>
  );
}

export default SearchResults;
