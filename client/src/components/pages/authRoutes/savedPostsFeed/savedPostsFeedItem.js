import React from 'react'
import { Container, Row, Col, Image, Button } from 'react-bootstrap'


export default function SavedArticle(props) {

    return (
    
        <>
            <Row style={{ margin: '1.5em 0'}}>
                <Col md={2}></Col>
                <Col md={3}>
                    <div className="savedPostsFeedItem-image-container">
                        <Image src={props.post.image} width="200px" />
                    </div>
                </Col>
                <Col md={4}>
                    <Row>
                        <Col>
                            <h4 className="savedPostsFeedItem-title">{props.post.title}</h4>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <div className="savedPostsFeedItem-tagline">{props.post.tagline}</div>
                        </Col>
                    </Row>
                    <Row style={{ marginTop: '0.5em', marginBottom: '0.5em'}}>
                        <Col>
                            <div className="savedPostsFeedItem-date">{props.post.author}</div>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <p className="savedPostsFeedItem-views">{props.post.date}</p>
                        </Col>
                    </Row>
                </Col>
                <Col md={3}>
                    <Row style={{ margin: '1.5em 0'}}>
                        <Col>
                            <Button variant="danger" onClick={() => props.removeSavedArticle(props.post._id)}>Remove</Button>
                        </Col>
                    </Row>
                </Col>

            </Row>
        </>
    )
}
