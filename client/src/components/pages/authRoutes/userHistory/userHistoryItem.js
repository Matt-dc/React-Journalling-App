import React from 'react'
import { Row, Col, Image, Button } from 'react-bootstrap'


export default function UserHistoryItem(props) {

    return (
    
        <>
            <Row style={{ margin: '1.5em 0' }}>
                <Col lg={0} md={0} sm={0} xs={0}></Col>
                <Col lg={4} md={5} sm={5} xs={6}>
                    <div className="userHistoryItem-image-container">
                        <Image src={props.post.image} width="200px" />
                    </div>
                </Col>
                <Col lg={4} md={5} sm={5} xs={6}>
                    <Row>
                        <Col>
                            <h4 className="userHistoryItem-title">{props.post.title}</h4>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <div className="userHistoryItem-tagline">{props.post.tagline}</div>
                        </Col>
                    </Row>
                    <Row style={{ marginTop: '0.5em', marginBottom: '0.5em'}}>
                        <Col>
                            <div className="userHistoryItem-date">{props.post.author}</div>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <p className="userHistoryItem-views">{props.post.date}</p>
                        </Col>
                    </Row>
   
                </Col>
                <Col lg={3} md={3} sm={2} xs={12}>
                    <Row style={{ margin: '1.5em 0'}}>
                        <Col>
                            <Button variant="danger" onClick={() => props.deleteHistoryItem(props.post._id)}>Remove</Button>
                        </Col>
                    </Row>
                </Col>

            </Row>
        </>
    )
}
