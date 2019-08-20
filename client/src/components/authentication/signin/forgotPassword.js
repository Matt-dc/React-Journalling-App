import React, { Component } from 'react'
import { Form, Button, Container, Row, Col, Modal } from 'react-bootstrap'
import { Link, Redirect } from 'react-router-dom'

import axios from 'axios'
import Spinner from '../../utils/spinner'


export default class ForgotPassword extends Component {

    state={
        submitted: false,
        spinner: false,
    }

    changeHandler = e => {
        this.setState({
            [ e.target.name ]: e.target.value
        })
    }

    handleSubmit = e => {

        e.preventDefault();

        const email = { email: this.state.email }

        this.setState({
            spinner: true
        })

        axios.post('/users/recoverpassword', email)
        .then(res => {
           
           this.setState({
               submitted: true,
               msg: res.data.msg,
               spinner: false,
           }) 
       })
       .catch(err => {
            this.setState({
                submitted: false,
                error: "That email appears not to be in our system",
                spinner: false,
            }) 
       });
    }


    render() {
    

        return (

            this.state.submitted ?
            
            <Container>

                <Row className="user-message">
                    <Col>
                        <h1>{this.state.msg.title}</h1>
                    </Col>
                </Row>
                <Row className="user-message">
                    <Col>
                        <h5>{this.state.msg.body}</h5>
                    </Col>
                    
                </Row>
                {this.state.id}
            
                {this.state.msg.showRedirect && <Row className="user-message">
                    <Col>
                        <Link className="link-as-button"
                            to={{pathname: this.state.msg.to, 
                                state: { id: this.state.id, email: this.state.email, set: true }}} 
                            >{this.state.msg.btnTxt}
                        </Link>
                    </Col>
                </Row> }

            </Container>
           
            : 

            <Container>
          
                <Row className="user-message" style={{margin: '2em 0'}} > 
                    <Col sm={2}></Col>
                    <Col>
                        <h1>Login Recovery</h1>
                    </Col>
                    <Col sm={2}></Col>
                </Row>
                <Row className="center" style={{margin: '2em 0'}}> 
                    <Col>
                        <h6>Enter your email and we'll send you a link to reset your password</h6>
                    </Col>
                </Row>
                <Row style={{margin: '2em 0'}}>
                    <Col sm={3} md={3}></Col>
                    <Col sm={6} md={6}>
                        <Form>
                            <Form.Group controlId="formBasicEmail">
                            <Form.Control onChange={this.changeHandler} name="email" type="email" value={this.state.email} placeholder="Enter email" />
                        
                            </Form.Group>
                        </Form>
                        <p style={{color: 'red'}}>{this.state.error}</p>
                    </Col>    
                </Row>
                <Row>
                    <Col className="center" style={{marginBottom:'3%'}}>  
                        <Button variant="dark" onClick={this.handleSubmit}> {this.state.spinner ? 
                            <span><Spinner spinning="spinning" size="1x" /></span> : 'Send' }
                        </Button>
                    </Col>
                </Row>

            </Container>

        )
    }
}
