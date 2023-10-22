import './App.css';
import './index.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes,} from 'react-router-dom';


import Homepage from './components/Home/Homepage';

const App = props => {
  return (
    <div className="App">
      <Router>
        <main className="App-main">
          <Routes>
            {/* a route for the home page */}
            <Route path="/" element={<Homepage />} />

          </Routes>
        </main>
      </Router>
    </div>
  )
}

export default App
