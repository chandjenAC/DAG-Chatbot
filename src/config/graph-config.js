
import * as React from "react";
export const NODE_KEY = "id"; // Key used to identify nodes
export const EMPTY_TYPE = "customEmpty"; 
export const POLY_TYPE = "poly";
export const SPECIAL_TYPE = "special";
export const SKINNY_TYPE = "skinny";
export const SQUARE_TYPE = "square";
export const SPECIAL_CHILD_SUBTYPE = "specialChild";
export const EMPTY_EDGE_TYPE = "emptyEdge";
export const SPECIAL_EDGE_TYPE = "specialEdge";
export const COMPLEX_CIRCLE_TYPE = "complexCircle";
export const nodeTypes = [EMPTY_TYPE, POLY_TYPE, SPECIAL_TYPE, SKINNY_TYPE];
export const edgeTypes = [EMPTY_EDGE_TYPE, SPECIAL_EDGE_TYPE];

const EmptyNodeShape = (
  <symbol viewBox="0 0 154 154" width="154" height="154" id="emptyNode">
    <circle cx="77" cy="77" r="76" />
  </symbol>
);

const CustomEmptyShape = (
  <symbol viewBox="0 0 100 100" id="customEmpty">
    <circle cx="50" cy="50" r="45" />
  </symbol>
);

const SpecialShape = (
  <symbol viewBox="-27 0 154 154" id="special" width="154" height="154">
    <rect transform="translate(50) rotate(45)" width="109" height="109" />
  </symbol>
);

const PolyShape = (
  <symbol viewBox="0 0 88 72" id="poly" width="88" height="88">
    <path d="M 0 36 18 0 70 0 88 36 70 72 18 72Z" />
  </symbol>
);

const ComplexCircleShape = (
  <symbol viewBox="0 0 100 100" id="complexCircle" width="100" height="100">
    <circle cx="50" cy="50" r="50" fill="transparent" stroke="transparent" />
    <circle cx="50" cy="50" r="34" />
    <path
      d="M50,0a50,50,0,1,0,50,50A50,50,0,0,0,50,0Zm0,90A40,40,0,1,1,90,50,40,40,0,0,1,50,90Z"
      data-intersect-ignore="true"
    />
  </symbol>
);

const SkinnyShape = (
  <symbol viewBox="0 0 154 54" width="154" height="54" id="skinny">
    <rect x="0" y="0" rx="2" ry="2" width="154" height="54" />
  </symbol>
);

const SquareShape = (
  <symbol viewBox="0 0 120 120" width="120" height="120" id="square">
    <rect x="0" y="0" rx="2" ry="2" width="120" height="120" />
  </symbol>
);

const SpecialChildShape = (
  <symbol viewBox="0 0 154 154" id="specialChild">
    <rect
      x="2.5"
      y="0"
      width="154"
      height="154"
      fill="rgba(30, 144, 255, 0.12)"
    />
  </symbol>
);

const EmptyEdgeShape = (
  <symbol viewBox="0 0 50 50" id="emptyEdge">
    {/* <circle cx="25" cy="25" r="8" fill="currentColor" /> */}
  </symbol>
);

const SpecialEdgeShape = (
  <symbol viewBox="50 0 50 50" id="specialEdge" >
    {/* <rect
      transform="rotate(45)"
      x="27.5"
      y="-7.5"
      width="15"
      height="15"
      fill="currentColor"
    /> */}
  </symbol>
);

export default {
  EdgeTypes: {
    emptyEdge: {
      shape: EmptyEdgeShape,
      shapeId: "#emptyEdge"
    },
    specialEdge: {
      shape: SpecialEdgeShape,
      shapeId: "#specialEdge"
    }
  },
  NodeSubtypes: {
    specialChild: {
      shape: SpecialChildShape,
      shapeId: "#specialChild"
    }
  },
  NodeTypes: {
    emptyNode: {
      shape: EmptyNodeShape,
      shapeId: "#emptyNode",
      typeText: "Conditional Routing"
    },
    // empty: {
    //   shape: CustomEmptyShape,
    //   shapeId: "#empty",
    //   typeText: "None"
    // },
    special: {
      shape: SpecialShape,
      shapeId: "#special",
      typeText: "Verification"
    },
    skinny: {
      shape: SkinnyShape,
      shapeId: "#skinny",
      typeText: "File Upload"
    },
    square: {
      shape: SquareShape,
      shapeId: "#square",
      typeText: "Render"
    },
    poly: {
      shape: PolyShape,
      shapeId: "#poly",
      typeText: "SanctionCheck"
    },
    complexCircle: {
      shape: ComplexCircleShape,
      shapeId: "#complexCircle",
      typeText: "Event Handler"
    }
  }
};
