import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
function MenuBar (props) {
  return (
    <div id="menubar">
      <Button variant="primary"><Link to="/">Logout</Link></Button>
    </div>
  )
}
export default MenuBar