import React, { Component } from 'react'
import { Redirect, Link } from 'react-router-dom';
import { Form, Button, Col, Row, Container, Modal } from 'react-bootstrap';

import axios from 'axios';
import Spinner from '../../utils/spinner'
import ContextWrapper from '../../../ContextWrapper'


class LoginModal extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            userId: '',
            redirect: false,
        }
    }

    changeHandler = e => {
        this.props.changeHandler(e)
    }

   

    render() {

        if(this.props.spinner) {
            return (
                <div className="spinner-container">
                    <Spinner size={2} />
                </div>
            )
        }

        if(this.props.redirectTo) {
            return <Redirect to="/" />
        }    
    
        return (

            <Modal {...this.props} size="lg" >
                <Modal.Header className="center" style={{ margin: "8% 0 2% 0"}}>
                    <Col className="center">
                        <h1>Welcome back!</h1>
                    </Col>
                    </Modal.Header>
                <Modal.Body>
                    <Container>
                    <Row className="show-grid">
                    <Col sm={2} md={2}></Col>
                    <Col className="center" sm={8} md={8}>
                        <p style={{fontSize: '0.9em', color:'#656565',
                        marginBottom: '5%'
                        }}>Stay up to date with all our articles 
                            and get our personalized recommendations about
                            all the things that are important to you.</p>
                    </Col>
                    <Col sm={2} md={2}></Col>
                    </Row>
                <Row>
                    <Col sm={3} md={3}></Col>
                    <Col sm={6} md={6}>
                        <Form  onSubmit={this.props.handleUserLogin}>
                            <Form.Group>
                            <Form.Label>Email</Form.Label>    
                            <Form.Control className="text-muted" type="email" id="email" name="email" onChange={this.changeHandler} value={this.props.email} />
                            </Form.Group>
                            <Form.Group>
                            <Form.Label>Password</Form.Label>
                            <Form.Control className="text-muted" type="password" id="password" name="password" onChange={this.changeHandler} value={this.props.password} />
                            </Form.Group>  
                            <Row style={{ margin: "2% 0"}}>
                                <Col className="center">
                                    <Button type="submit">Login</Button>
                                </Col>
                            </Row>
                        </Form>
                    </Col>
                    <Col sm={3} md={3}></Col>
                </Row>
                <Row className="center">
                    <Col style={{ fontSize: '0.8em', margin: '2em 0'}}>
                        <Link to="/forgotpassword" onClick={() => this.props.hideLogin()} style={{ color: '#2c4a93'}} >Forgot password?</Link>
                    </Col>
                </Row>
                    <Row className="center" style={{color: 'red'}}>
                        <Col>
                            <p>{this.props.error}</p>
                        </Col>
                    </Row>
                    <Row style={{ margin: "2% 0"}}>
                        <Col className="center">
                            <p>Now account? <span onClick={event => {this.props.hideLogin(); this.props.showSignup();}} style={{marginLeft: '1%', color:'#0069d9', cursor: 'pointer'}}>Create one</span></p>
                        </Col>
                    </Row>
                    <Row style={{ margin: " 5% 0 2% 0", color: '#656565', fontSize: '0.9em'}}>
                        <Col sm={1} md={1}></Col>
                        <Col sm={10} md={10} className="center">  
                            We log user data and share 
                            it with service providers to keep our site running. Click “Sign in” 
                            above to accept  ourTerms of Service and Privacy Policy.
                        </Col>
                        <Col sm={1} md={1}></Col>
                    </Row>
                    </Container>

                </Modal.Body>   

            </Modal>
            
        )
    }

}


export default ContextWrapper(LoginModal)
   

