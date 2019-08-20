import React from 'react'

import { Container, Row, Col, Image, Button } from 'react-bootstrap';


export default function UserArticle(props) {
    return (
        <Container style={{ margin: '2em 0'}}>
            
            <Row>
                <Col md={2} sm={0} xs={0}></Col>
                <Col md={3} sm={3} xs={3}>
                    <div className="userPostsItem-image-container">
                        <Image src={props.post.image} width="200px" />
                    </div>
                </Col>
                <Col md={4} sm={8} xs={6}>
                    <Row>
                        <Col>
                            <h4 className="userPostsItem-title">{props.post.title}</h4>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <div className="userPostsItem-tagline">{props.post.tagline}</div>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <div className="userPostsItem-date">{props.post.date}</div>
                        </Col>
                    </Row>
                    <Row >
                        <Col md={4} sm={2} xs={0}>
                            <p className="userPostsItem-views">{props.post.views.length} views</p>
                        </Col>
                        <Col md={4} sm={2} xs={0}>
                            <p className="userPostsItem-comments">{props.post.comments} comments</p>
                        </Col>
                        <Col md={4} sm={2} xs={0}>
                            <p className="userPostsItem-likes">{props.post.postLikes.length} likes</p>
                        </Col>
                    </Row>
                </Col>
                <Col md={1} sm={1} xs={1}>
                    <Row style={{ margin: '1.5em 0'}}>
                        <Col>
                            <Button variant="secondary" onClick={() => props.editUserArticle(props.post._id)}>Edit</Button>
                        </Col>
                    </Row>
                    
                </Col>
            </Row>

        </Container>
    )
            

}
