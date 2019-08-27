import React from 'react';
import { Image, Row, Col, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import AuthorThumbnail from '../../utils/authorThumbnail'
import ContextWrapper from '../../../ContextWrapper'

const CenterThumbnail = props => {

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

        <Container style={{ margin: '0 0 1em 0', padding: '0' }}>

                <Row>
                    <Col lg={5} md={5} sm={5} xs={5}>
                        <Link to={`/readpost/${props.post._id}`}>
                            <div className="crop">
                                <Image className="centerThumbnail-image" src={`/${props.post.image}`} />
                            </div>
                        </Link>    
                    </Col>
                    <Col lg={7} md={7} sm={7} xs={7}>
                        <Row>
                            <Col md={10} sm={10}>
                                {/* {props.post._id} */}
                                <Link to={`/readpost/${props.post._id}`}><h5 className="centerThumbnail-title">{props.post.title}</h5></Link>
                                <Link to={`/readpost/${props.post._id}`}><p className="centerThumbnail-tagline">{props.post.tagline.substring(0,20)}...</p></Link>
                            </Col>
                            
                        </Row>
                        <Row>
                            <AuthorThumbnail 
                                post={props.post}
                            />  
                        </Row>
                </Col>
            </Row>

        </Container>
    )
}

export default ContextWrapper(CenterThumbnail)