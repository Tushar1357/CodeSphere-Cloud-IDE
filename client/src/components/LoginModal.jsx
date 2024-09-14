import React, { useState } from "react";
import "../App.css";
import { Form } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Alert from "./Alert";

function LoginModal({ handleClick }) {

  const navigate = useNavigate()
  const [showAlert, setAlert] = useState(false)
  const [message,setMessage] = useState("")
  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const email = formData.get("email");
    const password = formData.get("password");
    fetch("http://localhost:3000/signup/register",{
      method: "POST",
      headers: {'Content-Type' : 'application/json'},
      body: JSON.stringify({email: email,password: password}),
      credentials: 'include'
    }).then(res=>res.json()).then(data=>{
      console.log(data.status)
      if (data.status === true){
        navigate('/')
      }
      else{
        setMessage(data.message)
        setAlert(true)
      }
    
    })

  };

  return (
    <div
      className="modal-box modal-dialog bg-dark text-white w-50"
      role="document"
    >
      <div className="modal-content rounded-4 shadow">
        <div className="modal-header p-5 pb-4 border-bottom-0 d-flex justify-content-between">
          <h1 className="fw-bold mb-0 fs-2">Sign up for free</h1>
          <div data-bs-theme="dark">
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={handleClick}
              ></button>
          </div>
        </div>
             

        <div className="modal-body p-5 pt-0">
        {showAlert && <Alert text={message} />}
          <Form method="post" onSubmit={handleSubmit}>
            <div className="form-floating mb-3">
              <input
                type="email"
                className="form-control rounded-3"
                id="floatingInput"
                placeholder="name@example.com"
                name="email"
                required
              />
              <label className="text-black" htmlFor="floatingInput">
                Email address
              </label>
            </div>
            <div className="form-floating mb-3">
              <input
                type="password"
                className="form-control rounded-3"
                id="floatingPassword"
                placeholder="Password"
                name="password"
                required
              />
              <label className="text-black" htmlFor="floatingPassword">
                Password
              </label>
            </div>
            <button
              className="w-100 mb-2 btn btn-lg rounded-3 btn-primary"
              type="submit"
            >
              Sign up
            </button>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default LoginModal;
