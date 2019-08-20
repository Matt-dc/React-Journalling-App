import React from 'react'
import { Link } from 'react-router-dom'
import { Container, Row, Col, Image } from 'react-bootstrap'

import AuthorThumbnail from '../../utils/authorThumbnail'

export default function topicHeaderPost(props) {

    const bookmark = 
        props.savedArticles && props.savedArticles.length > 0 && props.isAuth ?
            <i class={props.savedArticles.indexOf(props.post._id) === -1 ?
                    "fa fa-bookmark-o bookmark-icon" : 
                    "fa fa-bookmark bookmark-icon" }
                    id={props.post._id}
                    style={{ cursor: 'pointer' }}
                    onClick={() => props.toggleSaveHandler(props.post._id)}>
                </i>
            : ''

    return (

        <Container style={{ margin: '3em 0' }}>
            <Row>
                <Col md={8}>
                    <Row>
                        <Col>
                            <div className="topicHeaderPost-image-container">
                                <Link to={`/readpost/${props.post._id}`}>
                                    <Image src={`/${props.post.image}`} width="100%" />
                                </Link>    
                            </div>
                        </Col>
                    </Row>
                </Col>
                <Col md={4}>
                    <Row>
                        <Col>
                            <Link to={`/readpost/${props.post._id}`}>
                                <h1 className="topicHeaderPost-title">{props.post.title}</h1>
                            </Link>    
                        </Col>
                        <Col md={1} style={{ marginTop: '0.5em' }}>
                            {bookmark}    
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Link to={`/readpost/${props.post._id}`}>
                                <p className="topicHeaderPost-tagline">{`${props.post.tagline}`}</p>
                            </Link>    
                        </Col>
                      
                    </Row>
                    <Row style={{ margin: '0.6em 0' }}>
                        <Col style={{ padding: '0' }}>
                            <AuthorThumbnail 
                                post={props.post} 
                            />
                        </Col>
                    </Row>
                </Col>
            
            </Row>
   
        </Container>
    )

}
