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
//node types for the project
export const ROUTER_IDEAL = "routerNodeIdeal";
export const ROUTER_IN_PROGRESS = "routerNodeInProgress";
export const ROUTER_COMPLETED = "routerNodeCompleted";
export const GATEWAY_IDEAL = "gatewayNodeIdeal";
export const GATEWAY_IN_PROGRESS = "gatewayNodeInProgress";
export const GATEWAY_COMPLETED = "gatewayNodeCompleted";
export const EVENT_HANDLER_IDEAL = "eventHandlerNodeIdeal";
export const EVENT_HANDLER_IN_PROGRESS = "eventHandlerNodeInProgress";
export const EVENT_HANDLER_COMPLETED = "eventHandlerNodeCompleted";

const EmptyNodeShape = (
  <symbol viewBox="0 0 154 154" width="154" height="154" id="emptyNode">
    <circle cx="77" cy="77" r="76" />
  </symbol>
);

const CustomEmptyShape = (
  <symbol viewBox="0 0 200 200" id="customEmpty">
    <circle cx="100" cy="100" r="90" fill="red" />
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

const EmptyEdgeShape = <symbol viewBox="0 0 50 50" id="emptyEdge"></symbol>;

const SpecialEdgeShape = (
  <symbol viewBox="50 0 50 50" id="specialEdge"></symbol>
);

// shapes for routers, gateway and handler nodes

const RouterNodeIdeal = (
<symbol viewBox="0 0 200 200" id="routerNodeIdeal">
    <circle cx="100" cy="100" r="90" fill="green" />
</symbol>
);

// const RouterNodeIdeal = (
//   <symbol viewBox="0 0 200 200" id="routerNodeIdeal">
//     <svg
//       width="200px"
//       height="200px"
//       viewBox="0 0 285 300"
//       xmlns="http://www.w3.org/2000/svg"
//       xmlnsXlink="http://www.w3.org/1999/xlink"
//     >
//       <path
//         d="M156.255007,168.747536 C140.666708,184.076957 131,205.409275 131,228.999374 C131,258.772741 146.398378,284.949624 169.665742,300.000631 L28.1249329,299.999285 C12.7528993,299.999285 0.252245492,287.652351 0.00376961992,272.339282 L0,271.874352 L0,247.499639 C0,205.675766 32.6765273,171.77735 73.866365,169.170329 L75.1171228,169.10093 L103.124754,281.249329 L121.874709,201.562019 L103.124754,168.749598 L156.255007,168.747536 Z M215.5,159.499374 C253.88379,159.499374 285,190.615584 285,228.999374 C285,267.383164 253.88379,298.499374 215.5,298.499374 C177.11621,298.499374 146,267.383164 146,228.999374 C146,190.615584 177.11621,159.499374 215.5,159.499374 Z M215.874969,241.875031 C209.844004,241.875031 204.937495,246.78154 204.937495,252.812505 C204.937495,258.84347 209.844004,263.749979 215.874969,263.749979 C221.905933,263.749979 226.812443,258.84347 226.812443,252.812505 C226.812443,246.78154 221.905933,241.875031 215.874969,241.875031 Z M222.269225,193.750146 L209.480712,193.750146 C207.604038,193.750146 206.109882,195.321073 206.203475,197.195344 L208.062926,234.382755 C208.150244,236.128986 209.591529,237.500042 211.340029,237.500042 L220.409908,237.500042 C222.158409,237.500042 223.599693,236.128986 223.687011,234.382755 L225.546462,197.195344 C225.640055,195.321073 224.145899,193.750146 222.269225,193.750146 Z M131.249687,0 C172.675484,0 206.249508,33.5740243 206.249508,74.9998212 C206.249508,116.425618 172.675484,149.999642 131.249687,149.999642 C89.8238902,149.999642 56.2498659,116.425618 56.2498659,74.9998212 C56.2498659,33.5740243 89.8238902,0 131.249687,0 Z"
//         id="directorverify_s2"
//         fill="#1ecc2c"
//         // fill-rule="nonzero"
//         data-intersect-ignore="true"
//       ></path>
//     </svg>{" "}
//   </symbol>
// );

const RouterNodeInProgress = (
  <symbol viewBox="0 0 100 100" id="routerNodeInProgress">
    <circle cx="50" cy="50" r="45" fill="orange" />
  </symbol>
);

const RouterNodeCompleted = (
  <symbol viewBox="0 0 200 200" id="routerNodeCompleted">
    <circle cx="100" cy="100" r="95" />
    <line
      x1="80"
      y1="140"
      x2="120"
      y2="180"
      stroke="rgb(3, 252, 40)"
      strokeWidth="10"
    />
    <line
      x1="113"
      y1="180"
      x2="200"
      y2="100"
      stroke="rgb(3, 252, 40)"
      strokeWidth="10"
    />
  </symbol>
);
const EventHandlerNodeIdeal = (
  <symbol
    viewBox="0 0 88 72"
    id="eventHandlerNodeIdeal"
    width="176"
    height="176"
    fill="red"
  >
    <path d="M 0 36 18 0 70 0 88 36 70 72 18 72Z" />
  </symbol>
);

const EventHandlerNodeInProgress = (
  <symbol
    viewBox="0 0 88 72"
    id="eventHandlerNodeInProgress"
    width="88"
    height="88"
  >
    <path d="M 0 36 18 0 70 0 88 36 70 72 18 72Z" />
  </symbol>
);
const EventHandlerNodeCompleted = (
  <symbol
    viewBox="0 0 88 72"
    id="eventHandlerNodeCompleted"
    width="88"
    height="88"
  >
    <path d="M 0 36 18 0 70 0 88 36 70 72 18 72Z" />
  </symbol>
);

const GatewayNodeIdeal = (
  <symbol viewBox="0 0 154 54" width="154" height="54" id="gatewayNodeIdeal">
    <rect x="0" y="0" rx="2" ry="2" width="154" height="54" fill="red" />
  </symbol>
);

const GatewayNodeInProgress = (
  <symbol
    viewBox="0 0 154 54"
    width="154"
    height="54"
    id="gatewayNodeInProgress"
  >
    <rect x="0" y="0" rx="2" ry="2" width="154" height="54" />
  </symbol>
);

const GatewayNodeCompleted = (
  <symbol
    viewBox="0 0 154 54"
    width="154"
    height="54"
    id="gatewayNodeCompleted"
  >
    <rect x="0" y="0" rx="2" ry="2" width="154" height="54" />
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
    empty: {
      shape: CustomEmptyShape,
      shapeId: "#empty",
      typeText: "None"
    },
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
    },
    // shapes for the current project
    routerNodeIdeal: {
      shape: RouterNodeIdeal,
      shapeId: "#routerNodeIdeal",
      typeText: "To be routed"
    },
    routerNodeInProgress: {
      shape: RouterNodeInProgress,
      shapeId: "#routerNodeInProgress",
      typeText: "Routing in progress"
    },
    routerNodeCompleted: {
      shape: RouterNodeCompleted,
      shapeId: "#routerNodeCompleted",
      typeText: "Routed"
    },
    gatewayNodeIdeal: {
      shape: GatewayNodeIdeal,
      shapeId: "#gatewayNodeIdeal",
      typeText: "Entering gateway"
    },
    gatewayNodeInProgress: {
      shape: GatewayNodeInProgress,
      shapeId: "#gatewayNodeInProgress",
      typeText: "Selected gateway"
    },
    gatewayNodeCompleted: {
      shape: GatewayNodeCompleted,
      shapeId: "#gatewayNodeCompleted",
      typeText: "Done"
    },
    eventHandlerNodeIdeal: {
      shape: EventHandlerNodeIdeal,
      shapeId: "#eventHandlerNodeIdeal",
      typeText: "Event to be handled"
    },
    eventHandlerNodeInProgress: {
      shape: EventHandlerNodeInProgress,
      shapeId: "#eventHandlerNodeInProgress",
      typeText: "Handling event"
    },
    eventHandlerNodeCompleted: {
      shape: EventHandlerNodeCompleted,
      shapeId: "#eventHandlerNodeCompleted",
      typeText: "Event handled"
    }
  }
};
