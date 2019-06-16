import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Button, Form, Navbar, Nav, FormControl,InputGroup, Span, Container } from 'react-bootstrap';
import './styles/CustomNav.css'

class CustomNav extends Component {

      constructor(props) {
        super(props);
      }

    render() {
      return(

      <div>

        <Navbar bg="dark" variant="dark" id="custom-nav" class="navbar navbar-default" expand="lg">

        <Navbar.Brand href="#home">Thought Book</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse>
          <Nav className="mr-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/posts">Posts</Nav.Link>
              <Nav.Link href="/post">New Post</Nav.Link>
              <Nav.Link href="/">Other</Nav.Link>

              <Nav.Link href="/MoreInfo"><span>Find out more</span></Nav.Link>
              <div id="login" class="navbar-text" onClick={this.props.handleModal} showModal={this.props.showModal}>Sign&nbsp;in</div>
              <InputGroup size="sm" className="mb-3">
                <FormControl placeholder="Search" aria-label="Small" aria-describedby="inputGroup-sizing-sm"/>
              </InputGroup>
          </Nav>
          </Navbar.Collapse>
        </Navbar>
     </div>


    );
  }
}

export default CustomNav
