import React, { useState} from 'react';
import { Container, Row, Col, Image, Button } from 'react-bootstrap'
import ReplyForm from './replyForm'
import ContextWrapper from '../../ContextWrapper';


const ReplyItem = props => {

    const [ showReply, setShowReply ] = useState(false);
    const handleShowReply = () => setShowReply(true)
    const handleCloseReply = () => setShowReply(false)
    
    const [ onClickBackground, setBackground ] = useState(false)
    const handleAddBackground = () => setBackground(true)
    const handleRemoveBackground = () => setBackground(false)

 let timeStamp =   (Date.now() - props.reply.date)/1000 <= 20 ? 'now' :

                        // SECONDS
                        (Date.now() - props.reply.date)/1000 < 60 ? 
                            `${Math.round((Date.now() - props.reply.date)/1000)} seconds ago` :
                        // MINUTES
                        (Date.now() - props.reply.date)/1000/60 === 1 ? 
                            `${Math.round((Date.now() - props.reply.date)/1000/60)} minute ago` :
                        (Date.now() - props.reply.date)/1000/60 < 60 ? 
                            `${Math.round((Date.now() - props.reply.date)/1000/60)} minutes ago` :
                        // HOURS
                        (Date.now() - props.reply.date)/1000/60/60 === 1 ? 
                            `${Math.round((Date.now() - props.reply.date)/1000/60)} hour ago` :
                            `${Math.round((Date.now() - props.reply.date)/1000/60/60)} hours ago`;

    return (
        <React.Fragment>
            <Container style={{
                    marginTop: '0.5em',
                    borderTop: '1px solid black',
                    // borderBottom: '1px solid black',
                    padding: '1em 0 0 2em',
                    // backgroundColor: 'red',

                    }}>
                <Row>
                    <Col sm={1} md={1} >
                            <div className="comment-avatar-container">
                                <a href={`/profile/${props.userId}`}>{props.reply.avatarImage ? <Image src={`/${props.reply.avatarImage}`} width="80px" /> : <i class="fa fa-user fa-2x"></i> }</a>           
                            </div>
                    </Col>
                    <Col sm={10} md={10}>
                        <Row>
                        <span className="replier-comment"><a href={props.userId !== props.reply.userId ? `/profile/${props.userId}` : '#'}>{props.reply.username}</a></span>
                            <i class="fa fa-angle-double-right reply-arrow"></i>
                        <span className="replied-comment"><a href={props.userId !== props.reply.userId ? `/profile/${props.userId}` : '#'}>{props.reply.replyTo}</a></span>
                        </Row>
                        <Row>
                        <span className="comment-date">{timeStamp}</span>   
                        </Row>
                    </Col>
                    <Col sm={1} md={1}>
                        {/* pass in logged in user and full comment / reply object */}
                            <span className={onClickBackground ? "like-mousedown comment-likes" : "like-mouseup comment-likes" } 
                                    onClick={() => props.handleReplyLike(props.commentId, props.reply.replyId, props.userId)}  
                                        onMouseDown={handleAddBackground} 
                                        onMouseUp={handleRemoveBackground}>
                                <span className={props.reply.commentLikes.includes(props.userId) ? "comment-liked" : "comment-not-liked"}>
                                    {props.reply.commentLikes.length}
                                    <i class="fa fa-arrow-up"></i>
                                </span>
                            </span>
                    </Col>
                </Row>
                <Row>   
                    <Col sm={12} md={12}>
                        <p className="reply-item">{props.reply.reply}</p>
                    </Col>
                </Row>
        
                {!showReply && props.isAuth && 
                <Row>
                    <Col sm={1} md={1}>
                        <Button  variant="outline-success" 
                        onClick={handleShowReply}>Reply</Button>
                    </Col>
                    <Col sm={10} md={10}>
                        <Button  variant="outline-danger"
                        onClick={() => props.handleReplyDelete(props.reply)}>Delete</Button>
                    </Col>
                    
                </Row>
                }

                <Row>
                    <Col>
                        <ReplyForm 
                        // props
                        user={props.reply.user}
                        commentId={props.commentId}

                        comment={props.reply}
                        replyChangeHandler={props.handleReplyChange}
                        handleSubmitReply={props.handleSubmitReply}
                        handleReplyDelete={props.handleReplyDelete}
                        replyValue={props.replyValue}
                        
                        // show-hide reply form
                        showReply={showReply} 
                        showReplyInput={handleShowReply} 
                        closeReplyInput={handleCloseReply} 
                        />
                    </Col>
                </Row>
            </Container>
        </React.Fragment>
    )
}


export default ContextWrapper(ReplyItem)
