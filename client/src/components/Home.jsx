import React, { useEffect, useState } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { FaPython } from "react-icons/fa";
import CustomModal from "./CustomModal";
import Alert from "./Alert";
import { useDispatch } from 'react-redux';
import { instanceActions } from "../store/instance";
import { useNavigate } from 'react-router-dom';

function Home() {
  const [instances, setInstances] = useState({});
  const handleClick = () => {
    setStatus(!modalopen);
  };
  const [showAlert, setAlert] = useState(false);
  const dispatch = useDispatch()
  const navigate = useNavigate()


  const handleOpen = (instance_name)=>{
    dispatch(instanceActions.updateInstance(instance_name))
    navigate(`/code/${instance_name}`)

  }
  const createInstance = (name, language) => {
    console.log(language);
    if (name && language) {
      fetch("http://localhost:3000/create_container", {
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name, language: language }),
        method: "POST",
        credentials: "include",
      })
        .then((res) => res.text())
        .then((data) => {
          if (data === "true") {
            handleClick();
            fetchInstances();
          } else {
            handleClick();
            setAlert(true);
            setTimeout(() => {
              setAlert(false);
            }, 2500);
          }
        });
    }
  };

  const fetchInstances = () => {
    fetch("http://localhost:3000/get_container", {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status) {
          setInstances(data.instances);
        }
      })
      .catch((error) => {
        console.error("Error fetching instances:", error);
      });
  };

  useEffect(() => {
    fetchInstances();
  }, []);

  const [modalopen, setStatus] = useState(false);
  return (
    <div className="w-100 bg-dark p-3" style={{ height: "100vh" }}>
      {modalopen && (
        <CustomModal
          createInstance={createInstance}
          handleClick={handleClick}
          title={"Create Instance"}
        />
      )}
      <div className={`container ${modalopen ? "opacity-50" : null}`}>
        {showAlert && <Alert text={"Instance already created"} />}
        <div className="d-flex justify-content-between">
          <div>
            <h3 className="text-white fs-1 fw-bolder">Home</h3>
            <p className="text-white fs-3 mt-3">Your Instances</p>
          </div>
          <div>
            <button className="btn btn-primary" onClick={handleClick}>
              Create Instance
            </button>
          </div>
        </div>
        <div className="card-group d-flex flex-wrap">
          {Object.keys(instances).length === 0 ? (
            <h3 className="text-white">No instance created</h3>
          ) : null}
          {Object.keys(instances).map((item) => (
            <div
              key={item}
              className="card m-3 bg-dark border rounded"
              style={{ minWidth: "150px", maxWidth: "200px" }}
            >
              <div className="card-body text-center">
                <h5 className="card-title text-white">{item}</h5>
                <p className="text-white">({instances[item]})</p>
                <div className="d-flex justify-content-evenly mt-3">
                  <button className="btn btn-primary" onClick={()=>handleOpen(item)}>Open</button>
                  <button className="btn btn-danger">
                    <MdDeleteOutline />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
