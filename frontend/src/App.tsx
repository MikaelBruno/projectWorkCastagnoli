import React from 'react';
import './App.scss';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import VerticaBarChart from './components/VerticalBarChart';
import Navbar from './components/Navbar';
import Nazionale from './pages/Nazionale';
import Regionale from "./pages/Regionale"


const National: React.FC = () => <><Nazionale /></>;
const Regional: React.FC = () => <><Regionale /></>;
const Comparazione: React.FC = () => <div></div>;


function App() {
  return (
  <>
    <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<National />} />
                <Route path="/regionale" element={<Regional />} />
                <Route path="/confronto" element={<Comparazione />} />
            </Routes>
    </Router>
  </>
  );
}

export default App;
