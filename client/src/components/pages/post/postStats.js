import React from 'react'
import { Container } from 'react-bootstrap';
import { UserConsumer } from '../../../UserContext'


export default function PostStats(props) {

    return (
    
        <Container style={{ margin: '0.5em 0 0 0'}}>
            <UserConsumer>
                {value => (
                    <>
                        <div className="postStats-top">
                            {value.isAuth ?
                                <div onClick={props.handleLike} className={props.userLikes.includes(props.articleId) ? 'postStats-liked' : 'postStats-unliked' }>
                                    <span>{props.postLikes.length}</span>
                                    <i class="fa fa-thumbs-o-up" style={{ marginLeft: '10px' }}></i> 
                                </div>
                            : 
                                <div onClick={() => props.warnLogin()} className='postStats-unliked'>
                                    <span>{props.postLikes.length}</span>
                                    <i class="fa fa-thumbs-o-up" style={{ marginLeft: '10px' }}></i> 
                                </div>
                        }
                            <div className="postStats-length">
                                {`${props.readLength} minute read`}
                            </div>
                            
                            <div className="postStats-views">
                                Views: {props.views ? props.views : 0 }
                            </div>
                        </div>
                        <div className="postStats-bottom">

                        {value.isAuth 
                        ? 
                         <div className={props.readingHistory.includes(props.articleId) ? "postStats-read" : "postStats-unread" }>
                            {props.readingHistory.includes(props.articleId) ? <i>Read</i> : 'Unread'} 
                        </div>
                        :
                        ''

                        }
                           
                           
                        </div>     
                </>   
                )}  
            </UserConsumer>
        </Container>
    )
}

