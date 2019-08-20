import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';
import { Container, Row, Col, Button, Image } from 'react-bootstrap'

import ToggleFollowButton from '../../utils/toggleFollowButton';
import AuthorLatestPostItem from './authorLatestPostItem'

import axios from 'axios';
import ContextWrapper from '../../../ContextWrapper'
import Spinner from '../../utils/spinner';



class AuthorProfile extends Component {

    constructor(props) {
        super(props)
        
        this.state={
            following: [],
            posts: [],
            user:'',
            id:'',
        }
    }


    componentDidMount() {

        const { id } = this.props.match.params

        this.setState({
            id: id,
            loading: true,
        })

        axios.get(`/users/profile/${id}`)
        .then(res => {
            this.setState({
                user: res.data,
                id: res.data._id,
                image: res.data.image,
                username: res.data.username,
                joined: res.data.joined,
                loading: false,

            })
        })
        .catch(err => {
            this.setState({
                err: err
            })
        })

        axios.get(`/posts/user/posts/${id}`)
        .then(res => {
            this.setState({
                posts: res.data
            })
        })
       
    }

    static getDerivedStateFromProps(nextProps, prevState) {

        if (nextProps.userId !== prevState.prevUserId) {
          return {
            prevUserId: nextProps.userId,
            FollowingOrError: true,
          };
        }
            return null;
      }
    
      componentDidUpdate(prevProps, prevState) {

        if (this.state.FollowingOrError === true) {
          this.get_user();
        }
      }
      

      get_user = () => {
        axios.get(`/users/`)
        .then(res => {
            this.setState({
                following: res.data.user.following,
                FollowingOrError: false,
            })
        }) 
      }


handleFollow = id => {

    const toFollow = { toToggle: id, name: 'following'}

    if(id === this.props.userId) return

    axios.put(`/users/update/following/${this.props.userId}`, toFollow) 
        .then(res =>  {
            this.setState({
                following: res.data.following
            })
        })
}


    render() {
        
        if(this.state.id !== null && this.state.id === this.props.userId) {
            return <Redirect to="/editProfile" />
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
               {/* userId: {this.props.userId}<br/><br/>
               id: {this.state.id}  */}
                <Row className="center" style={{margin: '3em 0'}}>
                    <Col>
                        <div className="profile-page-avatar-container">
                            <Image src={`/${this.state.image}`} width="200px" />
                        </div>
                    </Col>
                </Row>
               
                <Row className="center">
                        <Col>
                            <h1>{this.state.username}</h1>
                        </Col>
                    </Row>
                    <Row className="center" style={{ margin: '3em 0'}}>
                        <Col>
                            {this.props.userId ?
                                <ToggleFollowButton 
                                    authorId={this.state.id}
                                    following={this.state.following}
                                    handleFollow={() => this.handleFollow(this.state.id)}    
                                /> :

                                <Button variant="secondary" disabled>Log in to follow</Button>
                            }
                        </Col>
                    </Row>
                
        
                <Row className="center">
                    <Col>
                        <p style={{ color: '#a1a1a1'}}>Member since:  <i>{this.state.joined}</i></p>
                    </Col>
                </Row>
                <Row className="center" style={{ margin: '2em 0'}}>
                    <Col>
                        <h2>Latest Articles</h2>
                    </Col>
                </Row>

                <Row style={{ margin: '2em 0'}}>
                            {/* {JSON.stringify(this.state.posts)} */}
                        {this.state.posts.length < 1 ? 
                        
                        <Col style={{ color: '#a1a1a1', fontSize: '0.9em'}}>
                            They appear not to have written anything yet...
                        </Col> 

                        :

                        <Col>
                            {this.state.posts.map(post => {
                                return (
                                    <AuthorLatestPostItem 
                                        post={post}
                                    />
                                )
                            })}
                        </Col>}
                </Row>
            </Container>
        )
    }
}


export default ContextWrapper(AuthorProfile)