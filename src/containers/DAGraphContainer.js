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
    layoutEngineType: "SnapToGrid",
    selected: null,
    totalNodes: rootGraph.nodes.length,
    completed: false
  });

  console.log("MAIN STATEEEEEEEEEEEEEE*********************", props.state);
  console.log("State*****************", graphState);
  const getBranch = id => {
    let graph = graphState.graph;
    let newGraph;
    let render = true;
    if (id === "onBoarding") {
      graph.nodes.every((node, index) => {
        if (node.id === "userAuth") {
          render = false;
        }
      });
      if (render) {
        newGraph = getOnBoarding(graph);
      } else {
        let newNodes = graph.nodes.filter((node, index) => {
          return node.id !== "userAuth";
        });
        newGraph = { edges: graph.edges, nodes: newNodes };
      }
    } else if (id === "KYB") {
      graph.nodes.every((node, index) => {
        if (["attachKYB", "globalID", "indianID"].includes(node.id)) {
          render = false;
        }
      });
      if (render) {
        newGraph = getKYB(graph);
      } else {
        let newNodes = graph.nodes.filter((node, index) => {
          return (
            node.id !== "attachKYB" &&
            node.id !== "globalID" &&
            node.id !== "indianID"
          );
        });
        newGraph = { edges: graph.edges, nodes: newNodes };
      }
    } else if (id === "attachKYB") {
      graph.nodes.every((node, index) => {
        if (["browserUpload", "cloudUpload", "emailAttach"].includes(node.id)) {
          render = false;
        }
      });
      if (render) {
        newGraph = getAttachKYB(graph);
      } else {
        let newNodes = graph.nodes.filter((node, index) => {
          return (
            node.id !== "browserUpload" &&
            node.id !== "cloudUpload" &&
            node.id !== "emailAttach"
          );
        });
        newGraph = { edges: graph.edges, nodes: newNodes };
      }
    } else if (id === "directorVerify") {
      graph.nodes.every((node, index) => {
        if (["globalTrulioo", "indianAadhar"].includes(node.id)) {
          render = false;
        }
      });
      if (render) {
        newGraph = getDirectorVerify(graph);
      } else {
        let newNodes = graph.nodes.filter((node, index) => {
          return node.id !== "globalTrulioo" && node.id !== "indianAadhar";
        });
        newGraph = { edges: graph.edges, nodes: newNodes };
      }
    } else if (id === "directorUserVerify") {
      graph.nodes.every((node, index) => {
        if (
          [
            "attachDirectorID",
            "directorKYC",
            "globalEmail",
            "globalMobile"
          ].includes(node.id)
        ) {
          render = false;
        }
      });
      if (render) {
        newGraph = getDirectorUserVerify(graph);
      } else {
        let newNodes = graph.nodes.filter((node, index) => {
          return (
            node.id !== "attachDirectorID" &&
            node.id !== "directorKYC" &&
            node.id !== "globalEmail" &&
            node.id !== "globalMobile"
          );
        });
        newGraph = { edges: graph.edges, nodes: newNodes };
      }
    } else if (id === "attachDirectorID") {
      graph.nodes.every((node, index) => {
        if (["emailAttach", "cloudUpload"].includes(node.id)) {
          render = false;
        }
      });
      if (render) {
        newGraph = getDirectorID(graph);
      } else {
        let newNodes = graph.nodes.filter((node, index) => {
          return node.id !== "emailAttach" && node.id !== "cloudUpload";
        });
        newGraph = { edges: graph.edges, nodes: newNodes };
      }
    } else if (id === "directorKYC") {
      graph.nodes.every((node, index) => {
        if (
          ["globalTrulioo", "indianDL", "aadhar", "indianPassport"].includes(
            node.id
          )
        ) {
          render = false;
        }
      });
      if (render) {
        newGraph = getDirectorKYC(graph);
      } else {
        let newNodes = graph.nodes.filter((node, index) => {
          return (
            node.id !== "globalTrulioo" &&
            node.id !== "indianDL" &&
            node.id !== "aadhar" &&
            node.id !== "indianPassport"
          );
        });
        newGraph = { edges: graph.edges, nodes: newNodes };
      }
    } else if (id === "sanction") {
      graph.nodes.every((node, index) => {
        if (["globalScan", "alert"].includes(node.id)) {
          render = false;
        }
      });
      if (render) {
        newGraph = getSanction(graph);
      } else {
        let newNodes = graph.nodes.filter((node, index) => {
          return node.id !== "globalScan" && node.id !== "alert";
        });
        newGraph = { edges: graph.edges, nodes: newNodes };
      }
    } else if (id === "creditRating") {
      graph.nodes.every((node, index) => {
        if (
          [
            "globalBusiness",
            "globalIndividual",
            "indianCommercial",
            "indianIndividual",
            "alert"
          ].includes(node.id)
        ) {
          render = false;
        }
      });
      if (render) {
        newGraph = getCreditRating(graph);
      } else {
        let newNodes = graph.nodes.filter((node, index) => {
          return (
            node.id !== "globalBusiness" &&
            node.id !== "globalIndividual" &&
            node.id !== "indianCommercial" &&
            node.id !== "indianIndividual" &&
            node.id !== "alert"
          );
        });
        newGraph = { edges: graph.edges, nodes: newNodes };
      }
    } else if (id === "sponserUser") {
      graph.nodes.every((node, index) => {
        if (["review", "authorise"].includes(node.id)) {
          render = false;
        }
      });
      if (render) {
        newGraph = getSponserUser(graph);
      } else {
        let newNodes = graph.nodes.filter((node, index) => {
          return node.id !== "review" && node.id !== "authorise";
        });
        newGraph = { edges: graph.edges, nodes: newNodes };
      }
    } else if (id === "createAvatar") {
      graph.nodes.every((node, index) => {
        if (
          [
            "compliance",
            "reputation",
            "avatarQRCode",
            "avatarCreated"
          ].includes(node.id)
        ) {
          render = false;
        }
      });
      if (render) {
        newGraph = createAvatar(graph);
      } else {
        let newNodes = graph.nodes.filter((node, index) => {
          return (
            node.id !== "compliance" &&
            node.id !== "reputation" &&
            node.id !== "avatarQRCode" &&
            node.id !== "avatarCreated"
          );
        });
        newGraph = { edges: graph.edges, nodes: newNodes };
      }
    }
    setGraphState(prevValues => ({
      ...prevValues,
      ["graph"]: newGraph
    }));
  };

  const handleChangeLayoutEngineType = event => {
    console.log("value", event.target.value);
    setGraphState(prevValues => ({
      ...prevValues,
      layoutEngineType: event.target.value
    }));
  };

  const renderNodeText = data => {
    if (
      [
        "onBoarding",
        "KYB",
        "attachKYB",
        "directorVerify",
        "directorUserVerify",
        "attachDirectorID",
        "directorKYC",
        "sanction",
        "creditRating",
        "sponserUser",
        "createAvatar"
      ].includes(data.id)
    ) {
      return (
        <foreignObject x="-100" y="-30" width="200" height="50">
          <div style={{ textAlign: "center" }}>
            <p style={{ fontSize: "22px", color: "white" }}>{data.title}</p>
          </div>
        </foreignObject>
      );
    } else if (data.id === "alert") {
      return (
        <foreignObject x="-100" y="-88" width="200" height="50">
          <div style={{ textAlign: "center" }}>
            <p style={{ fontSize: "22px", color: "white" }}>{data.title}</p>
          </div>
        </foreignObject>
      );
    } else {
      return (
        <foreignObject x="-100" y="-50" width="200" height="50">
          <div style={{ textAlign: "center" }}>
            <p style={{ fontSize: "22px", color: "white" }}>{data.title}</p>
          </div>
        </foreignObject>
      );
    }
  };

  useEffect(() => {
    if (graphState.layoutEngineType === "None")
      setGraphState(prevValues => ({
        ...prevValues,
        layoutEngineType: "SnapToGrid"
      }));
    else {
      setGraphState(prevValues => ({
        ...prevValues,
        layoutEngineType: "None"
      }));
    }
  }, [props.state]);
  
  const renderNode = (ref, data, id, selected, hover, nodeProps) => {
    if (
      [
        "onBoarding",
        // "KYB", // this one
        "directorVerify",
        // "directorUserVerify", // this one
        "sanction",
        "creditRating",
        "sponserUser",
        "createAvatar"
      ].includes(id)
    ) {
      if (props.state[id].response) {
        return (
          <g style={{ cursor: "pointer" }}>
            <use
              className="node"
              height={200}
              width={200}
              x={-100}
              xlinkHref={"#routerNodeCompleted"}
              y={-100}
            />
          </g>
        );
      } else {
        return (
          <g style={{ cursor: "pointer" }}>
            <use
              className="node"
              height={200}
              width={200}
              x={-100}
              xlinkHref={"#routerNodeIdeal"}
              y={-100}
            />
          </g>
        );
      }
    } else if (id === "KYB") {
      if (props.state.KYB.attachKYB.response) {
        return (
          <g style={{ cursor: "pointer" }}>
            <use
              className="node"
              height={200}
              width={200}
              x={-100}
              xlinkHref={"#routerNodeCompleted"}
              y={-100}
            />
          </g>
        );
      } else {
        return (
          <g style={{ cursor: "pointer" }}>
            <use
              className="node"
              height={200}
              width={200}
              x={-100}
              xlinkHref={"#routerNodeIdeal"}
              y={-100}
            />
          </g>
        );
      }
    } else if (id === "directorUserVerify") {
      if (
        props.state.directorUserVerify.attachDirectorID.response &&
        props.state.directorUserVerify.directorKYC.response
      ) {
        return (
          <g style={{ cursor: "pointer" }}>
            <use
              className="node"
              height={200}
              width={200}
              x={-100}
              xlinkHref={"#routerNodeCompleted"}
              y={-100}
            />
          </g>
        );
      } else {
        return (
          <g style={{ cursor: "pointer" }}>
            <use
              className="node"
              height={200}
              width={200}
              x={-100}
              xlinkHref={"#routerNodeIdeal"}
              y={-100}
            />
          </g>
        );
      }
    } else if (id === "attachKYB") {
      if (props.state.KYB.attachKYB.response) {
        return (
          <g style={{ cursor: "pointer" }}>
            <use
              className="node"
              height={200}
              width={200}
              x={-100}
              xlinkHref={"#routerNodeCompleted"}
              y={-100}
            />
          </g>
        );
      } else {
        return (
          <g style={{ cursor: "pointer" }}>
            <use
              className="node"
              height={200}
              width={200}
              x={-100}
              xlinkHref={"#routerNodeIdeal"}
              y={-100}
            />
          </g>
        );
      }
    } else if (id === "attachDirectorID") {
      if (props.state.directorUserVerify.attachDirectorID.response) {
        return (
          <g style={{ cursor: "pointer" }}>
            <use
              className="node"
              height={200}
              width={200}
              x={-100}
              xlinkHref={"#routerNodeCompleted"}
              y={-100}
            />
          </g>
        );
      } else {
        return (
          <g style={{ cursor: "pointer" }}>
            <use
              className="node"
              height={200}
              width={200}
              x={-100}
              xlinkHref={"#routerNodeIdeal"}
              y={-100}
            />
          </g>
        );
      }
    } else if (id === "directorKYC") {
      if (props.state.directorUserVerify.directorKYC.response) {
        return (
          <g style={{ cursor: "pointer" }}>
            <use
              className="node"
              height={200}
              width={200}
              x={-100}
              xlinkHref={"#routerNodeCompleted"}
              y={-100}
            />
          </g>
        );
      } else {
        return (
          <g style={{ cursor: "pointer" }}>
            <use
              className="node"
              height={200}
              width={200}
              x={-100}
              xlinkHref={"#routerNodeIdeal"}
              y={-100}
            />
          </g>
        );
      }
    } else if (id === "alert") {
      return (
        <g style={{ cursor: "pointer" }}>
          <use
            className="node"
            height={200}
            width={200}
            x={-100}
            xlinkHref={"#eventHandlerNodeIdeal"}
            y={-146}
          />
        </g>
      );
    } else {
      return (
        <g style={{ cursor: "pointer" }}>
          <use
            className="node"
            height={200}
            width={200}
            x={-100}
            xlinkHref={"#gatewayNodeIdeal"}
            y={-110}
          />
        </g>
      );
    }
  };

  // Helper to find the index of a given node
  const getNodeIndex = searchNode => {
    return graphState.graph.nodes.findIndex(node => {
      return node[NODE_KEY] === searchNode[NODE_KEY];
    });
  };

  // Helper to find the index of a given edge
  const getEdgeIndex = searchEdge => {
    return graphState.graph.edges.findIndex(edge => {
      return (
        edge.source === searchEdge.source && edge.target === searchEdge.target
      );
    });
  };

  // Given a nodeKey, return the corresponding node
  const getViewNode = nodeKey => {
    const searchNode = {};
    searchNode[NODE_KEY] = nodeKey;
    const i = getNodeIndex(searchNode);
    return graphState.graph.nodes[i];
  };

  const onUpdateNode = viewNode => {
    console.log("on update node is called");
    const graph = graphState.graph;
    const i = getNodeIndex(viewNode);
    console.log("i from update node", i);
    graph.nodes[i] = viewNode;
    setGraphState(prevValues => ({
      ...prevValues,
      ["graph"]: graph
    }));
  };

  const onSelectNode = viewNode => {
    if (viewNode) {
      if (
        [
          "onBoarding",
          "KYB",
          "attachKYB",
          "directorVerify",
          "directorUserVerify",
          "attachDirectorID",
          "directorKYC",
          "sponserUser",
          "createAvatar"
        ].includes(viewNode.id)
      ) {
        getBranch(viewNode.id);
      }
    }
  };

  const onSelectPanNode = event => {
    if (graphView) {
      graphView.current.panToNode(event.target.value, true);
    }
  };

  const { nodes, edges } = graphState.graph;
  const selected = graphState.selected;
  const { NodeTypes, NodeSubtypes, EdgeTypes } = GraphConfig;

  return (
    <>
      <div
        style={{
          fontSize: "14px",
          margin: "10px",
          display: "flex",
          flexFlow: "row wrap",
          alignItems: "center",
          justifyContent: "space-between"
        }}
      >
        <div className="layout-engine">
          <span>Layout Engine:</span>
          <select
            name="layout-engine-type"
            onChange={handleChangeLayoutEngineType}
          >
            <option value={undefined}>None</option>
            <option value={"SnapToGrid"}>Snap to Grid</option>
            <option value={"VerticalTree"}>Vertical Tree</option>
          </select>
        </div>
        <div className="pan-list">
          <span>Pan To:</span>
          <select onChange={e => onSelectPanNode(e)}>
            {nodes.map(node => (
              <option key={node[NODE_KEY]} value={node[NODE_KEY]}>
                {node.title}
              </option>
            ))}
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
          onUpdateNode={e => onUpdateNode(e)}
          onSelectNode={e => onSelectNode(e)}
          renderNode={renderNode}
          renderNodeText={e => renderNodeText(e)}
          layoutEngineType={graphState.layoutEngineType}
        />
      </div>
    </>
  );
};

export default DAGraphContainer;

{
  /* <div
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
</div> */
}
