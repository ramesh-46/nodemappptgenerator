import React, { useState } from 'react';

const DraggableNode = ({ id, label, initialPosition }) => {
  const [position, setPosition] = useState(initialPosition);

  const handleMouseDown = (e) => {
    const startX = e.clientX - position.x;
    const startY = e.clientY - position.y;

    const handleMouseMove = (moveEvent) => {
      const newX = moveEvent.clientX - startX;
      const newY = moveEvent.clientY - startY;
      setPosition({ x: newX, y: newY });
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const styles = {
    node: {
      position: 'absolute',
      top: position.y,
      left: position.x,
      backgroundColor: '#4CAF50',
      color: 'white',
      padding: '10px 20px',
      borderRadius: '5px',
      cursor: 'grab',
      boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
      fontWeight: 'bold',
    },
  };

  return (
    <div
      style={styles.node}
      onMouseDown={handleMouseDown}
      title={`Node ID: ${id}`}
    >
      {label}
    </div>
  );
};

const App = () => {
  const [nodes, setNodes] = useState([
    { id: '1', label: 'Node 1', position: { x: 100, y: 100 } },
    { id: '2', label: 'Node 2', position: { x: 200, y: 200 } },
  ]);

  const addNode = () => {
    const newNode = {
      id: `${nodes.length + 1}`,
      label: `Node ${nodes.length + 1}`,
      position: { x: 50, y: 50 },
    };
    setNodes([...nodes, newNode]);
  };

  return (
    <div>
      <button onClick={addNode} style={{ marginBottom: '20px' }}>
        Add Node
      </button>
      {nodes.map((node) => (
        <DraggableNode
          key={node.id}
          id={node.id}
          label={node.label}
          initialPosition={node.position}
        />
      ))}
    </div>
  );
};

export default App;
