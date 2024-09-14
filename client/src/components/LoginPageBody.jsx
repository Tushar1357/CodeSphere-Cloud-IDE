import React from "react";
import "../App.css";
import LoginModal from './LoginModal';

function LoginPageBody({status,handleClick}) {
  return (
    <div className="bg-dark w-100 p-3" style={{ height: "auto" }}>
      {status && <LoginModal handleClick={handleClick} />}
      <div className="text-center align-center">
        <h2
          style={{ fontSize: "100px" }}
          className="text-white text-center handjet-custom-font mt"
        >
          Build <span className="text-success">Software</span> Faster
        </h2>
        <p className="text-white fs-4">
          CodeSphere is an online Cloud IDE platform where you can create coding
          environment in just seconds.
        </p>
        <div className="border" style={{marginTop: "300px"}}>
        <img src="../../public/images/image.png" alt="" width="100%" />
      </div>

      <div>
        <p className="text-white fw-semi-bold" style={{fontSize: "60px"}}>Everything you need to build software in one place</p>
      </div>
      </div>

      
    </div>
  );
}

export default LoginPageBody;
