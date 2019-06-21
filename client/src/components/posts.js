import React from 'react';
import { BrowserRouter as Link } from 'react-router-dom';



const Posts = props => (

    <div>

        <h1>Recent Articles</h1>

        {
        props.testdata.map(item => (

        <Link to={{ pathname: `/posts/${item.title}`, state: {item: item} }} >{item.title}</Link>

         ))
        }
        <br/><br/><br/>
        
    </div>
)

export default Posts




