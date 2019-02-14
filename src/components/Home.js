import React, { Component, Redirect } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Jumbotron, Container, Row, Col, Image, Button, Panel } from 'react-bootstrap';
import CustomNav from './CustomNav'
import './styles/first.css'

class Home extends Component {


render(){
  return(

    <div>

          <Container>
              <Row>
                  <h1>Journal App</h1>

                      <div className="imgContainer">
                        <Image src="assets/headerImage.jpeg" alt="Typewriter" className="headerImg" />
                        <div className="textCentered">Remember the past to give perspective to the future</div>

                      </div>

                  <Link to="/post"><Button>Write a post</Button></Link>
              </Row>

          <hr />
          <p>Recent Writings</p>
          <p>Post bla</p>
          <p>Post bla</p>
          <p>Post bla</p>
          <p>Post bla</p>

          <hr/>

          <p>Read your fundamental motivations - why am I doing this?</p>
          <hr/>

          <p></p>
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
