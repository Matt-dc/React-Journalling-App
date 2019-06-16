import React, { Component } from 'react';
import './styles/loginForm.css'
import { Button, Modal, Form, Navbar, Nav, FormControl,InputGroup, Span, Container } from 'react-bootstrap';

class SignupForm extends Component {
  
  render(){
    return (

    <Modal.Dialog>
    <Modal.Header>
      <Modal.Title>It's great to have you onboard!</Modal.Title>
    </Modal.Header>

    <Modal.Body>
      <p>Modal body text goes here.</p>
    </Modal.Body>

    <Modal.Footer>
      <Button variant="secondary">Close</Button>
      <Button variant="primary">Save changes</Button>
    </Modal.Footer>
  </Modal.Dialog>

    );
  }
}

export default SignupForm