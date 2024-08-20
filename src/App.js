import * as React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Attendance from './Attendance';
import AddBranch from './AddBranch';

function App() {
  return (

   
    <Router>
            <Routes>
            
              <Route path='/' element={<Attendance/>} />
              <Route path='/AddBranch' element={<AddBranch/>} />
              
          
            </Routes>
          
          
    </Router>
  );
}

export default App;
