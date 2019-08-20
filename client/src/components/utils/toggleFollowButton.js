import React from 'react'
import { Button } from 'react-bootstrap'

export default function ToggleFollowButton(props) {
    return (
        <Button style={{ margin: '0.7em 0 0 0'}} onClick={props.handleFollow}
                variant={props.following && props.following.includes(props.authorId) ? 'success' : 'secondary'} >
                            {props.following && props.following.includes(props.authorId) ? 'Following' : 'Not following'}
        </Button>
    )
}
