import * as React from "react";

export const NODE_KEY = "id"; // Key used to identify nodes
export const EMPTY_TYPE = "customEmpty"; // Empty node type
export const EMPTY_EDGE_TYPE = "emptyEdge";
export const nodeTypes = [EMPTY_TYPE];
export const edgeTypes = [EMPTY_EDGE_TYPE];

const EmptyNodeShape = (
  <symbol viewBox="0 0 154 154" width="154" height="154" id="emptyNode">
    <circle cx="77" cy="77" r="76" />
  </symbol>
);

const EmptyEdgeShape = <symbol viewBox="0 0 50 50" id="emptyEdge"></symbol>;

export default {
  EdgeTypes: {
    emptyEdge: {
      shape: EmptyEdgeShape,
      shapeId: "#emptyEdge"
    }
  },
  NodeSubtypes: {},
  NodeTypes: {
    emptyNode: {
      shape: EmptyNodeShape,
      shapeId: "#emptyNode"
    }
  }
};
