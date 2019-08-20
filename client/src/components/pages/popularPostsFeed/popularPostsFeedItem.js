import React from 'react'
import { Link } from 'react-router-dom'
import { Container, Row, Col, Image } from 'react-bootstrap'
import AuthorDetails from '../../utils/authorThumbnail'

export default function PopularPostsFeedItem(props) {

    const bookmark = 
        props.savedArticles && props.savedArticles.length > 0 && props.isAuth ?
            <i class=   {props.savedArticles.indexOf(props.post._id) === -1 ?
                    "   fa fa-bookmark-o bookmark-icon" : 
                    "   fa fa-bookmark bookmark-icon" }
                    i   d={props.post._id}
                    s   tyle={{ cursor: 'pointer' }}
                    o   nClick={() => props.toggleSaveHandler(props.post._id)}>
                </i>    
            : ''    

    return (
        <Container style={{ margin: '2.5em', borderBottom: '1px dotted #c5c5c5' }}>
                <Row>
                    <Col md={5}>
                        <Row>
                            <Col md={10}>
                                <Link to={`/readpost/${props.post._id}`}>
                                    <h4 className="popularFeedItem-title">{props.post.title}</h4>
                                </Link>
                            </Col>
                            <Col md={1} >
                                {bookmark}    
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <div className="popularFeedItem-tagline">{props.post.tagline}</div>
                            </Col>
                        </Row>
                        <Row style={{ marginTop: '0.5em', marginBottom: '0.5em'}}>
                            <Col md={8}>
                                <Link to={`/readpost/${props.post._id}`}>   
                                    <AuthorDetails 
                                        post={props.post}
                                    />
                                </Link>
                            </Col>
                        
                        </Row>
                    </Col>
                    <Col md={3}>
                        <div className="popularFeedItem-image-container">
                            <Link to={`/readpost/${props.post._id}`}>
                                <Image src={props.post.image} width="200px" />
                            </Link>
                        </div>
                    </Col>
                </Row>
        </Container>
    )
}
