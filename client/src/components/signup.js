import React, { Component } from 'react';
import axios from 'axios'

export default class SignUp extends Component {

    constructor(props) {
        super(props);

        this.state = {
            name: '',
            email: '',
            password: '',
            password2: '',
        }
    }

    nameChangeHandler = e => {
        this.setState({
            name: e.target.value
        })
    }
    emailChangeHandler = e => {
        this.setState({
            name: e.target.value
        })
    }
    passwordChangeHandler = e => {
        this.setState({
            name: e.target.value
        })
    }
    password2ChangeHandler = e => {
        this.setState({
            name: e.target.value
        })
    }

    render() {

        return(

            <div>
            <h1>Sign Up</h1>
            <form>
            <input type="text" onChange={this.nameChangeHandler} id="name" name="name" value={this.state.name} placeholder="name" /> <br/>
            <input type="text" onChange={this.emailChangeHandler} id="email" name="email" value={this.state.email} placeholder="email" /><br/>
            <input type="text" onChange={this.passwordChangeHandler} id="password" name="password" value={this.state.password}  placeholder="password" /><br/>
            <input type="text" onChange={this.password2ChangeHandler} id="password2" name="password2" value={this.state.password2} placeholder="password2" /><br/>
            <input type="submit" value="Submit" />
            </form>
        </div>

        );
    }
}

 
