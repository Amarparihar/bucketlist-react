import React from "react";
import { useHistory } from "react-router-dom";
export const Header = (props) => {
  const history = useHistory();
  return (
    <>
     <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <div className="container-fluid">
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
      <div className="navbar-nav ms-auto">
        <button className="btn btn-info p-2" onClick={() => {
                    window.localStorage.removeItem("Token");
                    history.push("/");
                  }}
                  style={{ color: "black" }} >sign out</button>
        
      </div>
    </div>
  </div>
</nav>
    </>
  );
};
