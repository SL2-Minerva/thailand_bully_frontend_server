import React from 'react';
import Graph from 'react-graph-vis';
import 'react-graph-vis/node_modules/vis-network/dist/dist/vis-network.css';


const NetworkGraph = () => {
  
  const graph = {
    nodes: [
      { id: 1, label: "Word 1", title: "Word 1 change color,shape & size",color: "#f7f0c8",  shape: 'dot', size: 40 },
      { id: 2, label: "Word 2", title: "Word 2 tootip text" , shape: 'dot', size: 50 ,},
      { id: 3, label: "Word 3", title: "Word 3 tootip text", shape: 'dot', size: 40 , color: "#F7CACA"},
      { id: 4, label: "Word 4", title: "Word 4 tootip text" , shape: 'dot'},
      { id: 5, label: "Word 5", title: "Word 5 tootip text", shape: 'dot' },
      
    ],
    edges: [
      { from: 1, to: 2, length: 200, color: 'red' },
      { from: 1, to: 3, length: 250, color: 'blue'  },
      { from: 2, to: 4 , length: 150, color: 'brown'},
      { from: 2, to: 5 },
      { from: 6, to: 3},
    ]
  };
  
  const options = {
    layout: {
      hierarchical: false
    },
    edges: {
      color: "#000000",
      dashes: false
    },
    height: "700px"
  };
  
  // const events = {
  //   select: function(event : any) {

  //     const { nodes, edges } = event;
  //   }
  // };
  
  return (
    <Graph
      graph={graph}
      options={options}
    />
  );
}

export default NetworkGraph


