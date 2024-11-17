import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CustomerUpload from './components/CustomerUpload/index.js';
import CustomerSearch from './components/CustomerSearch/index.js';
import Home from './components/Home/index.js';
import Header from "./components/Header/index.js";

const App = () => {
  return (
      <Router>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/upload" element={<CustomerUpload />} />
          <Route path="/search" element={<CustomerSearch />} />
        </Routes>
      </Router>

  );
};

export default App;


