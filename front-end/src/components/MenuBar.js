import React from 'react';
// import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { withRouter} from 'react-router-dom';

function MenuBar (props) {
  function onClickHandler(e) {
    e.preventDefault();
    props.logout();
    props.history.push('/')
  }

  return (
    <div id="menubar">
      <Button id="logout-button" variant="secondary" size="sm" onClick={onClickHandler}>Logout</Button>
    </div>
  )
}
export default withRouter(MenuBar)