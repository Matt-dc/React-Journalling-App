import React from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap'

export default function Error() {
    return (
        <Container>
            <Row style={{ margin: '2em 0 0 0', textAlign: 'center' }}>
                <Col>
                    <h1 style={{ margin: '2em 0 0 0' }}>Oops! It looks like that page doesn't exist :s</h1>
                    <h6 style={{ margin: '2em 0 0 0' }}>Try checking the URL or contact us to report a bug</h6>
                    <Button href="/" style={{ margin: '3em 0 0 0' }}>Back to home</Button>
                </Col>
            </Row>
        </Container>
    )
}
