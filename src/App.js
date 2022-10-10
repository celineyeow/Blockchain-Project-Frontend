import { render } from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from './pages/Home.js'
import About from "./pages/About.js";
import NotFound from "./pages/NotFound.js";

import Web3 from 'web3';

function App() {
  return(
    <div className="App">
        <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home/>}/>
              <Route path="/home" element={<Home/>}/>
              <Route path="/about" element={<About/>}/>
              <Route path="*" element={<NotFound/>}/>
          </Routes>
        </BrowserRouter>
    </div>
  )
}

export default App;
