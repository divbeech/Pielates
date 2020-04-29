import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

function MenuBar (props) {
  function onClickHandler(e) {
    e.preventDefault();
    props.logout();
    props.history.push('/')
  }

  return (
    <div id="menubar">
      <Button onClick={onClickHandler} variant="primary">Logout</Button>
    </div>
  )
}
export default MenuBar