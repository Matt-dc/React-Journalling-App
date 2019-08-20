import React, { Component } from 'react'
import { Redirect, Link } from 'react-router-dom'
import { Form, Button, Container, Row, Col, Modal } from 'react-bootstrap'

import Spinner from '../../utils/spinner'
import ContextWrapper from '../../../ContextWrapper'
import axios from 'axios'


class SetNewPassword extends Component {


    state={
        loading: false,
        passwordUpdated: false,
        type: 'password',
        password: '',
        password2: '',
        match: 'none',
        noMatch: 'none',
    }


    componentDidMount(){

        const { token }  = this.props.match.params

        this.setState({
            token: token,
            loading: true,
        })

        axios.post(`/users/confirmpasswordrecover/${token}`)
        .then(res => {
            if(res.status === 200){
               this.setState({
                   redirectTo: null,
                   loading: false,
               })
            }
        })
        .catch(err => {
            this.setState({
                redirectTo: '/login',
                loading: false,
            })
        })
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




    handleSubmit = e => {

        e.preventDefault();

        if(this.state.password == '' || this.state.password2 == '') {
            this.setState({
                error: 'Please fill both fields',
            })
            return
        }

        if(this.state.password !== this.state.password2) {
            this.setState({
                error: 'Make sure both passwords match',
            })
            return
        }

        this.setState({
            loading: true,
        })

        const updatedPwd = {
            password: this.state.password,
        }

        axios.post(`/users/setnewpassword/${this.state.token}`, updatedPwd)
            .then(res => {
                this.setState({
                    msg: res.data.msg,
                    loading: false,
                    passwordUpdated: true,
                })
            })
            .catch(err => {
                this.setState({
                    error: 'There was a problem resetting your password',
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
    
        
        if(this.state.redirectTo) {
            return <Redirect to={this.state.redirectTo} />
        }

        return ( 

            this.state.passwordUpdated ? 

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
                    </Row> 
                    }

                </Container>

                :

                <Container>

                    <Row className="show-grid">
                    <Col sm={2} md={2}></Col>
                    <Col className="center" sm={8} md={8}>
                        <p style={{fontSize: '0.9em', color:'#656565',
                        marginBottom: '5%'
                        }}>Choose a new password</p>
                    </Col>
                    <Col sm={2} md={2}></Col>
                    </Row>
                    <Row>
                        <Col sm={3} md={3}></Col>
                        <Col sm={6} md={6}>

                            <Form>
                                <Form.Group>
                                    <Form.Label>New password</Form.Label> {this.state.password && <span style={{marginLeft: '2em', color: "8e8e8e", fontSize: "0.8em", textDecoration:'underline', cursor:'pointer' }} onClick={this.toggleViewPassword}>view</span>} 
                                    <Form.Control className="text-muted" onChange={this.changeHandler} type={this.state.type} name="password" onChange={this.changeHandler} value={this.state.password} />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Repeat password</Form.Label>
                                    <Form.Control className="text-muted"  onChange={this.changeHandler}  type={this.state.type} name="password2" onChange={this.changeHandler} value={this.state.password2} />
                                </Form.Group>   
                                <Row style={{ margin: "2% 0"}}>
                                <Col className="center" style={{marginBottom:'3%'}}>  
                                    <Button variant="success" onClick={this.handleSubmit}> {this.state.spinner ? 
                                        <span><Spinner spinning="spinning" size="1x" /></span> : 'Save' }
                                    </Button>
                                </Col>
                                <Col md={1}>
                                    <i class="fa fa-check green" style={{display: this.state.match}} ></i>
                                    <i class="fa fa-times red" aria-hidden="true"  style={{display: this.state.noMatch}} ></i>
                                </Col>
                            </Row>                 
                            </Form>

                        </Col>
                        <Col sm={3} md={3}></Col>
                    </Row>
                    <Row className="center" style={{color: 'red'}}>
                        <Col>
                            <p>{this.state.error}</p>
                        </Col>
                    </Row>

                </Container>
            )
    }
}

export default ContextWrapper(SetNewPassword)