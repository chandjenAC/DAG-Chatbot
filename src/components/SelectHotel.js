import React from "react";
import ImageTileView from "./ImageTileView";

const SelectHotel = props => {
  const { onSelect,hotelsArray } = props
  
  return (
    <div style={{ color: "black", fontSize: "12px", width: "100%", margin: "4px" }}>
      {props.title}
      <ImageTileView
        data={hotelsArray}
        onSelect={onSelect}
        triggerNextStep={props.triggerNextStep}// props.triggerNextStep is provided by the chatbot component
      />
    </div>
  );
};

export default SelectHotel;
