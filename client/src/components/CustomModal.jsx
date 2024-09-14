import React, { useRef } from "react";
import "../App.css";

function CustomModal({ title, handleClick, createInstance }) {
  const InstanceNameRef = useRef("");
  const LanguageRef = useRef("");

  return (
    <div className="modal-box border rounded bg-dark">
      <div className=" m-3 d-flex justify-content-between">
        <h3 className="text-white text-center">{title}</h3>

        <div data-bs-theme="dark">
          <button
            type="button"
            className="btn-close"
            aria-label="Close"
            onClick={handleClick}
          ></button>
        </div>
      </div>
      <div className="container">
        <div className="input-group mb-3 ">
          <div className="w-100">
            <label className="text-white">Enter Instance Name</label>
            <input
              type="text"
              ref={InstanceNameRef}
              className="form-control bg-dark text-bg-dark text-white"
              placeholder="Enter Instance Name"
            />
          </div>
        </div>
        <select
          defaultValue={0}
          className="form-select bg-dark text-white"
          aria-label="Default select example"
          ref={LanguageRef}
        >
          <option value="0" disabled>
            Select Language
          </option>
          <option value="1">NodeJS</option>
          <option value="2">Python</option>
          <option value="3">C++</option>
        </select>
        <div className="text-center mt-3">
          <button
            onClick={() => {
              const selectedLanguageText =
                LanguageRef.current.options[LanguageRef.current.selectedIndex].text;
              createInstance(InstanceNameRef.current.value, selectedLanguageText);
            }}
            className="btn btn-primary mt-3 mb-3"
          >
            Create Instance
          </button>
        </div>
      </div>
    </div>
  );
}

export default CustomModal;

