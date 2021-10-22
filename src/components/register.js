import React, { useState } from "react";
import "./register.css";
import { Link, useHistory } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
 

export const Register = () => {
  const[username , setUsername] = useState("");
  const[email , setEmail] = useState("");
  const[password , setPassword] = useState("");

  const history = useHistory();
  
  return (
    <>
      <div className="signup">
        <div className="row">
          <div className="col-lg-12 py-5 my-5 ">
            <div className="heading">
              <h1>Feel free to register</h1>
            </div>
            <div className="col-lg-12">
              <div class="container">
                <div class="wrapper">
                  <div class="title">
                    <span>SignUp Form</span>
                  </div>
                  <form onSubmit={ async(e) => {
                    e.preventDefault();
                    setUsername("");
                    setEmail("");
                    setPassword("");


                    let response = await fetch(
                      "http://localhost:7070/register",
                      {
                        method: "POST",
                        body: JSON.stringify({
                          username,
                          email,
                          password,
                        }),
                        headers: {
                          "content-type": "application/json",
                        },
                      }
                    );
  
                    let data = await response.json();
                    if (data.message === "User registered Successfully") {
                      toast.success("User registered Successfully");
                      setTimeout(() => {
                        history.push("/");
                      }, 5000);
                    } else {
                      toast.error("user already registered");
                    }
                  }}>
                    <div class="row">
                    <i class="fas fa-user-tie"></i>
                      <input
                        type="username"
                        placeholder="Username"
                        required
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                      />
                    </div>
                    <div class="row">
                      <i class="fas fa-user"></i>
                      <input type="text" 
                      placeholder="Enter Email" 
                      required 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div class="row">
                      <i class="fas fa-lock"></i>
                      <input
                        type="password"
                        placeholder="Enter Password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    
                    

                    <div class="row button">
                      <input type="submit" value="SignUp" />
                    </div>
                    <div class="signup-link">
                      Already member? <Link to="/">Sign In</Link>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};
