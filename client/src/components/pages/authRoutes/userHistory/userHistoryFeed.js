import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import ContextWrapper from '../../../../ContextWrapper';
import UserHistoryItem from './userHistoryItem';
import Spinner from '../../../utils/spinner';


class UserReadingHistory extends Component {

    state={
        readingHistory: [],
        redirect: false,
    }

    componentDidUpdate(prevProps) {

        if(this.props.userId !== prevProps.userId) {

            this.setState({ loading: true })

            axios.post(`/users/readinghistory/${this.props.userId}`, { name: 'reading_history' })
            .then(res => {
                this.setState({
                    readingHistory: res.data,
                    loading: false,
                })
            })
            .catch(err => {
                this.setState({
                    loading: false,
                    redirect: true
                })
            })
        } 
    }


    deleteHistoryItem = articleId => {

        this.setState({ loading: true })

        axios.put(`/users/delete/readinghistory/${this.props.userId}`, { articleId: articleId })
        .then(res => {
            this.setState({
                readingHistory: res.data,
                loading: false,
            })
        })
        .catch(() => {
            this.setState({
                loading: false,
            })
        })
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
                {/* {JSON.stringify(this.state.readingHistory)} */}
                <h1 className="center" style={{ margin: '0 0 1em 0' }}>
                    Your reading history
                </h1>
                <Row style={{ margin: '1em 0' }}>
                    <Col>
                        <hr />
                    </Col>
                </Row>
                {/* {JSON.stringify(this.state.readingHistory)} */}

                {this.state.readingHistory.length > 0 &&
                    this.state.readingHistory.map(post => {
                        return(
                    
                        <UserHistoryItem 
                            post={post} 
                            deleteHistoryItem={this.deleteHistoryItem}
                        
                        />
                    
                        )
                })}
                
            </Container>
        )
    }
}

export default ContextWrapper(UserReadingHistory) 
