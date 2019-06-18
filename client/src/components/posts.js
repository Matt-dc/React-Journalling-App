import React from 'react';
import Post from './post';

const Posts = props => (

    <div>

        <h1>Recent Articles</h1>

        {
        props.posts.map(item => (

            <li style={{color: "red"}} onClick={props.setPost(item._id)}>{item.title}</li>

         ))
        }
        
    </div>
)

export default Posts