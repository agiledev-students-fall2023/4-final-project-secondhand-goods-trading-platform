import './App.css';
import './index.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes,} from 'react-router-dom';

import Login from './components/login/Login';
import Homepage from './components/Home/Homepage';
import SearchPage from './components/SearchPage/SearchPage';


const App = props => {
  return (
    <div className="App">
      <Router>
        <main className="App-main">
          <Routes>
            {/* a route for the home page */}
            <Route path="/home" element={<Homepage />} />

            {/* a route for the login page */}
            <Route path="/" element={<Login />} />

            {/* a route for the search page */}
            <Route path="/search" element={<SearchPage />} />

          </Routes>
        </main>
      </Router>
    </div>
  )
}

export default App
