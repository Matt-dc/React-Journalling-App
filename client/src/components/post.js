import React, { Component } from 'react';


class Post extends Component {

    componentWillMount() {

        const { item } = this.props.location.state

        this.setState({
            title: item.title,
            content: item.content,
            author: item.author,
        })
    }

    render() {
        return (

            <div>
            
                {this.state.title}<br/>
                {this.state.content}<br/>
                {this.state.author}<br/>
            
            </div>
        )
    }

    }

export default Post;