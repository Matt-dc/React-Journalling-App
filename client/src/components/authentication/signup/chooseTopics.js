import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { Container, Row, Col, Button } from 'react-bootstrap';

import axios from 'axios';

import { UserConsumer } from '../../../UserContext'
import Topic from './topic';
import Spinner from '../../utils/spinner'


export default class ChooseTopics extends Component {

    state = {
        loading: false,
        saved: false,
        chosenTopicsArray: [],
    }

    componentDidMount(){

        if(this.props.location.state) {
            this.setState({ 
                id: this.props.location.state.id,
                hover: false })
        } else {
            return
        }
    }

    toggleHover = e => {
        if(e.target.style.boxShadow === 'none'){
            e.target.style.boxShadow = '0px 0px 38px -6px rgba(92,92,92,1)'
        } else {
            e.target.style.boxShadow = 'none'
        }
    }


    topicHandler = e => {

        let chosen = e.target.textContent.toLowerCase();     

        this.setState({
            chosenTopicsArray: this.state.chosenTopicsArray.includes(chosen) ? 
        
                 this.state.chosenTopicsArray.filter(el => {
                     return el !== chosen
                 }) : [ ...this.state.chosenTopicsArray, chosen]
        })
        
        if(e.target.style.backgroundColor === 'rgba(0, 0, 0, 0.3)') {
            e.target.style.backgroundColor = 'rgba(255, 0, 0, 0.6)'
        } else {
            e.target.style.backgroundColor = 'rgba(0, 0, 0, 0.3)'
        }
    }

    saveTopics = () => {

        const user = {topics: this.state.chosenTopicsArray }

        this.setState({ 
                user: user, 
                loading: true,
            })

        axios.put(`/users/choosetopics/${this.state.id}`, user)
        .then(res => {
            this.setState({
                title: res.data.msg.title,
                body: res.data.msg.body,
                to: res.data.msg.to,
                btnTxt: res.data.msg.btnTxt,
                loading: false,
                saved: true,
            })
        })
      
    }

    render() {

        if(this.state.loading) {
            return (
                <div className="spinner-container">
                    <Spinner size={2} />
                </div>
            )
        }

        return (

            this.state.saved ?

            <Container>
                <Row className="user-message">
                    <Col sm={2}></Col>
                    <Col>
                        <h1>{this.state.title}</h1>
                    </Col>
                    <Col sm={2}></Col>
                </Row>
                <Row className="user-message">
                    <Col sm={2}></Col>
                        <Col sm={8}>
                            <h5>{this.state.body}</h5>
                        </Col>
                    <Col sm={2}></Col>
                </Row>
                <Row className="user-message">
                    <Col sm={3}></Col>
                    <Col >
                        <Link to="/home" className="link-as-button">{this.state.btnTxt}</Link>
                    </Col>
                    <Col sm={3}></Col>
                </Row>
            </Container>

            :

            <Container>
                <Row style={{ marginBottom: '4%' }}>
                    <Col className="center">
                        <h1>Tell us a bit about what you're interested in</h1>
                    
                        <p>(Choose as many as you like)</p>
                    </Col>
                </Row>
                <UserConsumer>
                {value => (
                    <Row>
                        <Col>
                            <div style={{ 
                                display: "grid", 
                                gridTemplateColumns: "repeat(3, 1fr)",
                                gridGap: "10px",
                                textAlign: "center",
                                cursor: "pointer",
                                }} >
                                {value.topics.map(topic => (
                                    <Topic 
                                        topicHandler={this.topicHandler}
                                        topic={topic.topic}
                                        topicImage={topic.image}  
                                        mouseEnter={this.toggleHover}
                                        mouseLeave={this.toggleHover}
                                    />
                                ))}

                            </div>
                        </Col>

                    </Row>
                )}
                </UserConsumer>
               
                <Row style={{ margin: '2% auto'}}>
                    <Col>
                        <Button variant="dark" size="lg" onClick={this.saveTopics}
                        >Save</Button>
                    </Col>
                </Row>
                
            </Container>
        )
    }
}
