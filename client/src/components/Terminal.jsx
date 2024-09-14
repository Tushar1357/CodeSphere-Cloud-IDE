import { Terminal as XtermTerminal } from "xterm";
import { useEffect, useReducer, useRef, useState } from "react";
import "xterm/css/xterm.css";
import Spinner from "./Spinner";





function Terminal({ socket }) {
  const terminalRef = useRef(null);
  const term_instance = useRef(null);
  useEffect(() => {
    if (socket){
    const term = new XtermTerminal({
      rows: 12,
    });
    const newValue = term.options.theme;
    newValue.background = "#212529";
    term.options.theme = { ...newValue };
    term.open(terminalRef.current);
    term_instance.current = term;
    term.write("");

    socket.on("terminal:output", (data) => {
      term.write(data)
    });
  
    return () => {
      term.dispose();
    };}
  }, [socket]);

  if (!socket){
    return <div>Loading Terminal <Spinner /></div>
  }

  return (
    <div
      className="border-top"
      ref={terminalRef}
      style={{ height: "35vh" }}
    ></div>
  );
}

export default Terminal;
