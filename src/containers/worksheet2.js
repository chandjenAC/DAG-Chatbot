import * as React from "react";
import {
  GraphView
  //   type IEdgeType as IEdge,
  //   type INodeType as INode,
  //   type LayoutEngineType,
} from "react-digraph";
import GraphConfig, {
  edgeTypes,
  EMPTY_EDGE_TYPE,
  EMPTY_TYPE,
  NODE_KEY,
  nodeTypes
} from "../config/graph-config"; // Configures node/edge types

// type IGraph = {
//   nodes: INode[],
//   edges: IEdge[],
// };

// NOTE: Edges must have 'source' & 'target' attributes
// In a more realistic use case, the graph would probably originate
// elsewhere in the App or be generated from some other state upstream of this component.
const rootNode = {
  edges: [],
  nodes: [
    {
      id: "start1",
      title: "Get Passport",
      type: EMPTY_TYPE
    }
  ]
};

// type IGraphProps = {};x

// type IGraphState = {
//   graph: any,
//   selected: any,
//   totalNodes: number,
//   copiedNode: any,
//   layoutEngineType?: LayoutEngineType,
// };

class DAGraphContainer extends React.Component {
  GraphView;

  constructor(props) {
    super(props);

    this.state = {
      graph: rootNode,
      layoutEngineType: undefined,
      selected: null,
      totalNodes: rootNode.nodes.length
    };

    this.GraphView = React.createRef();
  }

  static getDerivedStateFromProps(props, state) {
    console.log(">>>>>>>>>>>>>>>>>>props", props);
    let graph = state.graph;
    const getTicketAndInsurance = () => {
      graph.nodes = [
        {
          id: "a1",
          title: "Get Ticket",
          type: EMPTY_TYPE,
          x: 400,
          y: -150
        },
        {
          id: "a2",
          title: "Get Insurance",
          type: EMPTY_TYPE,
          x: 400,
          y: 150
        },
        ...graph.nodes
      ];
      graph.edges = [
        {
          handleText: "Ticket",
          handleTooltipText: "requesting ticket",
          source: "start1",
          target: "a1",
          type: EMPTY_EDGE_TYPE
        },
        {
          handleText: "Insurance",
          handleTooltipText: "requesting insurance",
          source: "start1",
          target: "a2",
          type: EMPTY_EDGE_TYPE
        },
        ...graph.edges
      ];
      console.log("grap", graph);
    };
    console.log(">>>>>>>>>>>>>>>>>>state", state);
    return props.state.passport === true
      ? {
          graph: getTicketAndInsurance(),
          layoutEngineType: state.layoutEngineType,
          selected: state.selected,
          totalNodes: graph.nodes.length
        }
      : null;
  }

  handleChange = (event: any) => {
    this.setState(
      {
        totalNodes: parseInt(event.target.value || "0", 10)
      },
      this.makeItLarge
    );
  };

  //   addStartNode = () => {
  //     const graph = this.state.graph;

  //     // using a new array like this creates a new memory reference
  //     // this will force a re-render
  //   graph.nodes = [
  //     {
  //       id: Date.now(),
  //       title: "Node A",
  //       type: EMPTY_TYPE,
  //       x: 0,
  //       y: 0
  //     },
  //     ...this.state.graph.nodes
  //   ];
  //   this.setState({
  //     graph
  //   });
  //   };
  // Updates the graph with a new node
  onCreateNode = (x: number, y: number) => {
    const graph = this.state.graph;

    // This is just an example - any sort of logic
    // could be used here to determine node type
    // There is also support for subtypes. (see 'sample' above)
    // The subtype geometry will underlay the 'type' geometry for a node
    const type = Math.random() < 0.25 ? EMPTY_TYPE : EMPTY_TYPE;

    const viewNode = {
      id: Date.now(),
      title: "",
      type,
      x,
      y
    };

    graph.nodes = [...graph.nodes, viewNode];
    this.setState({ graph });
  };

  // Deletes a node from the graph

  // Creates a new node between two edges
  onCreateEdge = (sourceViewNode: INode, targetViewNode: INode) => {
    const graph = this.state.graph;
    // This is just an example - any sort of logic
    // could be used here to determine edge type
    const type =
      sourceViewNode.type === EMPTY_TYPE ? EMPTY_EDGE_TYPE : EMPTY_EDGE_TYPE;

    const viewEdge = {
      source: sourceViewNode[NODE_KEY],
      target: targetViewNode[NODE_KEY],
      type
    };

    // Only add the edge when the source node is not the same as the target
    if (viewEdge.source !== viewEdge.target) {
      graph.edges = [...graph.edges, viewEdge];
      this.setState({
        graph,
        selected: viewEdge
      });
    }
  };

  // Called when an edge is reattached to a different target.

  handleChangeLayoutEngineType = (event: any) => {
    this.setState({
      layoutEngineType: (event.target.value: LayoutEngineType | "None")
    });
  };

  onSelectPanNode = (event: any) => {
    if (this.GraphView) {
      this.GraphView.panToNode(event.target.value, true);
    }
  };

  /*
   * Render
   */

  render() {
    console.log("tis .satat", this.state);
    const { nodes, edges } = this.state.graph;
    const selected = this.state.selected;
    const { NodeTypes, NodeSubtypes, EdgeTypes } = GraphConfig;

    return (
      <div style={{ fontSize: "16px" }}>
        <div
          style={{
            margin: "10px",
            display: "flex",
            flexFlow: "row wrap",
            justifyContent: "space-between",
            alignItems: "center"
          }}
        >
          <button onClick={this.addStartNode}>Add Node</button>
          <button onClick={this.deleteStartNode}>Delete Node</button>
          <div style={{ margin: "10px" }}>
            <span>Layout Engine:</span>
            <select
              name="layout-engine-type"
              onChange={this.handleChangeLayoutEngineType}
            >
              <option value={undefined}>None</option>
              <option value={"SnapToGrid"}>Snap to Grid</option>
              <option value={"VerticalTree"}>Vertical Tree</option>
            </select>
          </div>
          <div style={{ margin: "10px" }}>
            <span>Pan To:</span>
            <select onChange={this.onSelectPanNode}>
              {nodes.map(node => (
                <option key={node[NODE_KEY]} value={node[NODE_KEY]}>
                  {node.title}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div style={{ height: "660px" }}>
          <GraphView
            ref={el => (this.GraphView = el)}
            nodeKey={NODE_KEY}
            nodes={nodes}
            edges={edges}
            selected={selected}
            nodeTypes={NodeTypes}
            nodeSubtypes={NodeSubtypes}
            edgeTypes={EdgeTypes}
            onSelectNode={this.onSelectNode}
            onCreateNode={this.onCreateNode}
            onUpdateNode={this.onUpdateNode}
            onSelectEdge={this.onSelectEdge}
            onCreateEdge={this.onCreateEdge}
            layoutEngineType={this.state.layoutEngineType}
          />
        </div>
      </div>
    );
  }
}

export default DAGraphContainer;
