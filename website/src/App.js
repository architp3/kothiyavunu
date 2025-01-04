import './App.css';
import './input.css';
import './output.css';
import Navbar from './pages/navbar.js';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import About from './pages/about.js';
import HomePage from './pages/homepage.js';

function App() {
  return (
      <Router>
        <Navbar />
        <Routes>
            <Route path="/" element={<HomePage/>} />
            <Route path="/recipes" element={<h1>Recipes Page</h1>} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<h1>Contact Page</h1>} />
        </Routes>
      </Router>
  );
}

export default App;
