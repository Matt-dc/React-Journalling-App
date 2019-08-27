import React from 'react'
import { Link } from 'react-router-dom'
import { Container, Row, Col, Image } from 'react-bootstrap'

import AuthorDetails from '../../../utils/authorThumbnail'
import ContextWrapper from '../../../../ContextWrapper';


function PersonalizedFeedItem(props) {

    const bookmark = 
        props.savedArticles && props.isAuth ?
            <i class={props.savedArticles.indexOf(props.post._id) === -1 ?
                    "fa fa-bookmark-o bookmark-icon" : 
                    "fa fa-bookmark bookmark-icon" }
                    id={props.post._id}
                    style={{ cursor: 'pointer' }}
                    onClick={() => props.toggleSaveHandler(props.post._id)}>
                </i>
            : ''
        
    return (
    
        <Container className="PersonalizedFeedItem-container" style={{ border: '1px dotted #c6c6c6'}}>

            <Row>
                <Col style={{ padding:'0' }}>
                    <div className="PersonalizedFeedItem-image" style={{ margin: '0', width: '100%', height: '170px', overflow: 'hidden' }}>
                        <Link to={`/${props.post._id}`}>
                            <Image src={props.post.image} width="100%" />
                        </Link>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col>
                    <p className="PersonalizedFeedItem-topic" style={{ color: '#838383', fontSize: '0.8em', margin: '0.6em 0' }}>{props.post.topic}</p>
                </Col>
            </Row>
            <Row>
                <Col>
                <Link to={`/${props.post._id}`}>
                    <h4 className="PersonalizedFeedItem-title" style={{ fontSize: '1.2em', fontWeight: 'bold', margin: '0.2em 0' }}>{props.post.title}</h4>
                </Link>
                </Col>
            </Row>
            <Row>
                <Col>
                    <div className="PersonalizedFeedItem-tagline" style={{ fontSize: '0.8em', color: '#838383', margin: '0.6em 0' }}>{props.post.tagline}</div>
                </Col>
            </Row>

            <Row className="PersonalizedFeedItem-author" style={{ marginBottom: '1em'}}>
                <Col>
                    <AuthorDetails 
                           post={props.post}
                    />     
                </Col>
                <Col md={2} style={{ margin: '2.5em 0 0 0' }}>{bookmark}</Col>
            </Row>

        </Container>


    )
}

export default ContextWrapper(PersonalizedFeedItem)
