import React, { Component, Redirect } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Jumbotron, Container, Row, Col, Image, Button, Panel } from 'react-bootstrap';
import Modal from './Modal'
import './styles/home.css'


class Home extends Component {


render(){

  return(

    <div className="app">
        <Container>
            <Row ClassName="bgImg">
            <Col xs={10} md={12}>
                <Image src="assets/workspace.jpg" alt="workspace" />
                       <div className="inlineText">
                          Capture your ideas, thoughts and moments 
                        <div>

                        {this.props.showModal ? (
                            <Modal
                                showModal={this.props.showModal}
                                modalRef={this.props.modalRef}
                                handleOutsideClick={this.props.handleOutsideClick}
                            />
                        ) : null }

                            <Button
                                id="login"
                                onClick={this.props.handleModal}> Sign in
                            </Button>

                            <Button
                                id="signup"
                                onClick={this.props.handleModal}> Sign up
                            </Button>
                        </div>
                </div>

            </Col>

            </Row>

            <hr />
          <p>{this.props.showModal}</p>
          <p>Somemore random text</p>
          <hr/>
          <hr/>
          <p>Video from selected channels</p>
          <hr/>
          <p>View your stats - get an overview of your writing</p>
          <hr/>
          <p>download your writings</p>
          <hr/>
          <p>share a post - publish your work online</p>

        </Container>
    </div>


  );
}

}

export default Home
