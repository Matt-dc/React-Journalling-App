import React, { useState} from 'react';
import { Container, Button, Col, Row, Image } from 'react-bootstrap';
import ReplyForm from './replyForm'
import ReplyItem from './replyItem'

import ContextWrapper from '../../ContextWrapper';


const  CommentItem = props => {

    const [ showReply, setShowReply ] = useState(false);
    const handleShowReply = () => setShowReply(true)
    const handleCloseReply = () => setShowReply(false)

    const [ onClickBackground, setBackground ] = useState(false)
    const handleAddBackground = () => setBackground(true)
    const handleRemoveBackground = () => setBackground(false)



    let timeStamp =   (Date.now() - props.comment.date)/1000 <= 20 ? 'now' :

                    // SECONDS
                    (Date.now() - props.comment.date)/1000 < 60 ? 
                        `${Math.round((Date.now() - props.comment.date)/1000)} seconds ago` :
                    // MINUTES
                    (Date.now() - props.comment.date)/1000/60 === 1 ? 
                        `${Math.round((Date.now() - props.comment.date)/1000/60)} minute ago` :
                    (Date.now() - props.comment.date)/1000/60 < 60 ? 
                        `${Math.round((Date.now() - props.comment.date)/1000/60)} minutes ago` :
                    // HOURS
                    (Date.now() - props.comment.date)/1000/60/60 === 1 ? 
                        `${Math.round((Date.now() - props.comment.date)/1000/60)} hour ago` :
                        `${Math.round((Date.now() - props.comment.date)/1000/60/60)} hours ago`;

    return (
        
        <React.Fragment>    
                <Container style={{ 
                            borderTop: '1px solid black', 
                            margin: '1em 0 0 0',
                            padding: '1em 0 0 0 ',
                            // backgroundColor: 'blue',
                            }}>    
                    <Row>
                        <Col sm={1} md={1} >
                            <div className="comment-avatar-container">
                                <a href={props.userId !== props.comment.userId ? `/profile/${props.userId}` : ''}>{props.comment.avatarImage ? <Image src={`/${props.comment.avatarImage}`} width="80px" /> : <i class="fa fa-user fa-3x"></i> }</a>           
                            </div>
                        </Col>
                        <Col sm={10} md={10}>
                            <p className="user-comment"><a href={props.userId !== props.comment.userId ? `/profile/${props.userId}` : '#'}>{props.comment.username}</a></p>
                            <p className="comment-date">{timeStamp}</p>
                        </Col>
                        <Col sm={1} md={1}>
                            {/* pass in logged in user and full comment / reply object */}
                        <span className={onClickBackground ? "like-mousedown comment-likes" : "like-mouseup comment-likes" } 
                            onClick={() => props.handleCommentLike(props.comment, props.userId)} 
                                onMouseDown={handleAddBackground} 
                                onMouseUp={handleRemoveBackground}>
                           <span className={props.comment.commentLikes.includes(props.userId) ? "comment-liked" : "comment-not-liked"}>
                                {props.comment.commentLikes.length}
                                <i class="fa fa-arrow-up"></i>
                            </span>
                        </span>
                            
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={12} md={12}>
                            <p className="comment-item">{props.comment.comment}</p>
                        </Col>
                    </Row>
                   
                  {props.isAuth &&  <Row>
                        <Col sm={1} md={1} >
                            {!showReply && <Button variant="outline-success"
                            onClick={handleShowReply}>Reply</Button>}
                        </Col>
                        <Col sm={10} md={10} >
                            <Button  variant="outline-danger"
                            onClick={() => props.handleCommentDelete(props.comment.commentId)}>Delete</Button>
                        </Col>
                        <Col sm={1} md={1}>

                        </Col>
                    </Row> }

                    <Row>
                        <Col>            
                            <ReplyForm 
                                // replyForm props
                                // commentId={props.comment.commentId}
                                comment={props.comment}  //!!!!

                                // show-hide reply form
                                showReply={showReply} 
                                showReplyInput={handleShowReply} 
                                closeReplyInput={handleCloseReply} 

                                // reply props
                                replyChangeHandler={props.handleReplyChange}
                                handleSubmitReply={props.handleSubmitReply}
                                handleReplyDelete={props.handleReplyDelete}
                                replyValue={props.replyValue}
                                />


                            {props.comment.replies.map(reply => (
                                <ReplyItem 
                                    // replyItem props
                                    reply={reply}
                                    // comment={props.comment}
                                    timeStamp={props.timeStamp}
                                    commentId={props.comment.commentId}
                                    handleReplyChange={props.handleReplyChange}
                                    handleReplyDelete={props.handleReplyDelete}
                                    handleReplyLike={props.handleReplyLike}
                                    handleSubmitReply={props.handleSubmitReply}
                                    replyValue={props.replyValue}

                                    // show-hide reply form
                                    handleShowReply={handleShowReply} 
                                    showReply={showReply} 
                                    />
                            ))}

                        </Col>
                    </Row>
                </Container> 
        </React.Fragment>
    )
}


export default ContextWrapper(CommentItem)