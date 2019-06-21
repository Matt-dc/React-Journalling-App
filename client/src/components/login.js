import React, { Component } from 'react'
import { BrowserRouter as Router, Redirect, Route, Link } from 'react-router-dom';
import axios from 'axios';
import Home from './home'


export default class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            userId: '',
            redirect: false,
        }
        this.emailChangeHandler = this.emailChangeHandler.bind(this);
        this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
        this.handleUserLogin = this.handleUserLogin.bind(this);

    }

    emailChangeHandler = e => {
        this.setState({
            email: e.target.value
        })
    }

    passwordChangeHandler = e => {
        this.setState({
            password: e.target.value
        })
    }

    handleUserLogin = e => {

        e.preventDefault();

        const userLogin = {
            email: this.state.email,
            password: this.state.password,
        }

        console.log(userLogin)

        axios.post('http://localhost:5000/login', userLogin)
            .then(res => {

                this.setState({
                    email: '',
                    password: '',
                    user: res.data.username,
                    redirect: true,
                })  
        })
    }

    render() {

        const { redirect } = this.state

        if(redirect) {
            
            return <Redirect to={{pathname: `/dashboard`, state: {user: this.state.user} }} />

        }    
    
        return (

            <div>
            
            <h1>Login</h1>
          
            <form>
                <input type="text" id="email" name="email" onChange={this.emailChangeHandler} value={this.state.email} /><br/>
                <input type="text" id="password" name="password" onChange={this.passwordChangeHandler} value={this.state.password} /><br/>
                <button onClick={this.handleUserLogin}>Login</button>
            </form>
    

            <p>{this.state.userId}</p>

        </div>


        
        )
    }

}

   

