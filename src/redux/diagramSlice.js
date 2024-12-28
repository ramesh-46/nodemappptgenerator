import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  nodes: [],
  edges: [],
};

const diagramSlice = createSlice({
  name: 'diagram',
  initialState,
  reducers: {
    addNode: (state, action) => {
      state.nodes.push(action.payload);
    },
    removeNode: (state, action) => {
      state.nodes = state.nodes.filter((node) => node.id !== action.payload);
    },
    updateNode: (state, action) => {
      const nodeIndex = state.nodes.findIndex((node) => node.id === action.payload.id);
      if (nodeIndex !== -1) {
        state.nodes[nodeIndex] = {
          ...state.nodes[nodeIndex],
          position: action.payload.position || state.nodes[nodeIndex].position,
          data: { ...state.nodes[nodeIndex].data, ...action.payload.data },
        };
      }
    },
    addEdge: (state, action) => {
      state.edges.push(action.payload);
    },
    // Add removeEdge action
    removeEdge: (state, action) => {
      state.edges = state.edges.filter((edge) => edge.id !== action.payload);
    },
  },
});

export const { addNode, removeNode, updateNode, addEdge, removeEdge } = diagramSlice.actions;
export default diagramSlice.reducer;
