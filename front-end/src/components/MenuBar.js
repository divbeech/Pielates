import React from 'react';
import { NavLink } from 'react-router-dom';
import { Button, ButtonGroup } from 'react-bootstrap';
function MenuBar (props) {
  return (
    <div id="menubar">
      <ButtonGroup aria-label="Basic example">
        <Button variant="secondary"><NavLink exact to="/" activeClassName="selected" >Home</NavLink></Button>
        <Button variant="secondary"><NavLink to="/about" activeClassName="selected">About</NavLink></Button>
        <Button variant="secondary"><NavLink to="/studios" activeClassName="selected">Studios</NavLink></Button>
      </ButtonGroup>
    </div>
  )
}
export default MenuBar

