import React, { Component } from 'react';
import { Button, Container, Row, Col, Image, Form } from 'react-bootstrap';

import ContextWrapper from '../../ContextWrapper';


class ReplyForm extends Component {

    constructor(props) {
        super(props)
            this.state = {}
        }


    changeHandler = e => {
        this.props.replyChangeHandler(e.target.value)
    }
    
    
    render() {
        return (
            <div>
                {this.props.showReply && 
                         <React.Fragment>
                         <Container>

                             <Row>
                                 <Col>
                                    <div className="comment-avatar-container">
                                        {this.props.avatarImage ? <Image src={`/${this.props.avatarImage}`} width="80px" /> : <i class="fa fa-user fa-2x"></i> }           
                                    </div>                                 
                                </Col>
                             </Row>
                             <Row>
                                 <Col sm={1} md={1} ></Col>
                                 <Col sm={10} md={10}>
                                     <Form>
                                         <Form.Group controlId="exampleForm.ControlTextarea1">                            
                                         <Form.Control as="textarea" style={{width: '400px'}} name="comment" value={this.props.replyValue} onChange={this.changeHandler} 
                                             className="comment-area" rows="3" 
                                                 placeholder={this.props.onFocus ? 'Write a comment' : `Posting as ${this.props.username}`} 
                                             />                            
                                         </Form.Group>   
                                     </Form>
                                 </Col>
                                 <Col sm={1} md={1}></Col>
                             </Row>
                             <Row>
                                 <Col sm={1} md={1} >
                                    <Button variant="outline-info"
                                        onClick={event => {this.props.handleSubmitReply(this.props.comment); this.props.closeReplyInput(); }}>Post</Button>
                                 </Col>
                                 <Col sm={1} md={1} >
                                    {this.props.showReply && <Button variant="outline-secondary"             
                                                    onClick={this.props.closeReplyInput}>Cancel</Button>}           
                                 </Col>
                             </Row>
                             </Container>
                     </React.Fragment>
                    }
            </div>
        )
    }
}


export default ContextWrapper(ReplyForm)



