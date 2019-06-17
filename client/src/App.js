import React, { Component } from 'react';
import axios from 'axios'
import './App.css';
import Posts from './components/posts';
import Login from './components/login.js'
import SignUp from './components/signup.js'

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      posts: [],
      login: [],
    }
  }

  componentDidMount() {
        axios.get('http://localhost:5000').then(res => {
                console.log(` THIS IS THE RESULT   ${res}`)
                this.setState({
                    posts: res.data
                })
          })
          .catch(error => console.log(error))
        
          axios.get('http://localhost:5000/login').then(res => {
            this.setState({login: res})
          })
    
      }



  render(){

    return(

      <div>
        
        <h1>Login</h1>
        {
          (this.state.login).map(form => (
            JSON.stringify(form)
          ))
        }

        <Login/>


        <SignUp />

        <Posts posts={this.state.posts} />
       

      </div>
    );
  }
}

export default App;
