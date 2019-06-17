import React from 'react';
import Post from './post';

const Posts = props => (

    <div>

        <h1>Recent Articles</h1>
        {
        (props.posts).map(post => (
            <Post post={post.title} />
        ))
        }

    </div>

)

export default Posts