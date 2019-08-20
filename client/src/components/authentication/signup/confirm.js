import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap'

import Spinner from '../../utils/spinner'
import axios from 'axios';

export default class Confirm extends Component {

    state={
        loading: true,
        msg: '',
    }
    

    componentDidMount(){

        const { token } = this.props.match.params
   
        axios.post(`/users/confirmemail/${token}`)
        .then(res => {
            this.setState({ 
                msg: res.data.msg,
                id: res.data.id,
                email: res.data.email,
                loading: false,
            })
        }).catch(err => {
            this.setState({
                failed: true,
                loading: false
            })
            console.log(err)
        })
    }


    render() {

        return (

                <Container>
                    <Row className="user-message">
                        <Col>
                            <h1>{this.state.msg.title}</h1>
                        </Col>
                    </Row>
                    <Row className="user-message">
                        <Col>
                            <h5 ytyle={{ color: '#2c8139'}}>{this.state.msg.body}</h5>
                        </Col>
                        
                    </Row>
                
                    {this.state.msg.showRedirect && <Row className="user-message">
                        <Col>
                            <Link className="link-as-button"
                                to={{pathname: '/signup', 
                                    state: { id: this.state.id, email: this.state.email, set: true }}} 
                                >{this.state.msg.btnTxt}
                            </Link>
                        </Col>
                    </Row> }

                </Container>
        ) 
    }
}
