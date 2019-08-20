import React from 'react'
import { Container, Row, Col, Image, Button } from 'react-bootstrap';
import ToggleFollowButton from '../../utils/toggleFollowButton';
import { UserConsumer } from '../../../UserContext'
import AuthorThumbnail from '../../utils/authorThumbnail';
import PostStats from './postStats'

export default function PostHeader(props) {

    return (
        <Container className="post-header-container">
            <UserConsumer>
                {value =>(
                   <>
                    {/* Post Title */}

                        <Row style={{ margin: '0 0 1.5em 0' }}>
                            <Col md={1}></Col>
                            <Col md={10} className="center">
                                <h1 className="postHeader-title">{props.post.title}</h1>
                            </Col>
                            <Col md={1}></Col>
                        </Row>

                        <Row className="" style={{ margin: '2em 0' }}>
                            <Col md={2}></Col>
                            <Col md={2}> <p className="postHeader-topic">{`In ${props.post.topic}`}</p> </Col>
                            <Col md={4} className="postHeader-tagline center">{props.post.tagline}</Col>
                            <Col md={4}></Col>
                        </Row>

                        {/* Main postHeader image */}
                        <Row md={1} style={{ marginBottom: '2em' }}>
                            <Col md={1}></Col>
                            <Col md={10}>
                                <div className="postHeader-image-container">
                                    <Image src={`/${props.post.image}`} width="100%" />
                                </div>
                            </Col>
                        </Row>


                    {/* Header Footer */}
                        <Row className="postHeader-details" style={{ margin: '1em 0' }}>    
                            <Col md={2}></Col>
                            <Col md={4}>
                                <AuthorThumbnail post={props.post} />
                            </Col>

                            <Col md={3}>
                                <PostStats
                                    { ...props }
                                />
                            </Col>

                            <Col md={3}> 
                                {value.isAuth && value.userId !== props.post.authorId && 
                                    <ToggleFollowButton 
                                        authorId={props.post.authorId}
                                        handleFollow={props.post.handleFollow}
                                        following={props.post.following}
                                    /> }  

                                {value.isAuth && value.userId === props.post.authorId && 
                                    <Button variant="secondary" onClick={() => props.editUserArticle(props.articleId)}
                                    > 
                                        Edit post
                                    </Button> 
                                }  
                                
                            </Col>

                        </Row>
                    </>
                )}
            </UserConsumer>

            
        </Container>
    )
}
