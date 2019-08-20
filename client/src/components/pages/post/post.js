import React, { Component } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import Comments from '../../comments/commentsController';
import axios from 'axios';
import PostHeader from './postHeader';
import ContextWrapper from '../../../ContextWrapper';
import PostEditModal from './editPostModal'
import DeleteWarningModal from '../../utils/deleteWarningModal'


class Post extends Component {

    state = {
        post: '',
        topic: '',
        authorId: '',
        author: '',
        post: '',
        images: [],
        tags: [],
        edit_log: [],
        following: [],
        views: null,
        editing: false,
        deleting: false,
        deleted: false,
        postLikes: [],
        readingHistory: [],
        readLength: null,
        userLikes: [],
        comments: [],
        views: '',
        
    }

    
    componentDidMount() {
          
        const { id } = this.props.match.params

        this.setState({
            articleId: id
        })

        //get the post
        axios.get(`/posts/singlepost/${id}`)
            .then(res => {
                this.setState({
                    post: res.data,
                    author: res.data.author,
                    authorId: res.data.authorId,
                    postLikes: res.data.postLikes,
                    views: res.data.views.length,
                }, () => this.getReadLength())
        })


        // get following, likes from logged in user
        axios.get(`/users/`)
        .then(res => {
            this.setState({
                following: res.data.user.following,
                userLikes: res.data.user.likes,
            })
        })
        .catch(err => {
            this.setState({
                following: null,
                userLikes: null,
            })
        })

    }


    componentDidUpdate(prevProps) {

        if(this.props.userId !== prevProps.userId) {

              // increase view count
              const userObj = { userId: this.props.userId }
              axios.put(`/posts/update/views/${this.state.articleId}`, userObj)
              .then(res => {
                  this.setState({
                      views: res.data.views.length,
                  })
              })
  
              // add article to readingHistory
              const articleId = { articleId: this.state.articleId }
              axios.put(`/users/update/readinghistory/${this.props.userId}`, articleId)
              .then(res =>  {
                  this.setState({
                      readingHistory: res.data.reading_history,
                  })
              })
        }
    }


    getReadLength = () => {

        const post = this.state.post.content
        const postReadLength = post.split(' ').length

        let minuteRead = Math.round(postReadLength / 225)
        if(minuteRead === 0) minuteRead = 1
            
            this.setState({
                readLength: minuteRead
            })
    }


    handleLike = () => {
       
        // update likes for user
        const obj = { 
            toToggle: this.state.articleId,
            name: 'likes'
        }

        axios.put(`users/update/likes/${this.props.userId}`, obj)
        .then(res => {
            this.setState({
                userLikes: res.data.likes,
            })
        })

        // update likes on post
        const userId = { userId: this.props.userId}

        axios.put(`/posts/update/likes/${this.state.articleId}`, userId)
       .then(res => {
           this.setState({
               res: res.data,
               postLikes: res.data.postLikes
           })
       })
    }



    handleFollow = () => {

        if(this.state.authorId === this.props.userId) return

        const obj = { 
                toToggle: this.state.authorId,
                name: 'following'
            }
    
        axios.put(`/users/update/following/${this.props.userId}`, obj) 
            .then(res =>  {
                this.setState({
                    following: res.data.following
                })
            })
    }



    changeHandler = e => {
        this.setState({
            [ e.target.name ]: e.target.value,
            titleLen: 60 - this.state.title.length,
            taglineLen: 60 - this.state.tagline.length,
            error: '',
        })
    }


    handleEditorChange = e => {
        this.setState({
            content: e.target.getContent(),
        })
    }


    editUserArticle = () => {

        axios.get(`/posts/user/post/${this.state.articleId}`)
        .then(res => {
            this.setState({
                post: res.data,
                editedPostId: res.data._id,
                image: res.data.image,
                title: res.data.title,
                tagline: res.data.tagline,
                topic: res.data.topic,
                content: res.data.content,
                editing: true
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

        if(this.state.title.length < 5 || this.state.title.length > 60 || this.state.tagline.length < 5 || this.state.tagline.length > 60 ) {
            this.setState({
                error: 'The title and tagline should be between 5 and 40 characters long'
            })
            return 
        }

        const updatedPost = {
            articleId: this.state.editedPostId,
            title: this.state.title,
            tagline: this.state.tagline,
            topic: this.state.topic,
            content: this.state.content,
        }

        axios.put(`/posts/user/update/post/getone`, updatedPost)
        .then(res => {
            this.setState({
                post: res.data,
                author: res.data.author,
                authorId: res.data.authorId,
                postLikes: res.data.postLikes,
                views: res.data.views.length,
                editing: false,
            }, () => this.getReadLength())
        })
    }


    cancelPostEdit = () => {

        this.setState({
            editing:false,
            editedPostId: null,
            title: null,
            tagline:null,
            topic:null,    
            content: null,
        })
    }


    deleteUserWarning = () => {

        this.setState({
            deleting: true
        })
    }

    closeWarningModal = () => {

        this.setState({
            deleting: false
        })
    }


    deleteUserPost = id => {

        axios.delete(`/posts/user/delete/post/${this.props.userId}`, { data: { articleId: id }})
        .then(res => {
            this.setState({
                editing: false,
                deleting: false,
                deleted: true,
            })
        })
    }



    render() {

        return (

            !this.state.deleted ?


            <Container>
                <Row>
                    <Col>
                        <PostHeader 
                            { ...this.state }

                            // readLength={this.state.readLength}
                            // postLikes={this.state.postLikes}
                            // views={this.state.views}
                            // warnLogin={this.props.warnLogin}


                            handleLike={() => this.handleLike()}
                            handleFollow={() => this.handleFollow(this.state.authorId)}
                            editUserArticle={this.editUserArticle}
                            warnLogin={this.props.warnLogin}
                        />
                    </Col>
                </Row>
                

                <Row style={{ margin: '2em 0' }}>
                    <Col md={2}></Col>
                    <Col md={8}>
                        <div dangerouslySetInnerHTML={{ __html: this.state.post.content }} />
                    </Col>
                    <Col md={2}></Col>
                </Row>

                <hr />
                
                <Row style={{ margin: '2em 0'}}>
                    <Col md={2}></Col>
                    <Col md={8}>
                        <h4>{`${this.state.post.comments} Comments`}</h4>
                    </Col>
                    <Col md={2}></Col>
                </Row>
                <Row>
                    <Col>
                        <Comments 
                            handleLike={this.handleLike}
                            post={this.state.post}
                            articleId={this.state.articleId}
                        />
                    </Col>
                </Row>


                <PostEditModal 
                    show={this.state.editing} 
                    title={this.state.title}
                    image={this.state.image}
                    tagline={this.state.tagline}
                    topic={this.state.topic}
                    content={this.state.content}
                    editedPostId={this.state.editedPostId}
                    error={this.state.error}    
                    img={this.state.img}

                    titleLen={this.state.titleLen}
                    taglineLen={this.state.taglineLen}
                    changeHandler={this.changeHandler}
                    handleEditorChange={this.handleEditorChange}
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
            
            :


            <Container>

                <Row className="center">
                    <Col>
                        <h1>Post deleted</h1>
                    </Col>
                </Row>
                <Row className="center" style={{ margin: '3em 0' }}>
                    <Col>
                        <Button href="/home">Ok</Button>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default ContextWrapper(Post);

