import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import { Container, Form, Row, Col, Button, Image } from 'react-bootstrap'
import { Editor } from '@tinymce/tinymce-react';

import { UserConsumer } from '../../../UserContext';
import ContextWrapper from '../../../ContextWrapper';

import getDate from '../../utils/getDate'

import Spinner from '../../utils/spinner'


class CreatePost extends Component {
  
    constructor(props) {
        super(props);

        this.state = {
            articleId: '',
            authorId:'',
            title: '',
            tagline: '',
            author: '',
            content:'',
            imageFile: null,
            error: '',
            saved: false,
            titleLen: 40,
            taglineLen: 40,
            error: '',
        }
    }

    handleChange = e => {
        this.setState({
            [ e.target.name ]: e.target.value,
            titleLen: 60 - this.state.title.length,
            taglineLen: 60 - this.state.tagline.length,
            error: '',
        })
    }


    handleEditorChange = e => {
        this.setState({
            content: e.target.getContent(),
        })
    }


    fileChangeHandler = e => {

        this.setState({ imageFile: e.target.files[0]})

        let formData = new FormData()
        formData.append('image', e.target.files[0])
        formData.append('articleId', this.state.articleId)

        const config = { headers: { 'Content-Type' : 'multipart/form-data' }}

        axios.post(`/posts/createpost/image`, formData, config)
        .then(res => {
            this.setState({
                data: res.data,
                image: res.data.image,        
                articleId: res.data._id
            })
        })
    }



    handleSubmitPost = e => {

        e.preventDefault();

        if(this.state.imageFile == null) {
            this.setState({
                 error: 'Don\'t forget to upload an image for the post' 
                })
            return
        }

        if(!this.state.title || !this.state.tagline || !this.state.content) {
            this.setState({
                error: 'Please fill out all fields' , 
            })
            return
        }  

        if(this.state.title.length < 5 || this.state.title.length > 60 || this.state.tagline.length < 5 || this.state.tagline.length > 60 ) {
            this.setState({
                error: 'The title and tagline should be between 5 and 40 characters long'
            })
            return 
        }


        let newDate = new Date()
        let dateNow = getDate(newDate)

        const newPost = {
                title: this.state.title, 
                author: this.props.username, 
                authorId: this.props.userId,
                authorAvatar: this.props.avatarImage,
                tagline: this.state.tagline, 
                date: dateNow.toString(),
                topic: this.state.topic,
                comments:0,
                content: this.state.content,
            }

        const formData = new FormData();

        const config = { headers: { 'Content-type' : 'multipart / form-data' }}    

        for (var key in newPost) {
            formData.append(key, newPost[key]);
        }

        formData.append('image', this.state.imageFile)

        this.setState({
            formData: formData,
            loading: true,
        })
        
        axios.put(`/posts/createpost/update/${this.state.articleId}`, formData, config)
            .then(() => {
                this.setState({
                    loading: false,
                    saved: true,
                }, () => {

                    this.setState({
                        title: '',
                        image: null,
                        tagline: '',
                        topic:'',
                        content:'',
                        error: '',
                    }) 
                })
            })
    }  
 

    render() {


        if (this.props.isAuth == null || this.state.loading) {
            return (
            <div className="spinner-container">
                <Spinner />
            </div>
            )
        } 

        if (this.props.isAuth === false){
            return <Redirect to="/login" />
        }

        return (

            
            this.state.saved ?


            <Container className="center">
                <Row>
                    <Col>
                        <h1>Post saved</h1>
                    </Col>
                </Row>
                <Row style={{ margin: '3em 0'}}>
                    <Col>
                        <Button href="/home">Ok</Button>
                    </Col>
                </Row>
            </Container>

            :

            <Container key={this.props.isAuth}>
                
                <Row className="center">
                    <Col>
                        <h1>Write a new article</h1>
                    </Col>
                </Row>

                 <Row className="center">
               
                    <Col>
                        {this.state.image ? <Image src={`${this.state.image}`} style={{ margin: '3em 0'}} width="300px" /> : ''}
                    </Col>
                </Row>
                <Row className="center">
                    <Col>
                        <p className="uploaded-create-post-image-text">{this.state.image}</p>
                    </Col>
                </Row>

                
                <Row className="center" style={{ margin: '1.5em 0 0 0' }}>
                    <Col>
                        <input 
                            style={{display:'none'}} 
                            type="file" 
                            onChange={this.fileChangeHandler} 
                            ref={fileInput => this.fileInput = fileInput} /> 
                        <Button 
                            variant="secondary"
                            onClick={() => this.fileInput.click()}
                            >Upload image
                            </Button>
                    </Col>
                </Row>
                
                <Row>
                    <Col>
                        <Form onSubmit={this.handleSubmit} >
                            <Form.Group>
                                <Form.Label>Title</Form.Label>  <span className="input-chars-remaining">characters remaining: {this.state.titleLen}</span>     
                                <Form.Control className="text-muted" type="text" id="title" name="title" onChange={this.handleChange} value={this.state.title} placeholder="Enter a title" />
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
                                <Form.Label>Tagline</Form.Label>    <span className="input-chars-remaining">characters remaining: {this.state.taglineLen}</span>       
                                <Form.Control className="text-muted" type="text" id="tagline" name="tagline" onChange={this.handleChange} value={this.state.tagline} placeholder="Enter a description (this will appear in the thumbnail)" />
                            </Form.Group>

                            <Form.Group controlId="formGridState">
                            <Form.Label>Topic</Form.Label>
                                <Form.Control as="select" name="topic" onChange={this.handleChange}>
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
                                onChange={this.handleEditorChange}
                                name="content" 
                                value={this.state.content} 
                                placeholder="Write your post" 
                            />
                            </Form.Group>

                            <Button onClick={this.handleSubmitPost}>Save</Button>
                            <span className="center create-post-error">{this.state.error}</span>

                        </Form>
                    </Col>
                </Row>

            </Container>

        )
    }
}



export default ContextWrapper(CreatePost);
