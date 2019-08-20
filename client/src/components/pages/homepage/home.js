import React, { Component } from 'react';

import { Image } from 'react-bootstrap'

import CenterThumbnail from './centerThumbnail'
import PersonalizedThumbnail from './personalizedThumbnail'
import FollowingThumbnail from './followingThumbnail'
import PopularThumbnail from './popularThumbnail'
import FeaturedThumbnailLeft from './featuredThumbnailLeft';
import FeaturedThumbnailRight from './featuredThumbnailRight';

import Banner from './signupBanner'
import axios from 'axios'
import { Link } from 'react-router-dom'

import { Row, Col, Container } from 'react-bootstrap'
import ContextWrapper from '../../../ContextWrapper';


class Home extends Component {

    constructor(props) {
        super(props);
    
        this.state = {
          login: [],
          posts: [],
          savedArticles: [],
          personalized: [],
          popular: [],
          following: [],
          loading: true,
        }
    }
    
    componentWillMount() {
        axios.get('/posts/getposts')
        .then(res => {
            this.setState({
                posts: res.data,
                loading: false,
                })
            })
            .catch(err => {
                this.setState({ loading: false, })
            })
    
        }


    componentDidMount() {

        axios.get(`/users/`)
        .then(res => {
            this.setState({
                username: res.data.user.username,
                topics: res.data.user.topics,
                following: res.data.user.following,
                savedArticles: res.data.user.saved_articles,
                readingHistory: res.data.user.readingHistory,
                loading: false,
            }, () => {

                const topicsString = JSON.stringify(this.state.topics);
                axios.get(`/posts/personalized/${topicsString}`)
                .then(res => {
                    this.setState({
                        personalized: res.data
                    }, () => {

                        const followingList = JSON.stringify(this.state.following)
                        axios.get(`/posts/following/${followingList}`)
                        .then(
                            this.setState({
                                following: res.data,
                                loading: false,
                            }))
                        })
                    })
                })
        })

        axios.get('/posts/popular/')
        .then(res => {
            this.setState({
                popular: res.data,
                
            })
        })
    }


    toggleSaveHandler = id => {

        // _id is the value prop
        this.setState({
            savedArticle: id
        })

        const obj = {
            toToggle: id, 
            name: 'saved_articles'
        }

        axios.put(`/users/update/savedArticles/${this.props.userId}`, obj)
        .then(res => {
            this.setState({
                savedArticles: res.data.saved_articles
            })
        })
    }



render() {

    let personalized;
    if(this.props.isAuth !== null && this.state.personalized.length !== 0) {

        
        personalized =  
            <>
                <Link style={{color: '#000'}} to={`/personalized`}>
                        <span >Personalized for you ></span><hr />
                </Link> 
                {this.state.personalized.map(post => (
                    <PersonalizedThumbnail 
                        post={post}
                        savedArticles={this.state.savedArticles}
                        toggleSaveHandler={this.toggleSaveHandler}                            
                    />
                ))}
            </>   

    } else {
        
        personalized =
            <>
                <span style={{ fontSize: '0.9em', color: '#5c5c5c' }}>Sign up to get personalized recommendations </span><hr />
                {this.state.posts.map(post => (
                    <Row >
                        <Col>
                            <PersonalizedThumbnail
                                post={post}
                            />
                        </Col>
                    </Row>
                ))}
            </>
    }


    return(

        <Container>
            {/* {JSON.stringify(this.state.personalized)} */}
            <Row>
                {/* featured article left */}
                <Col lg={4} md={5} sm={12} xs={12}>
                    {this.state.posts.length > 0 && <FeaturedThumbnailLeft
                        post={this.state.posts[0]}
                        savedArticles={this.state.savedArticles}
                        toggleSaveHandler={this.toggleSaveHandler}
                    />}
                </Col>


                {/* featured articles center */}
                <Col lg={4} md={7} sm={12} xs={12}>
                {this.state.posts.slice(2,5).map(post => (
                    <Row >
                        <Col>
                            <CenterThumbnail 
                                post={post}
                                savedArticles={this.state.savedArticles}
                                toggleSaveHandler={this.toggleSaveHandler}
                            />
                        </Col>
                    </Row>
                ))}
                </Col>


                {/* featured article right */}
                <Col lg={4} md={0} sm={12} xs={12}>
                {this.state.posts.length > 4 && <FeaturedThumbnailRight
                        post={ this.state.posts[1] }
                        savedArticles={this.state.savedArticles}
                        toggleSaveHandler={this.toggleSaveHandler}
                    />}
                     
                </Col>
            </Row>

            {/* Sign up form  */}
            <Row >
                <Col>
                    <Banner />
                </Col>
            </Row>


            <Row>

            {/* personalized:  {JSON.stringify(this.state.personalized)} */}
               <Col lg={7} md={12} sm={12} xs={12}>
                    {personalized}
               </Col>

                <Col lg={5} md={12} sm={12} xs={12}>

                {this.props.isAuth && this.state.following.length > 0 &&
                    <>
                    <Row className="followingThumbnail-header">
                        <Col  lg={8} md={8} sm={8} xs={8}>
                            <h4 class="followingThumbnail-header-title">People who you're following</h4>
                        </Col>
                        <Col  lg={4} md={3} sm={3} xs={3}>
                            <Image src="assets/binoculars.jpeg" className="followingThumbnail-header-image" />
                        </Col>
                    </Row>

                    <Row >
                        <Col>
                            {this.state.loading ?  'loading' : this.state.following.slice(0,4).map(post => (
                                <FollowingThumbnail 
                                    post={post}
                                />
                            ))}
                        </Col>
                    </Row>        
                       
                        </>
                    }
                    

                    {/* {JSON.stringify(this.state.following)} */}
                    {this.state.popular.length > 0 &&  
                        <>
                            <div className="popular-header">
                                <Link to="/popular">
                                    <h2>popular</h2>
                                </Link>
                            </div>
                            {this.state.popular.slice(0, 4).map((post, index) => (
                            <PopularThumbnail
                                index={index}
                                post={post}
                                savedArticles={this.state.savedArticles}
                                toggleSaveHandler={this.toggleSaveHandler}
                            />
                            ))}
                        </>
                    }

                </Col>
            </Row>        
             {/* {this.state.savedArticleId} */}
        </Container>
        
    )
}    

}

export default ContextWrapper(Home)