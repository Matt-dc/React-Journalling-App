import React, { Component } from 'react'
import { Row, Col, Image, Form, Button } from 'react-bootstrap'

import axios from 'axios'
import Spinner from '../../utils/spinner'


export default class Banner extends Component {

    state={
        email:'',
        error:'',
        sendingEmail: false,
    }

    changeHandler = e => {
        this.setState({
            email: e.target.value,
        })
    }

    handleSubmit = e => {
        e.preventDefault();

        const str = this.state.email;
        const trimmed = str.replace(/(^\s+|\s+$)/g,'');

        const re = /^\S+@\S+$/

        if(!re.test(trimmed)) {
            this.setState({
                error: 'Please enter a valid email',
            })
            return
        }

        this.setState({
            sendingEmail: true,
        })
        
        const emailObj = { email: this.state.email }

        axios.post('http://localhost:5000/users/sendemail', emailObj)
         .then(res => {
            this.setState({
                msg: res.data.msg,
                sendingEmail: false,
                submitted: true
            }) 
        })
        .catch(err => console.log(err));
    }


    render() {
 
        const content =  this.state.submitted ?

        <React.Fragment>
            <Row className="show-grid center" style={{ margin: "8% 0 2% 0"}}>
                <Col>
                    <h3>{(this.state.msg.title)}</h3>
                    <h5>{this.state.msg.body}</h5>
                </Col>
            </Row>
            <Row className="show-grid center" style={{ margin: "8% 0 2% 0"}}>
                <Col>

                </Col>
            </Row>
        </React.Fragment>

        :

        <React.Fragment>
            <Col>
            
            </Col>
            <Row>
                <Col>
                    <h2>Stay Posted with the Latest News</h2>
                </Col>
            </Row>
            <Row style={{ margin: '3% 0 4% 0'}}>
                <Col style={{padding: 0, fontSize: '0.9em', }}>
                    <p>Sign up for our personalized feed based on your interests</p>
                </Col>
            </Row>
            <Row>
                <Col md={7}>
                    <Form>
                    <Form.Group controlId="formBasicEmail">
                    <Form.Control onChange={this.changeHandler} type="email" placeholder="Enter email" />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                    </Form.Group>
                    </Form>
                    <p style={{color: 'red'}}>{this.state.error}</p>
                    {this.state.email}
                </Col>
                <Col md={5} sm={6} xs={6}>  
                    <Button variant="dark" onClick={this.handleSubmit}> {this.state.sendingEmail ? 
                         <span><Spinner spinning="spinning" size="1x" /></span> : 'Sign up' }
                    </Button>
                </Col>
            </Row>
        </React.Fragment>


        return (

            <React.Fragment>
                <Row className="banner">
                    <Col lg={5} md={6} sm={12} xs={12}>
                        <Image src="assets/workspace.jpg" width="350px" />
                    </Col>
                    <Col lg={5} md={6} sm={12} xs={12}>
                        {content}
                    </Col>
                </Row>
            </React.Fragment>
        )
    }
}

