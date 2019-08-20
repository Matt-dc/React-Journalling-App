import React from 'react'
import { Button } from 'react-bootstrap'


const FollowButton = props => {

    const followingStatus = props.user.hasOwnProperty('unfollowed')

    return (
        <Button variant={followingStatus ? 'secondary' : 'success'} 
                            onClick={props.handleFollow}>
                 {followingStatus ? 'usubscribed' : 'subscribed' }
        </Button>
    )
}

export default FollowButton