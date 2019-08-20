import React, { Component } from 'react'

import { Col, Row, Container } from 'react-bootstrap';
import CommentItem from './commentItem'
import CommentForm from './commentForm'

import axios from 'axios';
import uuid from 'uuid'

import { UserConsumer } from '../../UserContext'
import ContextWrapper from '../../ContextWrapper';


class Comments extends Component {

    state = {
        img: 'img',
        comment:'',
        reply: '',
        savedComments: [],
        commentsObject: {
            comments: [],
        },
        comments: [],
    }



    static getDerivedStateFromProps(props, state) {
        if(props.userId !== state.userId) {
            return {
                userId: props.userId
            }
        }
    }


    // GET INITIAL COMMENTS ON PAGELOAD
    componentDidUpdate(prevProps) {

        if(this.props.articleId !== prevProps.articleId) {

        axios.get(`/comments/${this.props.articleId}`)
        .then(res => {
                if(res.data) {
                    this.setState({  
                        commentsObject: res.data,
                        })
                }
            })  
        }
    }


    handleCommentChange = value => {
        this.setState({
            comment: value,
            })
    }


    // DONE
    handleSubmitComment = () => {

        const userComment = {
            commentId: uuid.v4(),
            userId: this.props.userId,
            avatarImage: this.props.avatarImage,
            commentLikes:[],
            username: this.props.username,
            comment: this.state.comment,
            date: Date.now(),
            replies: [],
        }

        const updatedComments = {
                articleId: this.props.articleId,
                comments: [ ...this.state.commentsObject.comments, userComment ],
                closed: false,
            }
    // commentsId is the articleId
                axios.put(`/comments/update/${this.props.articleId}`, updatedComments)
                .then(res => {
                    this.setState({
                        commentsObject: res.data,
                        comment:'',
                    })                     
                })  
    }


    //DONE
    handleCommentDelete = commentId => {
        
        this.setState({
            comments: this.state.commentsObject.comments.filter(comment => {
                return comment.commentId !== commentId
            })
        }, 
            () => {

                const commentsObj = {
                    articleId: this.state.articleId,
                    comments: this.state.comments,
                    closed: false,
                }

                    axios.put(`/comments/update/${this.props.articleId}`, commentsObj)
                    .then(res => {
                        this.setState({
                            resData: res.data
                        }, () => {

                            axios.get(`/comments/${this.props.articleId}`)
                            .then(res => {
                                    if(res.data) {
                                        this.setState({  
                                            commentsObject: res.data,
                                            comment:'',
                                            })
                                    }
                            })
                        }    
                    )
                })
            })
    }



    handleReplyChange = value => {
        this.setState({
            reply: value
        })
    }



    //commentID MUST be the top level comment id, user should be the user of the reply button clicked on    
    handleSubmitReply = repliedToComment => {

        const replyObject = {
            username: this.props.username,
            avatarImage: this.props.avatarImage,
            userId: this.props.userId,
            commentLikes:[],
            commentId: repliedToComment.commentId,
            replyId: uuid.v4(),
            replyTo: repliedToComment.username,
            reply: this.state.reply,
            date: Date.now(), 
        }

        this.setState({
            comments: this.state.commentsObject.comments.map(comment => {
                if(comment.commentId === repliedToComment.commentId) { 
                return {
                    ...comment, replies: [ ...comment.replies, replyObject] 
                        }
                } else  {
                    return comment
                }
            })
            }, () => {
               
                this.setState(prevState => {
                        let commentsObject = Object.assign({}, prevState.commentsObject)
                            commentsObject.comments = this.state.comments
                            return { commentsObject}
                
                    }, () => {

                        axios.put(`/comments/update/${this.props.articleId}`, this.state.commentsObject)
                        .then(res => {
                            
                            axios.get(`/comments/${this.props.articleId}`)
                            .then(res => {
                                    if(res.data) {
                                        this.setState({  
                                            commentsObject: res.data,
                                            reply:'',
                                            })
                                    }
                            }) 
                        })
                        
                    })    
            })  
    }


    handleCommentLike = (repliedToComment, userId) => {

        this.setState({
            comments: this.state.commentsObject.comments.map(comment => {
                if(comment.commentId === repliedToComment.commentId) {
                    if(comment.commentLikes.includes(userId)) {
                        return {
                            ...comment, commentLikes: comment.commentLikes.filter(like => {
                                                            return like != userId
                                                        })
                            }
                            } else {
                                return {
                                    ...comment, commentLikes: [ ...comment.commentLikes, userId ]
                                }
                            }

                } else {
                    return comment
                }
                
            })
        }, () => {
            this.setState(prevState => {
                let commentsObject = Object.assign({}, prevState.commentsObject)
                commentsObject.comments = this.state.comments
                return { commentsObject }

            }, () => {
                axios.put(`comments/update/${this.props.articleId}`, this.state.commentsObject)
                .then(res => {
                    this.setState({
                        commentsObject: res.data
                    })
                })
            })
        })

    }


    handleReplyLike = (commentId, replyId, userId) => {

        this.setState({
            comments: this.state.commentsObject.comments.map(comment => {
                if(comment.commentId === commentId) {
                    return {
                        ...comment, replies: comment.replies.map(reply => {
                            if(reply.replyId === replyId) {
                                if(reply.commentLikes.includes(userId)){
                                    return {
                                        ...reply, commentLikes: reply.commentLikes.filter(like => {
                                            return like != userId
                                        })
                                    }
                                } else {
                                    return {
                                        ...reply, commentLikes: [ ...reply.commentLikes, userId ]
                                    } 
                                }
                               
                            } else {
                            return reply
                        }
                    })
                }
                } else {
                    return comment
                }
            })
        }, () => {
            this.setState(prevState => {
                let commentsObject = Object.assign({}, prevState.commentsObject)
                commentsObject.comments = this.state.comments
                return { commentsObject }

            }, () => {
                axios.put(`comments/update/${this.props.articleId}`, this.state.commentsObject)
                .then(res => {
                    this.setState({
                        commentsObject: res.data
                    })
                })
            })
        })
    }



    handleReplyDelete = replyToDelete => {

        this.setState({

            updatedReplies: this.state.commentsObject.comments.map(comment => {
                return {
                    ...comment, replies: comment.replies.filter(reply => 
                        reply.replyId !== replyToDelete.replyId)
                }
               
            })
        }, 
        
        () => {

            const commentsObj = {
                articleId: this.state.articleId,
                comments: this.state.updatedReplies,
                closed: false,
            }

            axios.put(`/comments/update/${this.props.articleId}`, commentsObj)
            .then(res => {
                this.setState({
                    commentsObject: res.data
                })
            })
        })
    }



 render() {
     return(

        <Container>
            {/* articleID::::  {this.props.articleId} ... here <br/><br/> */}
            {/* {JSON.stringify(this.state.commentsObject)} */}
            <UserConsumer>
                {value => (
                    <>
                    {value.isAuth && <Row>
                        <Col sm={2} md={2} ></Col>
                        <Col sm={8} md={8}>
                        
                            <CommentForm 
                                comment={this.state.comment}
                                handleSubmitComment={this.handleSubmitComment}
                                commentChangeHandler={this.handleCommentChange}
                            />

                        </Col>
                        <Col sm={2} md={2} ></Col>
                    </Row> }  
                    </>
                )}
                
            </UserConsumer>
           

            <Row>
                <Col>
                    { this.state.commentsObject.comments.map(comment => (
                        <CommentItem
                            // comments
                            getTimeStamp={this.getTimeStamp}
                            comment={comment}
                            handleCommentDelete={this.handleCommentDelete}
                            handleCommentLike={this.handleCommentLike}
                            handleReplyLike={this.handleReplyLike}

                            // drilled down to replyForm & replyItem
                            handleReplyChange={this.handleReplyChange}
                            handleSubmitReply={this.handleSubmitReply}
                            handleReplyDelete={this.handleReplyDelete}
                            replyValue={this.state.reply}
                        />
                    ))
                    }
                    </Col>
            </Row>

        </Container>

        )
    }
}


export default ContextWrapper(Comments)



// const timeStamp =   
//     (Date.now() - props.comment.date)/1000 <= 20 ? 
//         `${Math.round((Date.now() - props.comment.date)/1000/60)} now` :
//     (Date.now() - props.comment.date)/1000 <= 60 ? 
//         `${Math.round((Date.now() - props.comment.date)/1000/60)} seconds` :
//     (Date.now() - props.comment.date)/1000/60 <= 60 ? 
//         `${Math.round((Date.now() - props.comment.date)/1000/60)} minutes` :
//         `${Math.round((Date.now() - props.comment.date)/1000/60/60)} hours`;

