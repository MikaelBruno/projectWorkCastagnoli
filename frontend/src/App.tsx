import React from 'react';
import './App.scss';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import VerticaBarChart from './components/VerticalBarChart';
import Navbar from './components/Navbar';
import Nazionale from './pages/Nazionale';
import Regionale from "./pages/Regionale"
import Home from './pages/home';
import Confronto from './pages/confronto';

const Homepage: React.FC = () => <><Home/></>
const National: React.FC = () => <><Nazionale /></>;
const Regional: React.FC = () => <><Regionale /></>;
const Comparazione: React.FC = () => <><Confronto/></>;


function App() {
  return (
  <>
    <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/nazionale" element={<National />} />
                <Route path="/regionale" element={<Regional />} />
                <Route path="/confronto" element={<Comparazione />} />
            </Routes>
    </Router>
  </>
  );
}

export default App;
