import React from "react";

const ImageTileView = props => {
  const { onSelect, triggerNextStep } = props

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
          <div key={index} style={{ display: "flex", justifyContent: "flex-end", flexDirection: "column", cursor: "pointer", margin: "8px" }} onClick={() => onSelect(image.title, triggerNextStep)}>
            <p>{image.title}</p>
            <img src={image.image} alt={image.title} height="100" width="100" />
          </div>
        );
      })}
    </div>
  );
};

export default ImageTileView;
