import React, { useState } from "react";
import upload from "../images/upload.png";

const UploadDocument = props => {

  const { onFileUpload } = props
  const [selectedFile, setSelectedFile] = useState(null)

  const onFileSelect = (event) => {
    setSelectedFile(event.target.files[0])
    console.log(event.target.files[0])
  };

  return (
    <div style={{ width: "100%", margin: 0, padding: 6, alignItems: "center", display: "inline-flex", justifyContent: "space-evenly" }}>
      <img src={upload} alt="chatbot-header-tile" height="35px" width="35px" />
      <input style={{ margin: "0px 0px 0px 0px", width: "90px" }} type="file" name="file" placeholder="Select File" onChange={(e) => onFileSelect(e)} />
      <button onClick={() => { onFileUpload(selectedFile,props.triggerNextStep) }}>Upload</button>
    </div >
  );
};

export default UploadDocument;



