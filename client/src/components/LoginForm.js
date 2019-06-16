import React, { Component } from 'react';
import './styles/loginForm.css'
import { Button, Form, Navbar, Nav, FormControl,InputGroup, Modal, Span, Container } from 'react-bootstrap';


class LoginForm extends Component {
    render(){
        return(
            <Modal.Dialog>
            <Modal.Header>
              <Modal.Title>Welcome Back!</Modal.Title>
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
export default LoginForm