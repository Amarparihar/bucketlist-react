import React, { useState } from "react";
import { useHistory } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



import "./updatepass.css";

export const Updatepass = () => {
    const[email , setEmail] = useState("");
    const[password , setPassword] = useState("");
    const[confirmPassword , setConfirmPassword] = useState("");

    const history = useHistory();
  return (
    <>
      <div className="update-pass">
        <div className="row">
          <div className="col-lg-12 py-5 my-5 ">
            <div className="heading">
              <h1>Update Your password</h1>
            </div>
            <div className="col-lg-12">
              <div class="container">
                <div class="wrapper">
                  <div class="title">
                    <span>SignUp Form</span>
                  </div>
                  <form onSubmit={ async(e) => {
                      e.preventDefault();

                      let response = await fetch(
                        "http://localhost:7070/update-password",
                        {
                          method: "PUT",
                          body: JSON.stringify({
                            email,
                            password,
                            confirmPassword,
                          }),
                          headers: {
                            "content-type": "application/json",
                          },
                        }
                      );
      
                      let data = await response.json();
                      if (data.message === "Password Updated") {
                        toast.success("Password Updated");
                        history.push("./");
                      } else if (data.message === "Enter valid password") {
                        toast.error("Enter valid password");
                      } else if (data.message === "Enter valid email") {
                        toast.warn("Enter valid email");
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
                    <div class="row">
                      <i class="fas fa-lock"></i>
                      <input
                        type="password"
                        placeholder="Enter New Password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    <div class="row">
                      <i class="fas fa-lock"></i>
                      <input
                        type="password"
                        placeholder="Confirm Password"
                        required
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                    </div>

                    <div class="row button">
                      <input type="submit" value="Upadate" />
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
