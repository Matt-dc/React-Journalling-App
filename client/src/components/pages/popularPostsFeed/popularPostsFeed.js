import React, { Component } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import axios from 'axios';
import PopularPostsFeedItem from './popularPostsFeedItem'
import PopularHeaderPost from './popularHeaderPost'
import Spinner from '../../utils/spinner'
import ContextWrapper from '../../../ContextWrapper'

class PopularPostsFeed extends Component {

    state={
        popularPosts:[],
    }

    componentDidMount(){

        this.setState({ loading: true })

        axios.get('/posts/popular/')
        .then(res => {
            this.setState({
                popularPosts: res.data,
                loading: false
            })
        })
    }


    render() {

        if(this.state.loading) {
            return (
              <div className="spinner-container">
                  <Spinner className="spinner" size='2x' spinning='spinning' />
              </div>
            )
        }

        return (

            <Container>
              
                {this.state.popularPosts.length < 1 ? 'No posts on this topic yet...' : 
                    <Row style={{ margin: '3em 0'}}>
                        <Col>
                            <PopularHeaderPost 
                                pageTitle={'Popular on our site'}
                                pageTagline={'All the stuff from our interwebs'}    
                                post={this.state.popularPosts[0]}
                                savedArticles={this.props.savedArticles}
                                toggleSaveHandler={this.props.toggleSaveHandler}
                                isAuth={this.props.isAuth}
                            />
                        </Col>
                    </Row> 
                }

                <hr />    

                {this.state.popularPosts.slice(1).map(post => {
                    return(
                        <PopularPostsFeedItem 
                            post={post} 
                            savedArticles={this.props.savedArticles}
                            toggleSaveHandler={this.props.toggleSaveHandler}
                            isAuth={this.props.isAuth}
                    />   
                    )
                })}

            </Container>
        )
    }
}

export default ContextWrapper(PopularPostsFeed)