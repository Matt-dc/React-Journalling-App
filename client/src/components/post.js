import React, { Component } from 'react';

const Post = props => (

  

    <div>

        Hello this is the posts page

        <div> {props.currentPost.title} </div>

    </div>
)

export default Post;