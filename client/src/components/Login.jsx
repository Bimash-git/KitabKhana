import React from 'react';

export default function Login() {
  return (
    <div className='login'>
     <label for="email">Email: </label> 
     <input type='email' id='email' name='email'></input>
     <br />
     <br />
     <label for="password">Password: </label>
     <input type='password' name='password' id='password'></input>
     <br />
     <br />
     <input type="button" value="Login" />
     <p>Haven't signed up yet? click to <a href='/SignUp'>SignUp</a></p>
    </div>
  )
}
