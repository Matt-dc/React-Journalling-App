import React from 'react'

const Login = props => (
 
    <form>
    <label>Email</label><input type="text" id="email" name="email" /><br/>
    <label>Password</label><input type="text" id="password" name="password" /><br/>
    <input type="submit" value="Submit" />
  </form>

)

export default Login;