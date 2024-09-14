import React, { useState } from "react";
import Files from "./files/FIles"
import Path from './Path';
import MonacoEditor from './MonacoEditor';
import Terminal from './Terminal';
import NavBar from "./NavBar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {io} from "socket.io-client"
import { useParams } from "react-router";

function Ide() {

  const [socket,setSocket] = useState(null)
  const {instance_name} = useParams()
  
  useEffect(() => {
    const socket = io("http://localhost:3000",{
      withCredentials: true
    });
    setSocket(socket)
    return () => {
      socket.disconnect();
    };
  }, []);
  return (
    <div>
    <NavBar code={true} LoggedIn={true} instance_name={instance_name} />
    <div className="d-flex">
      <Files instance_name={instance_name} />
      <div className="w-100" style={{ height: "90vh" }}>
        <Path />
        <MonacoEditor instance_name={instance_name} socket={socket} />
        <Terminal socket={socket} />
      </div>
    </div>
    </div>
  );
}

export default Ide;
