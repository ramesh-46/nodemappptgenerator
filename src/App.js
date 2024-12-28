import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Diagram from './components/Diagram';
import Sidebar from './components/Sidebar';
// Import the necessary actions
import { addEdge, addNode, removeEdge, removeNode } from './redux/diagramSlice';
import metadata from './metadata.json';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // If you were intending to set the initial diagram data, 
    // make sure it's handled appropriately (maybe with addNode, addEdge actions, etc.)
    metadata.nodes.forEach(node => {
      dispatch(addNode(node)); // Dispatch action to add nodes from metadata
    });
    metadata.edges.forEach(edge => {
      dispatch(addEdge(edge)); // Dispatch action to add edges from metadata
    });
  }, [dispatch]);

  return (
    <div style={{ display: 'flex', gap: '10px' }}>
      <Sidebar />
      <Diagram />
    </div>
  );
};

export default App;
