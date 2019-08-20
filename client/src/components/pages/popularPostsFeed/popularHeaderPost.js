import React from 'react'
import { Link } from 'react-router-dom'
import { Container, Row, Col, Image } from 'react-bootstrap'
import AuthorDetails from '../../utils/authorThumbnail'

export default function PopularHeaderPost(props) {

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
        
        <Container>

            <Row style={{ margin: '0 0 2em 0' }}>
                <Col md={8}>
                    <Row>
                        <Col>
                            <div className="popularHeaderPost-image-container">
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
                            <h1 className="popularHeaderPost-page-title">{props.pageTitle}</h1>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <p className="popularHeaderPost-page-tagline">{props.pageTagline}</p>
                        </Col>
                    </Row>
                </Col>   
            </Row>

            <Row>
                <Col md={4}>
                    <Row style={{ margin: '0.5em 0 0 0' }}>
                        <Col>
                            <Link to={`/readpost/${props.post._id}`}>
                                <h3 className="popularHeaderPost-title">{props.post.title}</h3>
                            </Link>    
                        </Col>
                    </Row>
                    <Row style={{ margin: '0 0 0 0' }}>
                        <Col>
                            <Link to={`/readpost/${props.post._id}`}>
                                <p className="popularHeaderPost-tagline">{`${props.post.tagline}`}</p>
                            </Link>    
                        </Col>
                    </Row>
                </Col>

                <Col md={3}>
                    <AuthorDetails post={props.post} />
                </Col>
                <Col md={1} style={{ marginTop: '0.5em' }}>
                    {bookmark}    
                </Col>
            </Row>
        </Container>
    )

}
