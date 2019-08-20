import React, { Component } from 'react';
import axios from 'axios'
import { Container, Row, Col } from 'react-bootstrap'

import TopicHeaderPost from './topicHeaderPost'
import TopicPageItem from './topicPageItem'
import ContextWrapper from '../../../ContextWrapper'


class TopicPage extends Component {

    state = {
        topicArray: [],
        loading: true,
    }

    componentDidMount() {
        const topic = this.props.match.params.topic
        this.setState({
            topic: topic
        })
        axios.get(`/posts/topic/${topic}`)
        .then(res => {
            this.setState({
                topicArray: res.data,
                loading: false,
            })
        })
    }


    render() {

        return (
            <Container>   
            <Row>
                <Col>
                    <h1 className="topic-page-header">{this.state.topic}</h1>
                </Col>
            </Row>
            <Row>
                <Col>
                    <hr />
                </Col>
            </Row>
            

            {this.state.loading ? '' : 
                <>
                    <Row>
                        <Col>
                            {this.state.topicArray.length < 1 ? 'No posts on this topic yet...' :    
                                <TopicHeaderPost 
                                    post={this.state.topicArray[0]}
                                    savedArticles={this.props.savedArticles}
                                    toggleSaveHandler={this.props.toggleSaveHandler}
                                    isAuth={this.props.isAuth}
                                />
                            }
                        </Col>
                    </Row> 
                    <Row>
                        <Col>
                            <hr />
                        </Col>
                    </Row>
                    <Row style={{margin: '2em 0'}}>
                        {this.state.topicArray.slice(1, 4).map(post => (
                            <Col md={4}>
                                <TopicPageItem 
                                    post={post}
                                    savedArticles={this.props.savedArticles}
                                    toggleSaveHandler={this.props.toggleSaveHandler}
                                    isAuth={this.props.isAuth}
                                />     
                            </Col>                   
                        ))} 
                    </Row>  
                    <Row>
                        <Col>
                            {this.state.topicArray.length < 5 ? '' : 
                                <TopicHeaderPost 
                                    post={this.state.topicArray[4]}
                                    savedArticles={this.props.savedArticles}
                                    toggleSaveHandler={this.props.toggleSaveHandler}
                                    isAuth={this.props.isAuth}
                                />
                            }
                        </Col>
                    </Row>        
                    <Row style={{margin: '2em 0'}}>
                        {this.state.topicArray.slice(5, 8).map(post => (
                            <Col md={4}>
                                <TopicPageItem 
                                    post={post}
                                    savedArticles={this.props.savedArticles}
                                    toggleSaveHandler={this.props.toggleSaveHandler}
                                    isAuth={this.props.isAuth}                                
                                />     
                            </Col>                   
                        ))} 
                    </Row>  
                </>   
            }
            </Container>
        )
    }
}

export default ContextWrapper(TopicPage)