import React, { useState } from "react";
import upload from "../images/upload.png";
import { Progress } from "reactstrap";

const UploadDocument = props => {
  const { onFileUpload } = props;
  const [state, setState] = useState(null);
  const [disableButton, setDisableButton] = useState(false);

  const onFileSelect = event => {
    setState({
      selectedFile: event.target.files[0],
      loaded: 0
    });
  };

  return (
    <div
      style={{
        width: "100%",
        margin: 0,
        padding: 6,
        alignItems: "center",
        display: "inline-flex",
        justifyContent: "space-evenly"
      }}
    >
      <img src={upload} alt="chatbot-header-tile" height="35px" width="35px" />
      {!state ? (
        <input
          style={{
            margin: "0px 0px 0px 0px",
            width: "90px"
          }}
          type="file"
          name="file"
          placeholder="Select File"
          onChange={e => onFileSelect(e)}
        />
      ) : (
        <p style={{ color: "black", fontSize: "12px" }}>
          .\{state.selectedFile.name}
        </p>
      )}
      {disableButton ? (
        <div className="form-group" style={{ color: "green", fontSize: 12 }}>
          <Progress
            max="100"
            color="success"
            value={state ? state.loaded : null}
          >
            {Math.round(state ? state.loaded : null, 2)}%
          </Progress>
        </div>
      ) : (
        <button
          style={{
            borderRadius: "5px",
            background: "#282c34",
            padding: "8px",
            color: "white",
            width: "40%"
          }}
          onClick={() => {
            onFileUpload(
              state.selectedFile,
              props.triggerNextStep,
              setState,
              setDisableButton
            );
          }}
        >
          Upload
        </button>
      )}
    </div>
  );
};

export default UploadDocument;
