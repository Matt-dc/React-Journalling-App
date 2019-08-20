import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';
import { Container, Row, Col, Modal, Image } from 'react-bootstrap';

import axios from 'axios'
import ContextWrapper from '../../../ContextWrapper'


const LogoutModal = props => {

    return (

        <Modal {...props} size="lg" >
        <Modal.Header className="center" style={{ margin: "8% 0 2% 0"}}>
            <Col className="center">
                <h1>See you soon!</h1>
            </Col>
        </Modal.Header>
        <Modal.Body>
            <Container>
                <Row className="center" style={{ marginBottom: "5%"}} >
                    <Col>
                        <Image src="/assets/goodbye_hand.png" width="75px" />
                    </Col>
                </Row>
                <Row className="show-grid">
                    <Col sm={2} md={2}></Col>
                    <Col className="center" sm={8} md={8}>
                        <p style={{fontSize: '0.9em', color:'#656565',
                        marginBottom: '5%'
                        }}>Log in to stay up to date with all our articles 
                            and regularly updated content</p>
                    </Col>
                    <Col sm={2} md={2}></Col>
                </Row>
            </Container>
        </Modal.Body>   
    </Modal>
                     
    )
}


export default ContextWrapper(LogoutModal)