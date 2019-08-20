import React from 'react'
import { Modal, Button } from 'react-bootstrap';

export default function LoginWarningModal(props) {
    return (
        <Modal { ...props }>
            <Modal.Header>
            <Modal.Title>Login</Modal.Title>
            </Modal.Header>
        
            <Modal.Body>
            <p>Please login first, before liking</p>
            </Modal.Body>
        
            <Modal.Footer>
            <Button variant="secondary" onClick={() => props.warnLogin()}>Close</Button>
            </Modal.Footer>
      </Modal>
    )
}
