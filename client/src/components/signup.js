import React from 'react';

const SignUp = props => (

    <div>
    <   h1>Sign Up</h1>
        <form>
        <label>Name</label><input type="text" id="name" name="name" /> <br/>
        <label>Email</label><input type="text" id="email" name="email" /><br/>
        <label>Password</label><input type="text" id="password" name="password" /><br/>
        <label>Repeat Password</label><input type="text" id="password2" name="password2" /><br/>
        <input type="submit" value="Submit" />
        </form>
    </div>
)

export default SignUp