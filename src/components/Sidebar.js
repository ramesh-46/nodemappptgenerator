import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addNode, removeNode, updateNode } from '../redux/diagramSlice';

const Sidebar = () => {
  const dispatch = useDispatch();
  const nodes = useSelector((state) => state.diagram.nodes);

  const [selectedNodeId, setSelectedNodeId] = useState(null);
  const [nodeName, setNodeName] = useState('');
  const [viewMode, setViewMode] = useState('json'); // Default to JSON view

  // Handle the node click to set it as selected
  const handleNodeClick = (event, node) => {
    setSelectedNodeId(node.id);
    setNodeName(node.data.label); // Set the selected node's name for editing
  };

  // Handle editing the node name
  const handleEditNodeName = () => {
    if (selectedNodeId && nodeName) {
      dispatch(updateNode({ id: selectedNodeId, data: { label: nodeName } }));
    } else {
      alert('Please select a node and enter a valid name.');
    }
  };

  // Toggle between JSON and Table view
  const handleViewModeChange = (mode) => {
    setViewMode(mode);
  };

  // Render JSON format
  const renderJSON = () => (
    <div style={styles.jsonContainer}>
      <pre>{JSON.stringify(nodes, null, 2)}</pre>
    </div>
  );

  // Render Table format with improved design
  const renderTable = () => (
    <div style={styles.tableContainer}>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.tableHeader}>ID</th>
            <th style={styles.tableHeader}>Label</th>
            <th style={styles.tableHeader}>X Position</th>
            <th style={styles.tableHeader}>Y Position</th>
          </tr>
        </thead>
        <tbody>
          {nodes.map((node) => (
            <tr key={node.id}>
              <td style={styles.tableCell}>{node.id}</td>
              <td style={styles.tableCell}>{node.data.label}</td>
              <td style={styles.tableCell}>{node.position.x}</td>
              <td style={styles.tableCell}>{node.position.y}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div style={styles.sidebarContainer}>
      {/* View Mode Selection */}
      <h3>View Node Data</h3>
      <div style={styles.viewModeButtons}>
        <button
          onClick={() => handleViewModeChange('json')}
          style={viewMode === 'json' ? styles.activeButton : styles.inactiveButton}
        >
          JSON View
        </button>
        <button
          onClick={() => handleViewModeChange('table')}
          style={viewMode === 'table' ? styles.activeButton : styles.inactiveButton}
        >
          Table View
        </button>
      </div>

      {/* Render based on selected view mode */}
      {viewMode === 'json' ? renderJSON() : renderTable()}

      {/* Node Selection and Editing */}
      {selectedNodeId && (
        <div>
          <h4>Selected Node: {selectedNodeId}</h4>
          <input
            type="text"
            value={nodeName}
            onChange={(e) => setNodeName(e.target.value)}
            placeholder="Edit node name"
            style={styles.inputField}
          />
          <button
            onClick={handleEditNodeName}
            style={styles.saveButton}
          >
            Save Node Name
          </button>
        </div>
      )}
    </div>
  );
};

// Inline CSS styles
const styles = {
  sidebarContainer: {
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    width: '300px',
  },
  viewModeButtons: {
    marginBottom: '15px',
  },
  activeButton: {
    padding: '8px 15px',
    backgroundColor: '#2196F3',
    color: 'white',
    border: '1px solid #2196F3',
    cursor: 'pointer',
    width: '100%',
    marginBottom: '10px',
  },
  inactiveButton: {
    padding: '8px 15px',
    backgroundColor: '#ddd',
    color: '#000',
    border: '1px solid #ccc',
    cursor: 'pointer',
    width: '100%',
    marginBottom: '10px',
  },
  jsonContainer: {
    marginBottom: '15px',
    maxHeight: '200px',
    overflowY: 'auto',
  },
  tableContainer: {
    maxWidth: '100%',
    overflowX: 'auto',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginBottom: '15px',
    fontSize: '12px', // Decrease font size to make it fit better
  },
  tableHeader: {
    border: '1px solid #ccc',
    padding: '8px',
    textAlign: 'left',
    backgroundColor: '#f4f4f4',
  },
  tableCell: {
    border: '1px solid #ccc',
    padding: '8px',
  },
  inputField: {
    padding: '8px',
    width: '100%',
    marginBottom: '10px',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  saveButton: {
    padding: '8px 15px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: '1px solid #4CAF50',
    cursor: 'pointer',
    width: '100%',
  },
};

export default Sidebar;
