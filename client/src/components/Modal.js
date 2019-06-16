import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Button, Form, Navbar, Nav, FormControl,InputGroup, Span, Container, ButtonGroup, ToggleButton } from 'react-bootstrap';
import './styles/modal.css'
import LoginForm from './LoginForm.js'
import SignupForm from './SignupForm.js'

class Modal extends Component {

render(){

      let form;
      if (this.props.showModal === "login") {
              form =  <LoginForm />;        
      } else if (this.props.showModal === "signup") {
               form  = <SignupForm />;  
      }
    
      return ReactDOM.createPortal(
         
            <div 
                className="modal-cover" 
                onClick={this.props.handleOutsideClick}
                >
                <div 
                    className="modal-area" 
                    ref={this.props.modalRef}>
                    {form}
                </div>
            </div>, 
          document.body
      );
    }
}
  
  export default Modal  
  

//   modalRef={n => props.modalRef = n}  
//   showModal={e => this.props.setModal(e)} 

//   modalRef={n => this.modalRef = n}  
//   showModal={e => this.props.setModal(e)} 
