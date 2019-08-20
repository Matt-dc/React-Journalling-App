import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { Container, Row, Col } from 'react-bootstrap'


export default class FailedConfirmation extends Component {

    state={}

    render() {
    
        return (                    
           
            <Container>
                <Row className="center" style={{marginTop: '5em'}}>
                    <Col>
                        <h1>It looks like something went wrong :(</h1>
                    </Col>
                </Row>
                <Row className="center" style={{marginTop: '5em'}}>
                    <Col>
                        <h5>It could have expired...</h5>
                    </Col>
                </Row>
                <Row className="center"  style={{marginTop: '5em'}}>
                    <Col>
                        <Link 
                            style={{ 
                                backgroundColor: '#000',
                                color: '#fff',
                                margin: '30px 0',
                                padding: '1em',
                                borderRadius: '7px',
                                cursor: 'pointer',
                            }}
                            to={{pathname: `/home`, 
                            state: { id: this.state.id, email: this.state.email, set: true }}} 
                            >Back to home
                        </Link>
                    </Col>
                </Row>
            </Container>

            )
        }
    }
