import React, { useState } from 'react';
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";

export default function SignUp() {

  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    emai: "",
    password: "",
    username: ""
  });

  const { email, password, username } = inputValue;

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value
    });
  };

  const handleError = (err) => {
    toast.success(err, {
      position: "bottom-right"
    });
  }

  const handleSuccess = (msg) => {
    toast.success(msg, {
      postion: "bottom-right"
    });
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("http://localhost:4001/signup", {
        ...inputValue
      }, 
      {
        withCredentials: true
      });

      const { success, message } = data;

      if(success) {
        handleSuccess(message);
        setTimeout(() => {
          navigate("/");
        }, 1000);
      }
      else {
        handleError(message);
      }
    }
    catch (error) {
      console.log(error);
    }

    setInputValue({
      ...inputValue,
      email: "",
      password: "",
      username: ""
    });
  };

  return (
    <div className="form_container">
      <h2>Signup Account</h2>

      <form onSubmit={handleSubmit}>

        <div>
          <label htmlFor="username">Username</label>
          <input type="text" name='username' value={username} placeholder='Enter your username' onChange={handleOnChange} />
        </div>

        <div>
          <label htmlFor="email">Email</label>
          <input type="email" name="email" value={email} placeholder='Enter your email' onChange={handleOnChange} />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input type="password" name='password' value={password} placeholder='Enter your password' onChange={handleOnChange} />
        </div>

      <button type='submit'>Submit</button>
      <span>
        Already have an account? 
        <Link to={"/login"}>Login</Link>
      </span>
      </form>
      <ToastContainer />
    </div>
  )
}