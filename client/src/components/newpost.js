import React, { Component } from 'react';
import axios from 'axios';

class NewPost extends Component {
  
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            description: '',
            author: '',
            content:''
        }
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.handleAuthorChange = this.handleAuthorChange.bind(this);
        this.handleContentChange = this.handleContentChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleTitleChange = e => {
        this.setState({
            title: e.target.value
        })
    }

    handleDescriptionChange = e => {
        this.setState({
            description: e.target.value
        })
    }

    handleAuthorChange = e => {
        this.setState({
            author: e.target.value
        })
    }

    handleContentChange = e => {
        this.setState({
            content: e.target.value
        })
    }

    handleSubmit = e => {
        e.preventDefault();
        const newPost = {
                title: this.state.title, 
                description: this.state.description, 
                author: this.state.author, 
                content: this.state.content,
            }
        console.log(newPost)    
        
        axios.post('http://localhost:5000/newpost', newPost)
         .then(res => console.log(res.data))

        this.setState({
            title: '',
            description: '',
            author: '',
            content:'',
        }) 
    }  

    render() {

        return(

            <div>
            <h2>Write a new article</h2>
            <form onSubmit={this.handleSubmit} >
                <input type="text" onChange={this.handleTitleChange} id="title" name="title" value={this.state.title} placeholder="title" /> <br/>
                <input type="text" onChange={this.handleDescriptionChange} id="description" name="description" value={this.state.description} placeholder="description" /><br/>
                <input type="text" onChange={this.handleAuthorChange} id="author" name="author" value={this.state.author} placeholder="author" /><br/>
                <textarea id="content" onChange={this.handleContentChange} name="content" value={this.state.content} placeholder="article"></textarea><br/>
               <input type="submit" value="Post" />
            </form>
            
            {this.state.title} <br/>
            {this.state.description} <br/>
            {this.state.author} <br/>
            {this.state.content} <br/>

        </div>

        )
    }
}

export default NewPost