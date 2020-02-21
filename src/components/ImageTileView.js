import React from "react";

const ImageTileView = props => {
  return (
    <div
      style={{
        display: "flex",
        flexFlow: "row-wrap",
        width: "300px",
        overflowX: "scroll"
      }}
    >
      {props.images.map((image, index) => {
        return (
          <div key={index} style={{ padding: 8 }}>
            <img src={image} alt="sample alt text " height="100" width="100" />{" "}
          </div>
        );
      })}
    </div>
  );
};

export default ImageTileView;
