import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Button, Form, Navbar, Nav } from 'react-bootstrap';

class CustomNav extends Component {



  render(){
    return(

      <div>
          <Navbar>
              <Navbar.Brand href="/">Journal It</Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                  <Nav.Link href="/">Home</Nav.Link>
                  <Nav.Link href="/posts">Posts</Nav.Link>
                  <Nav.Link href="/">Other</Nav.Link>
                  <Nav.Link href="/">Other</Nav.Link>

                  <Nav.Link href="/">Create an account</Nav.Link>
                  <Nav.Link href="/">Sign in</Nav.Link>

                </Nav>
              </Navbar.Collapse>
          </Navbar>

      </div>

    );
  }

}

export default CustomNav
