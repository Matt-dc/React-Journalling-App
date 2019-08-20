import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';
import axios from 'axios';
import ContextWrapper from '../../../../ContextWrapper';
import UserPostsItem from './userPostsItem';

import Spinner from '../../../utils/spinner'

import EditPostModal from '../../post/editPostModal'
import DeleteWarningModal from '../../../utils/deleteWarningModal'

class UserPostsFeed extends Component {

    state={
        editing: false,
        editedPostId: '',
        post:'',
        editedPost:'',
        userArticles: [],
        deleting: false,
        titleLen: 40,
        taglineLen: 40,
        error: '',
        redirect: false,
    }


    changeHandler = e => {
        this.setState({
            [ e.target.name ]: e.target.value,
            titleLen: 40 - this.state.title.length,
            taglineLen: 40 - this.state.tagline.length,
            error: '',
        })
    }


    componentDidUpdate(prevProps){

        if(this.props.userId !== prevProps.userId) {

            this.setState({ loading: true })

            axios.get(`/users/userArticles/${this.props.userId}`).
            then(res => {
                this.setState({
                    userArticles: res.data,
                    loading: false
                })
            })
            .catch(() => {
                this.setState({
                    loading: false,
                    redirect: true,
                })
            })
        }
    }


    editUserArticle = id => {

        this.setState({ loading: true})

        axios.get(`/posts/user/post/${id}`)
        .then(res => {
            this.setState({
                post: res.data,
                editedPostId: res.data._id,
                image: res.data.image,
                title: res.data.title,
                tagline: res.data.tagline,
                topic: res.data.topic,
                content: res.data.content,
                editing: true,
                loading: false,

            })
        })
    }


    fileChangeHandler = e => {

        this.setState({ img: e.target.files[0] })

        let formData = new FormData();

        formData.append('image', e.target.files[0])
        const config = { headers: { 'Content-Type' : 'multipart/form-data' }}

        axios.put(`/posts/user/update/post/image/${this.state.editedPostId}`, formData, config)
        .then(res => {

            this.setState({
                image: res.data.image        
            })
        })
    }



    submitUpdatedArticle = () => {

        if(!this.state.title || !this.state.tagline || !this.state.content) {
            this.setState({
                error: 'Please fill out all fields' , 
            })
            return
        }  

        if(this.state.title.length < 5 || this.state.title.length > 40 || this.state.tagline.length < 5 || this.state.tagline.length > 40 ) {
            this.setState({
                error: 'The title and tagline should be between 5 and 40 characters long'
            })
            return 
        }

        this.setState({ loading: true })

        const updatedPost = {
            articleId: this.state.editedPostId,
            title: this.state.title,
            tagline: this.state.tagline,
            topic: this.state.topic,
            content: this.state.content,
        }

        axios.put(`/posts/user/update/post/getall/${this.props.userId}`, updatedPost)
        .then(res =>  {
            this.setState({
                userArticles: res.data,
                editing: false,
                error:'',
            })
        })
        .catch(() => {
            this.setState({
                loading: false,
            })
        })
    }


    cancelPostEdit = () => {

        this.setState({
            editing:false,
            articleId: null,
            title: null,
            tagline:null,
            topic:null,    
            content: null,
            error:'',
        })
    }


    deleteUserWarning = () => {
        this.setState({
            deleting: true,
        })
    }

    closeWarningModal = () => {
        this.setState({
            deleting: false,
        })
    }


    deleteUserPost = id => {

        this.setState({ loading: true })

        axios.delete(`/posts/user/delete/post/${this.props.userId}`, { data: { articleId: id }})
        .then(res => {
            this.setState({
                userArticles: res.data,
                editing: false,
                deleting: false,
                loading: false,
            })
        })
    }

    render() {

        const title = this.state.userArticles.length < 1 ? 
        <>
            <h1>No articles yet :o</h1>

            <p style={{margin: '2em 0'}}>Get on and write your first one</p>
            <Button variant="success" href="/createPost">Write article</Button> 
        </>
            : 
        <>    
            <h1>Your articles</h1>
        </>

    
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
            
            <Container >
                {/* {JSON.stringify(this.state.newdata)} */}

                <Row style={{ margin: '1em 0'}}>
                    <Col className="center">

                            {title}
                    </Col>
                </Row>
                <Row style={{ margin: '1em 0' }}>
                    <Col>
                        <hr />
                    </Col>
                </Row>

                {this.state.userArticles.map(post => {
                    return (
                       <UserPostsItem
                            post={post} 
                            editUserArticle={this.editUserArticle}
                       />
                    )
                })}

                <EditPostModal 
                    show={this.state.editing} 
                    editedPostId={this.state.editedPostId}
                    title={this.state.title}
                    image={this.state.image}
                    tagline={this.state.tagline}
                    titleLen={this.state.titleLen}
                    taglineLen={this.state.taglineLen}
                    topic={this.state.topic}
                    content={this.state.content}
                    error={this.state.error}
                    
                    changeHandler={this.changeHandler}
                    fileChangeHandler={this.fileChangeHandler}
                    submitUpdatedArticle={this.submitUpdatedArticle} 
                    cancelPostEdit={this.cancelPostEdit} 
                    deleteUserWarning={this.deleteUserWarning}
                    
                />
                
                <DeleteWarningModal 
                    editedPostId={this.state.editedPostId}
                    show={this.state.deleting} 
                    onHide={this.state.deleting} 
                    
                    closeWarningModal={this.closeWarningModal}
                    deleteUserPost={this.deleteUserPost}
                />    

            </Container>
            
        )
    }  
}

export default ContextWrapper(UserPostsFeed)