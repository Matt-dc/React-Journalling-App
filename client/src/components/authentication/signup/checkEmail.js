import React, { Component } from 'react'
import { Form, Button, Container, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'


import axios from 'axios'
import Spinner from '../../utils/spinner'


export default class CheckEmail extends Component {

    state={
        loading: false,
        submitted: false,
    }

    changeHandler = e => {
        this.setState({
            [ e.target.name ]: e.target.value
        })
    }

    handleSubmit = e => {

        const email = { email: this.state.email }

        this.setState({ loading: true, })

        axios.post('/users/sendemail', email)
        .then(res => {
           
           this.setState({
               submitted: true,
               msg: res.data.msg,
               sendingEmail: false,
               loading: false,
           }) 
       })
       .catch(err => console.log(err));
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
            {this.state.email}
            <Row className="user-message">
                <Col sm={2}></Col>
                <Col>
                    <h1>Oops! You need to confirm your email first</h1>
                    <h6>Enter your email to see if you're in our system</h6>
                </Col>
                <Col sm={2}></Col>
            </Row>
            <Row>
                <Col sm={3} md={3}></Col>
                <Col sm={6} md={6}>
                    <Form>
                    <Form.Group controlId="formBasicEmail">
                    <Form.Control onChange={this.changeHandler} name="email" type="email" value={this.state.email} placeholder="Enter email" />
                    <Form.Text className="text-muted center">
                        We'll never share your email with anyone else.
                    </Form.Text>
                    </Form.Group>
                    </Form>
                    <p style={{color: 'red'}}>{this.state.error}</p>
                </Col>    
            </Row>
            <Row className="user-message">
                <Col sm={3}></Col>
                <Col >
                    <Button onClick={this.handleSubmit}>Check email</Button>
                </Col>
                <Col sm={3}></Col>
            </Row>
        </Container>

        )
    }
}
