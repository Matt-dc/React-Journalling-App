import React from 'react';

// import Bootstrap from 'bootstrap'
import { Image, Row, Col, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import ContextWrapper from '../../../ContextWrapper';


const PersonalizedThumbnail = props => {

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

        <Container style={{ margin: '1.3em 0' }}>

                <Row>
                   
                    <Col md={8} sm={8}>
                        
                        <Row>
                            <Col md={11} sm={11}>
                                {/* {props.post._id} */}
                                <Link to={`/readpost/${props.post._id}`}><p className="personalizedThumbnail-topic">{props.post.topic}</p></Link>
                                <Link to={`/readpost/${props.post._id}`}><h5 className="personalizedThumbnail-title">{props.post.title}</h5></Link>
                                <Link to={`/readpost/${props.post._id}`}><p className="personalizedThumbnail-tagline">{props.post.tagline}</p></Link>
                            </Col>
                        </Row>

                        <Row>
                            <Col md={5} sm={5}>
                                <Link to={`/profile/${props.post.authorId}`}><p className="personalizedThumbnail-author">{props.post.author}</p></Link>
                            </Col>
                        </Row>

                        <Row>
                            <Col>
                                <Link to={`/${props.post._id}`}> <p className="personalizedThumbnail-date">{props.post.date}</p></Link>
                            </Col>
                            <Col md={6} sm={6}>
            
                                <p className="personalizedThumbnail-comments">{`${props.post.comments} comments`}</p>
                            </Col>
                           
                           <Col md={1}>{bookmark}</Col>
                        </Row>

                    </Col>

                    <Col md={4}  sm={4}>
                        <Link to={`/readpost/${props.post._id}`}>
                            <div className="personalizedThumbnail-image-container">
                                <Image className="personalizedThumbnail-image" src={`/${props.post.image}`} />
                            </div>
                        </Link>    
                    </Col>
            </Row>

        </Container>
    )
}

export default ContextWrapper(PersonalizedThumbnail)