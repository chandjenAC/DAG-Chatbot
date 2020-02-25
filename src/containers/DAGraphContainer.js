import * as React from "react";
import { useState, useEffect } from "react";
import { GraphView } from "react-digraph";
import GraphConfig, { NODE_KEY } from "../config/graph-config"; // Configures node/edge types
import {
  rootGraph,
  getOnBoarding,
  getKYB,
  getAttachKYB,
  getDirectorVerify,
  getDirectorUserVerify,
  getDirectorID,
  getDirectorKYC,
  getSanction,
  getCreditRating,
  getSponserUser,
  createAvatar
} from "../data/nodeAndEdgeData";

const DAGraphContainer = props => {
  const { state, setState } = props;

  const graphView = React.createRef(GraphView);

  const [graphState, setGraphState] = useState({
    graph: rootGraph,
    layoutEngineType: undefined,
    selected: null,
    totalNodes: rootGraph.nodes.length
  });

  useEffect(() => {
    let graph = graphState.graph;
    let newGraph;
    if (state["KYB"].response && state["KYB"].attachKYB.response) {
      newGraph = getDirectorVerify(graph);
      setGraphState(prevValues => ({
        ...prevValues,
        ["graph"]: newGraph
      }));
    }
    if (
      state["directorUserVerify"].response &&
      state["directorUserVerify"].attachDirectorID.response
    ) {
      newGraph = getDirectorKYC(graph);
      setGraphState(prevValues => ({
        ...prevValues,
        ["graph"]: newGraph
      }));
    }
    if (
      state["directorUserVerify"].response &&
      state["directorUserVerify"].directorKYC.response
    ) {
      newGraph = getSanction(graph);
      setGraphState(prevValues => ({
        ...prevValues,
        ["graph"]: newGraph
      }));
    }
  }, [
    state["KYB"].attachKYB.response,
    state["directorUserVerify"].attachDirectorID.response,
    state["directorUserVerify"].directorKYC.response
  ]);

  useEffect(() => {
    let graph = graphState.graph;
    let newGraph;
    if (!state.onBoarding.response) {
      newGraph = getOnBoarding(graph);
      setState(prevState => ({
        ...prevState,
        ["onBoarding"]: {
          ...prevState["onBoarding"],
          response: "standBy"
        }
      }));
      setGraphState(prevValues => ({
        ...prevValues,
        ["graph"]: newGraph
      }));
    }
    for (let key in state) {
      if (
        state[key].response &&
        state[key].response !== "standBy" &&
        state[key].graphPlotted === false
      ) {
        if (key === "onBoarding") {
          newGraph = getKYB(graph);
        } else if (key === "KYB") {
          newGraph = getAttachKYB(graph);
        } else if (key === "directorVerify") {
          newGraph = getDirectorUserVerify(graph);
        } else if (key === "directorUserVerify") {
          newGraph = getDirectorID(graph);
        } else if (key === "sanction") {
          newGraph = getCreditRating(graph);
        } else if (key === "creditRating") {
          newGraph = getSponserUser(graph);
        } else if (key === "sponserUser") {
          newGraph = createAvatar(graph);
        }
        setGraphState(prevValues => ({
          ...prevValues,
          ["graph"]: newGraph
        }));
        setState(prevState => ({
          ...prevState,
          [key]: {
            ...prevState[key],
            graphPlotted: true
          }
        }));
      }
    }
  });

  const handleChangeLayoutEngineType = event => {
    setGraphState(prevValues => ({
      ...prevValues,
      layoutEngineType: event.target.value
    }));
  };

  const { nodes, edges } = graphState.graph;
  const selected = graphState.selected;
  const { NodeTypes, NodeSubtypes, EdgeTypes } = GraphConfig;

  return (
    <div style={{ fontSize: "14px" }}>
      <div
        style={{
          margin: "10px",
          display: "flex",
          flexFlow: "row wrap",
          alignItems: "center"
        }}
      >
        <div style={{ margin: "6px" }}>
          <span>Layout Engine:</span>
          <select
            style={{ marginLeft: "10px" }}
            name="layout-engine-type"
            onChange={handleChangeLayoutEngineType}
          >
            <option value={undefined}>None</option>
            <option value={"SnapToGrid"}>Snap to Grid</option>
            <option value={"VerticalTree"}>Vertical Tree</option>
          </select>
        </div>
      </div>
      <div style={{ height: "750px" }}>
        <GraphView
          ref={graphView}
          nodeKey={NODE_KEY}
          nodes={nodes}
          edges={edges}
          selected={selected}
          nodeTypes={NodeTypes}
          nodeSubtypes={NodeSubtypes}
          edgeTypes={EdgeTypes}
          layoutEngineType={graphState.layoutEngineType}
        />
      </div>
    </div>
  );
};

export default DAGraphContainer;
