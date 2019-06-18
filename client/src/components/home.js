import React from 'react';
import Posts from './posts'

const Home = props => (

    <div>
        <Posts posts={props.posts} />
    </div>

)

export default Home