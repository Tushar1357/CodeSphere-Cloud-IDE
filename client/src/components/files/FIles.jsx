import React, { useEffect, useRef, useState } from "react";
import {useDispatch} from 'react-redux'
import { AiOutlineFileAdd } from "react-icons/ai";
import { MdOutlineCreateNewFolder } from "react-icons/md";
import styles from "./files.module.css";
import { pathActions } from "../../store/path";
import { codeActions } from "../../store/code";


function Files({instance_name}) {
  const [currentFiles, setFiles] = useState(null);
  const dispatch = useDispatch()
  const handleFileClick = async (path) => {
    dispatch(pathActions.changePath(path))
    let headersList = {
      "Content-Type": "application/json"
     }
     
     let bodyContent = JSON.stringify({
       file_path: path,
       name: instance_name
     });
     
     let response = await fetch("http://localhost:3000/files/get_file_content", { 
       method: "POST",
       body: bodyContent,
       headers: headersList,
       credentials: 'include'
     });
     
     let data = await response.text();
     dispatch(codeActions.changeCode(data))
     
  };

  const parse_file_tree = (tree, currentPath = "") => {
    if (!tree) return null;

    return (
      <ul className={`${styles["file-folder"]}`}>
        {Object.keys(tree).map((item) => {
          const itemPath = currentPath ? `${currentPath}/${item}` : item;

          return (
            <li key={item} className="m-2">
              {tree[item] ? (
                <button
                  className="btn btn-dark disabled"
                  onClick={() => handleFileClick(itemPath)}
                >
                  <i className={`me-1 ${styles["arrow"]}`}></i>
                  {item}
                </button>
              ) : (
                <button
                  className="btn btn-dark p-1"
                  onClick={() => handleFileClick(itemPath)}
                >
                  {item}
                </button>
              )}
              {tree[item] && parse_file_tree(tree[item], itemPath)}
            </li>
          );
        })}
      </ul>
    );
  };

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    fetch("http://localhost:3000/files/get_files", { signal: signal,
    headers: {'Content-Type': 'application/json'},
    body:JSON.stringify({name: instance_name}),
    credentials: 'include',
    method: 'POST'
     })
      .then((res) => res.json())
      .then((data) => {
        setFiles(data);
      });

    return () => {
      controller.abort();
    };
  }, []);

  return (
    <div
      className="border-end text-white text-center bg-dark"
      style={{ height: "90vh", width: "350px", minWidth: "200px" }}
    >
      <p className="mt-3">Files</p>

      <div className="file-operations">
        <button className="btn btn-secondary p-1 me-1">
          <AiOutlineFileAdd />
        </button>
        <button className="btn btn-secondary p-1 me-1">
          <MdOutlineCreateNewFolder />
        </button>
        <div className="text-start mt-3">
          {currentFiles ? parse_file_tree(currentFiles) : <p>Loading...</p>}
        </div>
      </div>
    </div>
  );
}

export default Files;
