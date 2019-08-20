import React from 'react'

import { Button, Modal } from 'react-bootstrap';



export default function DeleteWarningModal(props) {
    return (

            <Modal {...props }>
                <Modal.Header>
                    <Modal.Title>Delete</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <p>Are you sure you want to permanently delete this post?</p>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={() => props.closeWarningModal()}>Cancel</Button>
                    <Button variant="danger" onClick={() => props.deleteUserPost(props.editedPostId)}>Delete</Button>
                </Modal.Footer>
            </Modal>   

    )
}
