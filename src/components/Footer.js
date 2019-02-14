import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Button, Form, Navbar, Nav } from 'react-bootstrap';

class Footer extends Component {


render(){
  return(

    <div>
        <div />
        <Navbar>
          <Link to="#">Footer link</Link>
        </Navbar>
    </div>
  );
}

}

export default Footer
