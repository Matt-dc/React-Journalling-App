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
import Dashboard from './components/dashboard'
import Login from './components/login.js'
import SignUp from './components/signup.js'



class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      posts: [],
      login: [],
      posts: '',
    }

  }

  componentDidMount() {
        axios.get('http://localhost:5000').then(res => {

            this.setState({
                    posts: res.data,
                })
          })
          .catch(error => console.log(error))
      }


  render(){

    return (

      <div>

      <TopNav />

      <Router>
          <div> 
            <Route exact path='/' />
            <Route exact path='/posts' render={() => <Posts testdata={this.state.posts} /> }/> 
            <Route exact path='/posts/:id' component={Post} /> 
            <Route path='/dashboard' component={Dashboard} />
            
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
