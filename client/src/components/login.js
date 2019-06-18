import React, { Component } from 'react'

export default class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
        }
    }

    render() {

        return(

            <div>
        
            <h1>Login</h1>
            <form>
            <input type="text" id="email" name="email" /><br/>
            <input type="text" id="password" name="password" /><br/>
            <input type="submit" value="Submit" />
        </form>
    
        </div>

        );
    }

}
 
   

