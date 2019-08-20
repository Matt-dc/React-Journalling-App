import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { Container, Row, Col } from 'react-bootstrap'

import FollowingFeedItem from './followedUsersListItem'

import Spinner from '../../../utils/spinner';
import axios from 'axios';
import ContextWrapper from '../../../../ContextWrapper'


class FollowedUsersList extends Component {

    constructor(props) {
        super(props)
        
        this.state={
            following: [],
            redirect: false,
        }
    }
    
      componentDidUpdate(prevProps) {
        if (this.props.userId !== prevProps.userId) {
          this.get_following();
        }
      }


      get_following = () => {
        
        this.setState({ loading: true })    

        axios.post(`/users/following/${this.props.userId}`, { name: 'following' })
        .then(res => {
            this.setState({
                loading: false,
                following: res.data,
                userOrError: false,
            })
        }) 
        .catch(err => {
            this.setState({
                redirect: true,
                loading: false,
            })
        })
      }


    handleFollow = updateFollow => {
  
        const toFollow = { toFollow: updateFollow._id}

        const deleteProp = ({[key]: _, ...newObj}, key) => newObj

        axios.put(`/users/update/following/${this.props.userId}`, toFollow) 
            
        .then(
                this.setState({
                    following: this.state.following.map(user => {
                        if(updateFollow._id === user._id) {
                            return updateFollow.unfollowed === true ? 
                                   deleteProp(user, 'unfollowed')
                                    : 
                                    { ...updateFollow, unfollowed: true} 
                        } else {
                            return user
                        }
                    })   
                })
            )    
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
                <Row className="center" style={{margin: '4em 0', }}>
                    <Col>
                        <h1 className="default-page-header">Who you're following</h1>
                    </Col>
                </Row>

                {this.state.following.map(user => (

                    <Row>
                       <FollowingFeedItem 
                            user={user}
                            handleFollow={this.handleFollow}
                       />
                    </Row>
                  ))}
              
            </Container>
        )
    }
}


export default ContextWrapper(FollowedUsersList)