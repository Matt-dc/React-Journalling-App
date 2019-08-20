import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import ContextWrapper from '../../../../ContextWrapper';
import Spinner from '../../../utils/spinner';
import SavedPostsFeedItem from './savedPostsFeedItem';


class SavedPosts extends Component {


    state={
        savedArticles: [],
        redirect: false,
    }


    componentDidUpdate(prevProps){
        if(this.props.userId !== prevProps.userId ) {

            this.setState({ loading: true })
            
            this.getSavedArticles()
        }
    }


    getSavedArticles(){
        
        this.setState({ loading: true })
        axios.post(`/users/savedarticles/${this.props.userId}`, { name: 'saved_articles' })
        .then(res => {
            this.setState({
                savedArticles: res.data,
                loading: false,
            })
        })
        .catch(err => {
            this.setState({ 
                loading: false,
                redirect: true })
        })
    }    


    removeSavedArticle = id => {

        const obj = {
            name: 'saved_articles',
            toToggle: id
        }

        axios.put(`/users/update/savedarticles/${this.props.userId}`, obj)
        .then(() => this.getSavedArticles())
        }


    render() {

        if(this.state.redirect) {
            return <Redirect to="/login" />
        } 

        if(this.state.loading) {
            return (
                <div className="spinner-container">
                    <Spinner size={2} />
                </div>
            )
        }

        return (
            <Container>
                <h1 className="center" style={{ margin: '1em 0'}}>Saved articles</h1>
                <Row style={{ margin: '1em 0' }}>
                    <Col>
                        <hr />
                    </Col>
                </Row>

                {this.state.savedArticles.map(post => {
                    return (
                        <SavedPostsFeedItem 
                            post={ post }
                            removeSavedArticle={this.removeSavedArticle}
            
                        />
                    )
                })}
                
            </Container>
        )
    }
}

export default ContextWrapper(SavedPosts)