import React from "react";

const ImageTileView = props => {
  const { onSelect, triggerNextStep, data } = props;

  return (
    <div
      style={{
        display: "flex",
        flexFlow: "row-wrap",
        width: "300px",
        overflowX: "scroll"
      }}
    >
      {data.map((value, index) => {
        return (
          <div
            key={index}
            style={{
              display: "flex",
              justifyContent: "flex-end",
              flexDirection: "column",
              cursor: "pointer",
              margin: "8px"
            }}
            onClick={() => onSelect(value.title, triggerNextStep)}
          >
            <p>{value.title}</p>
            <img src={value.image} alt={value.title} height="100" width="100" />
          </div>
        );
      })}
    </div>
  );
};

export default ImageTileView;
