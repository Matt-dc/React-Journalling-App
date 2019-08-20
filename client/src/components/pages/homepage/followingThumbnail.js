import React from 'react';

// import Bootstrap from 'bootstrap'
import { Image, Row, Col, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom'


const FollowingThumbnail = props => {


    return (

        <Container style={{ margin: '1.3em 0', padding: '0.4em' }}>

                <Row>
                    <Col md={1}></Col>
                    <Col md={2}  sm={2} style={{ padding: 0}}>
                        <Link to={`/readpost/${props.post._id}`}>
                            <div>
                                <Image className="followingThumbnail-image" src={`/${props.post.image}`} />
                            </div>
                        </Link>    
                    </Col>

                    <Col md={8} sm={8}>
                        
                        <Row>
                            <Col md={11} sm={11}>
                                {/* {props.post._id} */}
                                <Link to={`/readpost/${props.post._id}`}><h5 className="followingThumbnail-title">{props.post.title}</h5></Link>
                            </Col>
                            
                        </Row>
                        <Row>
                            <Col md={5} sm={5}>
                                <Link to={`/profile/${props.post.authorId}`}><p className="followingThumbnail-author">{props.post.author}</p></Link>
                            </Col>
                          <Col></Col>
                           
                        </Row>
                        <Row>    
                            <Col>
                                <Link to={`/readpost/${props.post._id}`}> <p className="followingThumbnail-date">{props.post.date}</p></Link>
                            </Col>
                            <Col md={6} sm={6}>
            
                                <p className="followingThumbnail-comments">{`${props.post.comments} comments`}</p>
                            </Col>
                        </Row>

                    </Col>

    
            </Row> 

        </Container>
    )
}

export default FollowingThumbnail