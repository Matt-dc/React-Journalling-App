import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Button, Row, Col, Form, FormControl, Container, InputGroup } from 'react-bootstrap'; //remember to import CSS styles CDN from React-bootstrap
// import { Editor } from '@tinymce/tinymce-react';
import './styles/post.css'


export default class Posts extends Component {

      constructor(props) {
        super(props);

        this.state = {
          input: '',
          posts: [],
          now: new Date().getTime()
        }

        this.handleEditorChange = this.handleEditorChange.bind(this);
      }

      handleEditorChange =(e) => {
        this.setState({
          input: e.target.getContent()
        });
      }

      handleSubmit = e => {
        e.preventDefault();
        this.setState({ [e.target.name]: [e.target.value] });


        this.setState(prevState => ({
          posts: prevState.posts.concat(prevState.post)
        }));
      }


  render(){

    return (

      <div>

        <Container className="full-background">
        <Row className="top-banner">
        <div>
          <h1 className="post-title">What's on your mind?</h1>
        </div>
        </Row>

        <Form onSubmit={this.handleSubmit} className="text-editor">
            <Form.Group>
                <Form.Control className="input-title" aria-label="Large" placeholder="Title" aria-describedby="inputGroup-sizing-sm" />
            </Form.Group>

            {/* <Form.Group>
              <Editor
                 init={{
                     plugins: 'link image code',
                     toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | code' }}
                 onChange={this.handleEditorChange}
                 />

              <Button className="submit-post" type="submit" onSubmit={this.handleSubmit} variant="success">Post</Button>
            </Form.Group> */}
            </Form>

          <Row>
            {this.state.now}
          </Row>

          <Row>
          <p>  {this.state.posts.map(post => {
                return (
                  <li>{post}</li>
                );
            })}
          </p>
          {this.state.input}
          </Row>

        </Container>
      </div>

    );
  }
}
