import React from "react";
import ImageTileView from "./ImageTileView";

const SelectHotel = props => {
  const { onSelect } = props

  return (
    <div style={{ color: "black", fontSize: "12px", width: "100%", margin: "4px" }}>
      {props.title}
      <ImageTileView
        images={props.images}
        onSelect={onSelect}
        triggerNextStep={props.triggerNextStep}// props.triggerNextStep is provided by the chatbot component
      />
    </div>
  );
};

export default SelectHotel;
