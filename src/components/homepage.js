import React, { useState } from "react";
import "./homepage.css";
import { Link , useHistory } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



export const Homepage = () => {
  const[email , setEmail] = useState("");
  const[password , setPassword] = useState("");
  
  const history = useHistory();

  return (
    <>
    
      <div className="home">
        <div className="row">
          <div className="col-lg-12 py-5 my-5 ">
            <div className="heading">
              <h1>Welcome to the beautiful world</h1>
            </div>
            <div className="col-lg-12">
              <div class="container">
                <div class="wrapper">
                  <div class="title">
                    <span>SignIn Form</span>
                  </div>
                  <form onSubmit={ async(e) => {
                    e.preventDefault();

                    setEmail("");
                    setPassword("");

                    let response = await fetch(
                      "https://bucketlistserver.herokuapp.com/login",
                      {
                        method: "POST",
                        body: JSON.stringify({
                          email,
                          password,
                        }),
                        headers: {
                          "content-type": "application/json",
                        },
                      }
                    );
  
                    let data = await response.json();
  
                    window.localStorage.setItem("myToken", data.token);
  
                    if (data.message === "Login Successfull") {
                      if (data.token) {
                        toast.success("Login Successfull");
                        setTimeout(() => {
                          history.push(`/create-bucketlist/${email}`);
                        }, 5000);
                      }
                    } else if (data.message === "Invalid Creadentials") {
                      toast.error("Invalid Creadentialss");
                    } else if(data.message === "User Not Registered") {
                      toast.warn("user not registered");
                    }


                  }}>
                    <div class="row">
                      <i class="fas fa-user"></i>
                      <input
                        type="text"
                        placeholder="Enter Email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div class="row">
                      <i class="fas fa-lock"></i>
                      <input type="password" 
                      placeholder="Enter Password" 
                      required
                      value={password}
                        onChange={(e) => setPassword(e.target.value)}
                         />
                    </div>
                    <div class="pass">
                      <Link to="/forgot-password">Forgot password?</Link>
                    </div>
                    <div class="row button">
                      <input type="submit" value="SignIn" />
                    </div>
                    <div class="signup-link">
                      Not a member? <Link to="/register">Signup now</Link>
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
