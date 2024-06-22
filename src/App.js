import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TaskComponent from './Task'; // Import TaskComponent

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/tasks/:taskId" element={<TaskComponent />} />
      </Routes>
    </Router>
  );
}

export default App;
