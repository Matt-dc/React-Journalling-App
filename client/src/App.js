import React, { Component } from 'react';
import { BrowserRouter as Router, Redirect, Route, Link } from 'react-router-dom';
import axios from 'axios'
import './App.css';
import TopNav from './components/topnav'
import Home from './components/home';
import About from './components/about';
import Post from './components/post';
import Posts from './components/posts';
import NewPost from './components/newpost';
import Login from './components/login.js'
import SignUp from './components/signup.js'

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      posts: [],
      login: [],
      newPost: '',
      currentPost:'',
    }
    this.setCurrentPost = this.setCurrentPost.bind(this);

  }

  componentDidMount() {
        axios.get('http://localhost:5000').then(res => {
                console.log(` THIS IS THE RESULT   ${res}`)
                this.setState({
                    posts: res.data,
                })
          })
          .catch(error => console.log(error))
        
          axios.get('http://localhost:5000/login').then(res => {
            this.setState({login: res})
          })

      }

  setCurrentPost = id => {
    axios.get('http://localhost/posts/'+id)
      .then(res => {
          this.setState({
            currentPost: res.data,
          })
      })
  }

  render(){
  
    const { currentPost} = this.state
    if(currentPost) {
      return <Redirect to='/posts/:id' currentPost={currentPost} />; 
    }

    return (

      <div>

      <TopNav />
      <div>Hi [name]</div>
      <Router>
          <div> 
            <Route exact path='/' />
            <Route exact path='/posts' render={() => <Posts posts={this.state.posts} setPost={this.setCurrentPost} /> } />
            
            <Route path='/about' component={About} />
            <Route path='/newpost' component={NewPost} />
            <Route path='/login' component={Login} />
            <Route path='/signup' component={SignUp} />
          </div>
      </Router>        

      </div>
    );
  }
}

export default App;
