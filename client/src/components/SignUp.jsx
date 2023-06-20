import React, { useState } from 'react';
import axios from "axios";

export default function SignUp() {
const [username, setUsername] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");

  // const handleChange = e => {
  //   const {name, value} = e.target;
  //   setUser({
  //     ...user,
  //     [name]: value
  //   });
  // }

  // const register = () => {
  //   const {name, email, password} = user;
  //   if( name && email && password ) {
  //     axios.post("http://localhost:4001/signup", user)
  //     .then( res => console.log(res));
  //   }
  //   else {
  //     alert("Invalid output");
  //   }
  // }

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const response = await fetch("/localhost:4001/signup", {
        method: POST,
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, email, password })

      })

      // const response = await fetch("/localhost:4001/signup", request)
      const data = await response.json();

      if(response.ok) {
        console.log(data.message);
      }
      else {
        console.error(data.message);
      }
    }
    catch(error) {
      console.error("Error: ", error);
    }
  }

  return (
    <form onSubmit={handleSubmit}> 
      <label htmlFor="Username">Username</label>
      <input type="text" id='Username' placeholder='Enter username' value={username} onChange={(e) => setUsername(e.target.value)}/>
      <br />
      <br />

      <label htmlFor="Email">Email</label>
      <input type="text" id='Email' placeholder="Enter email"  value={email} onChange={(e) => setEmail(e.target.value)}/>
      <br />
      <br />

      <label htmlFor="Password">Passsword</label>
      <input type="text" id='Password' placeholder='Enter password' value={password} onChange={(e) => setPassword(e.target.value)} />
      <br />
      <br />
      
      <button type='submit'>Signup</button>
    </form>
  )
}
