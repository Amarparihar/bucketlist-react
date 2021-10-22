import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



import "./forgotpass.css";

export const Forgotpass = () => {
    const[email , setEmail] = useState("");
  return (
    <>
      <div className="forgot-pass">
        <div className="row">
          <div className="col-lg-12 py-5 my-5 ">
            <div className="heading">
              <h1>Reset your password</h1>
            </div>
            <div className="col-lg-12">
              <div class="container">
                <div class="wrapper">
                  <div class="title">
                    <span>Forgot Password</span>
                  </div>
                  <form onSubmit={ async(e) => {
                      e.preventDefault();

                      let response = await fetch(
                        "https://bucketlistserver.herokuapp.com/forgot-password",
                        {
                          method: "POST",
                          body: JSON.stringify({
                            email,
                          }),
                          headers: {
                            "content-type": "application/json",
                          },
                        }
                      );
      
                      let data = await response.json();
                      if (data.message === "string genrated") {
                        toast.info("Kindly Check Your Mail");
                      } else {
                        toast.error("Insert valid email address");
                      }
                  }}>
                    <div class="row">
                      <i class="fas fa-user"></i>
                      <input type="text" 
                      placeholder="Enter Email" 
                      required 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                   
                    <div class="row button">
                      <input type="submit" value="Reset" />
                    </div>
                    <div class="signup-link">
                      Back to the login? <Link to="/">Sign In</Link>
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
