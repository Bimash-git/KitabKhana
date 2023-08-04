import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function Login() {
  const navigate = useNavigate();
  const[inputValue, setInputValue] = useState(
    { 
      email: "",
      password: ""
    }
  );
  const { email, password } = inputValue;

  const handleOnChange = (e) => {
    const {name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value
    });
  };

  const handleError = (err) => {
    toast.error(err, {
      postiton: "bottom-left"
    });
  };

  const handleSuccess = (msg) => {
    toast.success(msg, {
      position: "bottom-left"
    });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:4001/login", {
          ...inputValue
        },
        {
          withCredentials: true
        }
      );

      console.log(data);
      
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
      password: ""
    });
  };

  return (
    <div className='form_container'>
      <h2>Login Account</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" name="email" value={email} placeholder='Enter your email' onChange={handleOnChange}/>
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input type="password" name='password' value={password} placeholder='Enter your password' onChange={handleOnChange} />
        </div>

        <button type='submit' onClick={handleSubmit}>Submit</button>
        <span>
          Already have an account? <Link to = {"/signup"}>SignUp</Link>
        </span>
      </form>
      <ToastContainer />
    </div>
  )
}
