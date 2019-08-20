import React from 'react'
import { Container, Row, Col, Image } from 'react-bootstrap'

import FollowButton from './followButton'

export default function FollowedUsersListItem(props) {

    return (
            <Container>
                <Row style={{borderBottom: '1px dotted #c5c5c5', padding: '1em 0'}} >
                    <Col md={2}></Col>
                    
                    <Col md={3}>
                        <div className="followingFeedItem-image-container">
                            <Image src={`/${props.user.image}`} width="170px" />
                        </div>
                    </Col>
                    
                    <Col md={4} style={{ padding: '1.3em 0 0 0' }}>
                        <Row>
                            <Col>
                                <h5 className="followingFeedItem-username">{props.user.username}</h5>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <p className="followingFeedItem-date">{`Date joined: ${props.user.joined}`}</p>
                            </Col>
                        </Row>
                    </Col>
                   
                    <Col style={{ padding: '1.5em 0 0 0' }}>
                        {props.user && 
                        <FollowButton
                            handleFollow={() => props.handleFollow(props.user)}
                            user={props.user}
                        />}
                    </Col>
                </Row>
            </Container>
    )
}
