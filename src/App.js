// React
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Paths
import Home from './pages/Home.js'
import About from "./pages/About.js";
import NotFound from "./pages/NotFound.js";

// Web3
import Web3 from 'web3';
import { CONTRACT_NAME_ADDRESS, CONTRACT_NAME_ABI } from "./contracts/config";

function App() {
  const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
  const contract = new web3.eth.Contract(CONTRACT_NAME_ABI, CONTRACT_NAME_ADDRESS);

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
