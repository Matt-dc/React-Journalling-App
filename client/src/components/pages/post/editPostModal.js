import React from 'react'
import { Row, Col, Modal, Image, Button, Form } from 'react-bootstrap';
import { Editor } from '@tinymce/tinymce-react';
import { UserConsumer } from '../../../UserContext';
import ContextWrapper from '../../../ContextWrapper';


const EditPostModal = props => {

        let fileRef = React.createRef();  

        function handleClick() {
            fileRef.current.click()
        }

        return (

            <Modal 
                { ...props }  
                dialogClassName="modal-90w"
                >

                <Modal.Header  className="edit-modal-title-container">
                        <Row style={{ marginTop: '1em' }}>
                            <Col>
                                <h1 className="edit-modal-title">
                                    Edit Article
                                </h1>
                            </Col>
                        </Row>
                </Modal.Header>
                <Modal.Body>
                 
                    <Row>
                        <Col md={2}></Col>
                        <Col md={8} style={{ textAlign: 'center'}}>
                            <div className="edit-post-image">
                                <Image src={`/${props.image}`} width="100%" />
                            </div>
                        </Col>
                        <Col md={2}></Col>
                    </Row>
                    <Row className="center" style={{margin: '1em 0'}} >
                        <Col>
                            <input 
                                style={{ display:'none' }} 
                                type="file" 
                                onChange={props.fileChangeHandler} 
                                ref={fileRef} 
                            /> 
                            <Button onClick={handleClick}>Update image</Button>
                        </Col>
                    </Row>
                    <Row>
                    <Col lg={2} md={1}></Col>
                    <Col lg={8} md={10}>
                        <Col>
                            <Form onSubmit={props.handleSubmit} >

                                <Form.Group>
                                    <Form.Label>Title</Form.Label> <span className="input-chars-remaining">characters remaining: {props.titleLen}</span>    
                                    <Form.Control className="text-muted" type="text" id="title" name="title" onChange={props.changeHandler} value={props.title} placeholder="Enter a title" />
                                </Form.Group>
                               
                                <UserConsumer>
                                    {value => (
                                        <Form.Group>
                                            <Form.Label>Author</Form.Label>   
                                            <Form.Control className="text-muted" type="text" id="author" name="author" value={value.username} />
                                        </Form.Group>
                                    )}
                                </UserConsumer>
                            
                                <Form.Group>
                                    <Form.Label>Tagline</Form.Label>    <span className="input-chars-remaining">characters remaining: {props.taglineLen}</span>     
                                    <Form.Control className="text-muted" type="text" id="tagline" name="tagline" onChange={props.changeHandler} value={props.tagline} placeholder="Enter a description ( props will appear in the thumbnail)" />
                                </Form.Group>

                                <Form.Group controlId="formGridState">
                                <Form.Label>Topic</Form.Label>
                                    <Form.Control as="select" name="topic" onChange={props.changeHandler} value={props.topic}>
                                        <option value="">Choose...</option>
                                        <option value="tech">Tech</option>
                                        <option value="language">Language</option>
                                        <option value="science">Science</option>
                                        <option value="self">Self</option>
                                        <option value="society">Society</option>
                                        <option value="music">Music</option>
                                        <option value="geography">Geography</option>
                                        <option value="code">Code</option>
                                        <option value="nature">Nature</option>
                                        <option value="health">Health</option>
                                        <option value="psych">Psych</option>
                                        <option value="food">food</option>
                                        <option value="relationships">relationships</option>
                                    </Form.Control>
                                </Form.Group>

                                <Form.Group controlId="post_content">
                                    <Form.Label>Post</Form.Label>
                                    <Editor
                                        init={{
                                            plugins: 'link image code',
                                            toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | code', 
                                            height: 400,
                                        }}
                                        id="content"    
                                        onChange={props.handleEditorChange}
                                        name="content" 
                                        value={props.content} 
                                        placeholder="Write your post" 
                                    />
                                </Form.Group>
                                <Row>
                                   
                                    <Col lg={2} md={2} sm={3} xs={2}>
                                        <Button variant="secondary" onClick={() => props.cancelPostEdit() }>
                                            Cancel
                                        </Button>
                                    </Col>
                                    <Col lg={2} md={2} sm={3} xs={1}>
                                        <Button variant="primary" onClick={() => props.submitUpdatedArticle()} >
                                            Save 
                                        </Button>
                                    </Col>
                                    <Col lg={6} md={5} sm={1} xs={1}></Col>
                                    <Col lg={2} md={3} sm={1} xs={1}>
                                        <Button size="s" variant='danger' onClick={() => props.deleteUserWarning()}>Delete</Button>
                                    </Col>
                                </Row>   
                                 
                            </Form>
                            </Col>
                             <Col lg={2} md={1}></Col>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <span className="center create-post-error">{props.error}</span>          
                        </Col>
                    </Row>                    
                </Modal.Body>
                <Modal.Footer>
                   
                </Modal.Footer>
            </Modal>

        )

}


export default ContextWrapper(EditPostModal) 