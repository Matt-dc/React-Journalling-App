import React from 'react'
import { Row, Col, Image } from 'react-bootstrap'

import AuthorThumbnail from '../../utils/authorThumbnail'


export default function AuthorLatestPostItem(props) {
    return (
        <>
            <Row style={{margin: '2em 0', padding:'2.5em 0', borderTop: '1px dotted #c6c6c6'}}>
                <Col md={2}></Col>
                <Col md={5}>
                    <div className="authorLatestPostItem-image-container">
                        <Image src={`/${props.post.image}`} width="200px" />
                    </div>
                </Col>
                <Col >
                    <h4 className="authorLatestPostItem-title">{props.post.title}</h4>
                    <p className="authorLatestPostItem-tagline">{`${props.post.tagline.substring(0,100)}...`}</p>
                    <AuthorThumbnail post={props.post} /> 
                </Col>
            </Row>   
        </>
    )        
}
