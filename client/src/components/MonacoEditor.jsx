import React, { useEffect, useRef, useState } from "react";
import Editor from "@monaco-editor/react";
import Spinner from "./Spinner";
import { useSelector } from "react-redux";

function MonacoEditor({socket,instance_name}) {
  const [code, setcode] = useState("");
  const handleEditorChange = (value, monaco) => {
    setcode(value);
    // console.log(code)
  };
  const { currentPath } = useSelector((store) => store.path);
  const { currentCode } = useSelector((store) => store.code);
  
  const [cookie,setcookie] = useState(null)

  const parse_cookie = (cookie, name) => {
    const cookies = cookie.split(";");
    for (const item of cookies) {
      const part = item.split("=");
      if (part[0] === name) {
        console.log("found");
        const parsed_cookie = {};
        parsed_cookie[name] = part[1];
        console.log(parsed_cookie);
        return parsed_cookie;
      }
    }
    return null;
  };

  useEffect(()=>{
    setcookie(parse_cookie(document.cookie,'sid'))
    console.log(document.cookie)
  },[])

  useEffect(() => {
    if (code && socket && cookie) {
      const timeout = setTimeout(() => {
        socket.emit("file:write", { code: code, path: currentPath,token: cookie ,name: instance_name});
      }, 1000);
      return () => {
        clearTimeout(timeout);
      };
    }
  }, [code,socket]);

  useEffect(() => {
    setcode(currentCode)
  }, [currentCode]);

  const beforeMount = (monaco) => {
    monaco.editor.defineTheme("myCustomTheme", {
      base: "vs-dark",
      inherit: true,
      rules: [
        { token: "comment", foreground: "FFA500", fontStyle: "italic" },
        { token: "keyword", foreground: "C586C0", fontStyle: "bold" },
      ],
      colors: {
        "editor.background": "#212529",
        "editor.foreground": "#D4D4D4",
      },
    });
  };

  if (!socket) {
    return <Spinner />;
  }
  return (
    <div style={{height:'55vh' }}>
      <Editor
        height="100%"
        theme="myCustomTheme"
        beforeMount={beforeMount}
        loading=<Spinner></Spinner>
        defaultLanguage="javascript"
        language="javascript,python"
        value={code}
        options={{
          fontSize: 15,
          minimap: { enabled: false },
        }}
        onChange={handleEditorChange}
      />
    </div>
  );
}

export default MonacoEditor;
