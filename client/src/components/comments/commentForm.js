import React, { Component } from 'react';
import { Form, Button, Col, Row, Container, Image } from 'react-bootstrap';
import axios from 'axios';

import { UserConsumer } from '../../UserContext'
import ContextWrapper from '../../ContextWrapper'

class CommentForm extends Component {

    state = {}

   changeHandler = e => {
        this.props.commentChangeHandler(e.target.value)
    }

    render() {
    
        return (
            <React.Fragment>
                <Container>
                <UserConsumer>
                    {value=> (
                    <>
                    <Row>
                        <Col>
                            <div className="comment-avatar-container">
                                <Image src={`/${value.avatarImage}`} width="60px" />
                                {/* <i class="fa fa-user fa-2x"></i>      */}
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={1} md={1} ></Col>
                        <Col sm={10} md={10}>
                         
                            <Form>
                                <Form.Group controlId="exampleForm.ControlTextarea1">                            
                                <Form.Control as="textarea" style={{width: '400px'}} name="comment" onChange={this.changeHandler} 
                                    value={this.props.comment}
                                    className="comment-area" rows="3" 
                                        placeholder={this.onFocus ? 'Write a comment' : `Posting as ${value.username}`} 
                                    />                            
                                </Form.Group>   

                                <Button variant="outline-primary"
                                    onClick={() => this.props.handleSubmitComment(this.props.comment)}>Publish</Button>              
                            </Form>
                         
                           
                        </Col>
                        <Col sm={1} md={1} ></Col>
                    </Row>
                        </>
                        )}
                        </UserConsumer>
                    </Container>
            </React.Fragment>
        )
    }
}

export default ContextWrapper(CommentForm) 