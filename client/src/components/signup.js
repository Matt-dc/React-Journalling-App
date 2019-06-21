import React, { Component } from 'react';
import { BrowserRouter as Router, Redirect } from 'react-router-dom'
import axios from 'axios'

export default class SignUp extends Component {

    constructor(props) {
        super(props);

        this.state = {
            name: '',
            email: '',
            password: '',
            password2: '',
            redirect: false,
        }
    }

    nameChangeHandler = e => {
        this.setState({
            name: e.target.value
        })
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
    password2ChangeHandler = e => {
        this.setState({
            password2: e.target.value
        })
    }


    handleSignUp = e => {
        e.preventDefault();
            const newUser = {
                name: this.state.name, 
                email: this.state.email, 
                password: this.state.password, 
                password2: this.state.password2, 
                }

        console.log(newUser)    
        
        axios.post('http://localhost:5000/register', newUser)
         .then(res => {

            this.setState({
                user: res.data,
                name: '',
                email: '',
                password: '',
                password2:'',
                redirect: true,
            }) 
        })
    
    }

    render() {

        const redirect = this.state.redirect;

        if(redirect) {

            return <Redirect to={{ pathname: `/dashboard`, state: {user: this.state.name} }} />

        }

        return(

            <div>
            <h1>Sign Up</h1>
            <form>
                <input type="text" onChange={this.nameChangeHandler} id="name" name="name" value={this.state.name} placeholder="name" /> <br/>
                <input type="text" onChange={this.emailChangeHandler} id="email" name="email" value={this.state.email} placeholder="email" /><br/>
                <input type="text" onChange={this.passwordChangeHandler} id="password" name="password" value={this.state.password}  placeholder="password" /><br/>
                <input type="text" onChange={this.password2ChangeHandler} id="password2" name="password2" value={this.state.password2} placeholder="password2" /><br/>
            <button onClick={this.handleSignUp} >Sign Up</button>
            </form>
        </div>

        );
    }
}

 
