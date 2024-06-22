import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TaskComponent from './Task'; // Import TaskComponent
import MasterDataComponent from './Master'; // Import MasterDataComponent
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/tasks/:taskId" element={<TaskComponent />} />
        <Route path="/masterdata" element={<MasterDataComponent />} />
      </Routes>
    </Router>
  );
}

export default App;
