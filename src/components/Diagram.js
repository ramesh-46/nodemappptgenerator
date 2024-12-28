import React, { useState, useRef } from 'react';
import ReactFlow, { addEdge, MiniMap, Controls } from 'react-flow-renderer';
import { useSelector, useDispatch } from 'react-redux';
import { addNode, removeNode, addEdge as reduxAddEdge, removeEdge as reduxRemoveEdge } from '../redux/diagramSlice';
import jsPDF from 'jspdf'; // Import jsPDF for PDF generation
import html2canvas from 'html2canvas'; // Import html2canvas for capturing the diagram
import '../App.css'; // Import the CSS file

const Diagram = () => {
  const { nodes, edges } = useSelector((state) => state.diagram);
  const dispatch = useDispatch();
  const flowRef = useRef(null); // Ref for ReactFlow container

  const [nodeName, setNodeName] = useState('');
  const [selectedNodeId, setSelectedNodeId] = useState(null);
  const [selectedEdgeId, setSelectedEdgeId] = useState(null); // State to hold selected edge ID

  const getNextPosition = (parentNodeId) => {
    if (parentNodeId) {
      const parentNode = nodes.find((node) => node.id === parentNodeId);
      if (parentNode) {
        return { x: parentNode.position.x + 200, y: parentNode.position.y + 150 };
      }
    }
    return { x: 200 + Math.random() * 300, y: 200 + Math.random() * 200 };
  };

  const onNodesChange = (changes) => {
    console.log('Node Change', changes);
  };

  const onEdgesChange = (changes) => {
    console.log('Edge Change', changes);
  };

  const onConnect = (params) => {
    dispatch(reduxAddEdge({ ...params, id: `e${params.source}-${params.target}` }));
  };

  const handleAddNode = (parentNodeId = null) => {
    const name = nodeName || `Node ${nodes.length + 1}`;
    const newNodeId = `node_${nodes.length + 1}`;
    const initialPosition = getNextPosition(parentNodeId);

    const newNode = {
      id: newNodeId,
      type: 'default',
      position: initialPosition,
      data: { label: name },
      style: {
        border: '3px solid #333',
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
        transition: 'all 0.3s ease-in-out',
      },
    };

    dispatch(addNode(newNode));
    setNodeName(''); // Reset the input field after adding node
  };

  const handleRemoveNode = () => {
    if (selectedNodeId) {
      dispatch(removeNode(selectedNodeId));
      setSelectedNodeId(null);
    }
  };

  const handleNodeClick = (event, node) => {
    setSelectedNodeId(node.id);
  };

  const handleDownloadPDF = () => {
    html2canvas(flowRef.current).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const doc = new jsPDF();
      doc.addImage(imgData, 'PNG', 10, 10, 180, 160);
      doc.save('flowchart.pdf');
    });
  };

  return (
    <div>
      <div className="control-panel">
        <input
          type="text"
          value={nodeName}
          onChange={(e) => setNodeName(e.target.value)}
          placeholder="Enter node name"
          className="node-input"
        />
        <button onClick={() => handleAddNode()} className="add-node-button">Add Node</button>
        <button onClick={handleRemoveNode} className="remove-node-button">Remove Node</button>
        <button onClick={handleDownloadPDF} className="download-pdf-button">Download Map (PDF)</button>

        {selectedNodeId && (
          <div className="selected-node-id">
            <span>Selected Node ID: {selectedNodeId}</span>
          </div>
        )}
      </div>

      <div ref={flowRef} className="react-flow-container">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          fitView
          onNodeClick={handleNodeClick}
          draggable={false}  // Disabling dragging of the entire canvas
          nodeTypes={{}} // Remove any custom node type if it causes issues
          snapToGrid={true} // Optional: Enable snapping to grid
          nodeDraggable={true} // Ensuring nodes are draggable individually
        >
          {/* Optional MiniMap and Controls */}
          <MiniMap />
          <Controls />
        </ReactFlow>
      </div>
    </div>
  );
};

export default Diagram;
