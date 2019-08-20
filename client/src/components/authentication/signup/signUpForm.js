import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { Form, Button, Container, Row, Col, Image } from 'react-bootstrap'

import axios from 'axios'
import Spinner from '../../utils/spinner'
import getDate from '../../utils/getDate'


export default class SignUpForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            username: '',
            image: null,
            password: '',
            password2: '',
            match: 'none',
            noMatch: 'none',
            error: null,
            redirect: false,
            submitted: false,
            set: false,
        }
    }


    componentWillMount(){
        if(this.props.location.state) {
            const { id } = this.props.location.state;
            const { email } = this.props.location.state;
            const { set } = this.props.location.state;    
       
            this.setState({
                id: id,
                email: email,
                set: set,
            })
        } else {
            return 
        }
    }

    changeHandler = e => {
        this.setState({
            error: '',
            [ e.target.name ] : e.target.value,
        }, () => {
            if(this.state.password === this.state.password2) {
                this.setState({
                    match: 'inline',
                    noMatch: 'none',
                })
            } else {
                this.setState({
                    match: 'none',
                    noMatch: 'inline',
                })
            }
        })
    }


    toggleViewPassword = () => {
        this.state.type === "password" ? this.setState({ type: 'text' }) : this.setState({ type: 'password' })
    }


    fileChangeHandler = e => {
        const img = e.target.files[0];

        let formData = new FormData()
        formData.append('image', img)
        const config = { headers: { 'Content-Type' : 'multipart/form-data' }}


        axios.put(`users/update/image/${this.state.id}`, formData, config)
        .then(res => {
            this.setState({
                data: JSON.stringify(res.data),
                image: res.data.image     
            })
        })
    }


    handleSignUp = e => {
        e.preventDefault();

        let newDate = new Date()
        let dateNow = getDate(newDate)

        if(this.state.password == '' || this.state.password2 == '') {
            this.setState({
                error: 'Please fill out all fields'
            })
            return
        }

        this.setState({ loading: true })

        const newUser = {
            username: this.state.username, 
            email: this.state.email, 
            password: this.state.password, 
            joined: dateNow.toString(),
            }
    
        axios.put(`/users/signup/${this.state.id}`, newUser)
         .then(res => {

            this.setState({
                title: res.data.msg.title,
                body: res.data.msg.body,
                btnTxt: res.data.msg.btnTxt,
                to: res.data.msg.to,
                email: res.data.email,
                submitted: true,
                loading: false,
            }) 
        })
    
    }

    render() {

        if(this.state.loading) {
            return (
                <div className="spinner-container">
                    <Spinner size={2} />
                </div>
            )
        }

        return (

            !this.state.submitted ?

            <Container>

                <Row className="show-grid center" style={{ margin: "8% 0 2% 0"}}>
                    <Col>
                        <h1>Complete Sign Up</h1>
                    </Col>
                </Row>
          
                <Row className="show-grid">
                    <Col sm={3} md={3}></Col>
                
                    <Col sm={3} md={3}></Col>
                </Row>  
                <Row>
                    <Col md={4}></Col>
                    <Col>
                    </Col>
                    <Col md={4}></Col>
                </Row>

                <Row>
                    <Col sm={2} md={2}></Col>
                    <Col sm={8} md={8}>
                        <Form>
                            <Row>
                                <Col md={4}></Col>
                                <Col md={4}>
                                    <Image src={this.state.image ? this.state.image : 'default-avatar.jpg'} width="150px" />
                                </Col>
                                <Col md={4}></Col>
                            </Row>

                            <Row></Row>
                            <Form.Group controlId="formBa/users/signup/${this.state.id}sicName">
                                <Form.Control 
                                    style={{display:'none'}} 
                                    ref={fileUpload => this.fileUpload = fileUpload} 
                                    type="file" onChange={this.fileChangeHandler} 
                                    id="image" name="image" />
                                    <Button onClick={() => this.fileUpload.click()}>Upload image</Button>
                            </Form.Group>
                            <Form.Group controlId="formBasicName">
                                <Form.Label>Username</Form.Label>
                                <Form.Control type="text" placeholder="Enter a username" onChange={this.changeHandler} name="username" value={this.state.username} />
                            </Form.Group>

                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" placeholder="Enter your email" name="email" value={this.state.email} />
                            </Form.Group>
                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Choose a password" onChange={this.changeHandler} name="password" value={this.state.password} />
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Repeat Password</Form.Label>
                                <Form.Control type="password" placeholder="Repeat your password" onChange={this.changeHandler} name="password2" value={this.state.password2} />
                            </Form.Group>
                        </Form>
                        </Col>
                  
                </Row>
                <Row className="center" style={{color: "red", margin: '1em 0'}}>
                    <Col>
                        {this.state.error}
                    </Col>
                </Row>
    
                <Row>
                    <Col md={5}></Col>
                    <Col md={2} className="center" >
                        <Button onClick={this.handleSignUp} variant="secondary" size="lg" type="submit">Join</Button>
                    </Col>
                    <Col md={2} className="center" >
                        <i class="fa fa-check green" style={{display: this.state.match}} ></i>
                        <i class="fa fa-times red" aria-hidden="true"  style={{display: this.state.noMatch}} ></i>
                    </Col>
                </Row>
               
        
            </Container>

            :

            <Container>
                {this.state.id}
                <Row className="user-message">
                    <Col sm={2}></Col>
                    <Col>
                        <h1>{this.state.title}</h1>
                    </Col>
                    <Col sm={2}></Col>
                </Row>
                <Row className="user-message">
                    <Col sm={2}></Col>
                        <Col sm={8}>
                            <h5>{this.state.body}</h5>
                        </Col>
                    <Col sm={2}></Col>
                </Row>
                <Row className="user-message">
                    <Col sm={3}></Col>
                    <Col >
                        <Link to={{pathname: this.state.to, state: { id: this.state.id }}} className="link-as-button">{this.state.btnTxt}</Link>
                    </Col>
                    <Col sm={3}></Col>
                </Row>
            </Container>
        
        );
    }
}

 
