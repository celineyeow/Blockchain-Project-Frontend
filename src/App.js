// React
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import {ethers} from 'ethers';

// Paths
import Home from './pages/Home.js'
import Donate from "./pages/Donate.js";
import NotFound from "./pages/NotFound.js";

// Web3
import Web3 from 'web3';
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "./contracts/config";

// css
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
    const [haveMetamask, setHaveMetamask] = useState(true);     // check if the browser has MetaMask installed. 
    const [address, setAddress] = useState(null);               // address of connected MetaMask account. 
    const [network, setNetwork] = useState(null);               // network the account is using. 
    const [balance, setBalance] = useState(0);                  // balance of connected MetaMask account. 
    const [isConnected, setIsConnected] = useState(false);      // check if is connected to MetaMask account. 

    const {ethereum} = window;
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
    const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);

    const [currValue, setCurrValue] = useState(null);

// connect to MetaMask. 
    const connectWallet = async () => {
        try {
            if (!ethereum){
                setHaveMetamask(false);
            }
            const accounts = await ethereum.request({
                method: 'eth_requestAccounts',
            });
            const chainId = await ethereum.request({
                method: 'eth_chainId',
            });

            let balanceVal = await provider.getBalance(accounts[0]);
            let bal = ethers.utils.formatEther(balanceVal);

            console.log(chainId);
            if (chainId === '0x3'){
                setNetwork('Ropsten Test Network');
            }
            else {
                setNetwork('Other Test Network');
            }
            setAddress(accounts[0]);
            setBalance(bal);
            setIsConnected(true);
        }
        catch (error){
            setIsConnected(false);
        }
    }


////// Contract Deployment. 
    // IMPORTANT: async / await is essential to get values instead of Promise. 
    const storeData = async (inputVal) => {
        const res = await contract.methods.setP(inputVal).send({from: address});
        return res;
    }

    const getData = async () => {
        const res = await contract.methods.get().call();
        return res;
    }

  return(
    <div className="App">
        <BrowserRouter>
            <Routes>
              <Route path="/*" 
                element={
                    <Home 
                        connectWallet={connectWallet}
                        haveMetamask={haveMetamask} 
                        isConnected = {isConnected}
                        address = {address} 
                        networkType = {network} 
                        balance = {balance}
                        contract={contract}
                    />
                }/>
          </Routes>
        </BrowserRouter>
    </div>
  )
}

export default App;
