import React, { Component, Redirect } from 'react';
import Posts from './posts'
import Login from './login'

const Home = props => (

    <div>
        <Posts posts={props.posts} />
    </div>

)

export default Home