import React, { Component } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { Redirect } from 'react-router-dom'
import axios from 'axios';
import ContextWrapper from '../../../../ContextWrapper';
import PersonalizedFeedItem from './personalizedFeedItem'
import Spinner from '../../../utils/spinner';


class PersonalizedFeed extends Component {


    state={
        personalizedPosts: [],
        redirect: false,
    }

    componentDidMount(){

        this.setState({ loading: true })    

        axios.get(`/users/`)
        .then(res => {
            // this.setState({ savedArticles: res.data.user.saved_articles })
           
            const topicsString = JSON.stringify(res.data.user.topics);

            axios.get(`/posts/personalized/${topicsString}`)
            .then(res => {
                this.setState({
                    personalizedPosts: res.data,
                    loading: false,
                })
            })    
        })
        .catch(err => {
            this.setState({ 
                loading: false,
                redirect: true,
            })
        })
    }


    render() {

        if(this.state.redirect) {
            return <Redirect to="/login" />
        } 
        
        if (this.state.loading) {
            return (
            <div className="spinner-container">
                <Spinner />
            </div>
            )
        } 

        return (

            <Container>

                <Row>
                    <Col>
                        <h2>Personalized posts</h2>
                    </Col>
                </Row>

                <Row style={{ margin:  '1.2em 0' }}>

                {this.state.personalizedPosts.length > 0 && this.state.personalizedPosts.map((post, i) => {
                        return (

                            <Col md={4} style={{ margin: '1.5em 0'}}> 
                                    <PersonalizedFeedItem 
                                        post={post} 
                                        isAuth={this.props.isAuth}
                                        toggleSaveHandler={this.props.toggleSaveHandler}
                                        savedArticles={this.props.savedArticles}
                                    />
                                </Col>
                        )
                    })
                }
                </Row>  

            </Container>
        )
    }
}

export default ContextWrapper(PersonalizedFeed)
