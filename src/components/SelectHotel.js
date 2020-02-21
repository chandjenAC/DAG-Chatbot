import React from "react";
import ImageTileView from "./ImageTileView";

const SelectHotel = props => {
  const selectHotel = () => {
    console.log("select hotel working");
    props.setHotelState(prevValues => ({
      ...prevValues,
      ["selectedHotel"]: props.name
    }));
  };

  console.log("props ceck", props);

  return (
    <div style={{ color: "black", fontSize: "12px", width: "100%" }}>
      {props.name}
      <ImageTileView images={props.images} />
      <button onClick={() => selectHotel()}>
        {props.hotelState["selectedHotel"] !== null
          ? "Selected"
          : "Select Hotel"}
      </button>
    </div>
  );
};

export default SelectHotel;
