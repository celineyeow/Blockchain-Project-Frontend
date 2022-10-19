// React
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import {ethers} from 'ethers';

// Paths
import Home from './pages/Home.js'
import Single from "./pages/Single.js";
import NotFound from "./pages/NotFound.js";

// Web3
import Web3 from 'web3';
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "./contracts/config";

const App = () => {
  const [haveMetamask, setHaveMetamask] = useState(true);     // check if the browser has MetaMask installed. 
  const [address, setAddress] = useState(null);               // address of connected MetaMask account. 
  const [network, setNetwork] = useState(null);               // network the account is using. 
  const [balance, setBalance] = useState(0);                  // balance of connected MetaMask account. 
  const [isConnected, setIsConnected] = useState(false);      // check if is connected to MetaMask account. 

  const [storedPending, setStoredPending] = useState(false);        // check if a value is pending. 
  const [storedDone, setStoredDone] = useState(false);        // check if a value is stored. 
  const [storedVal, setStoredVal] = useState(0);              // value that is stored right now. 
  const [showVal, setShowVal] = useState(0);                  // value that is showed on screen. 

  const [historyRecord, setHistoryRecord] = useState(null);   // record of history operations. 
  const [recordLen, setRecordLen] = useState(0);              // length of record. 
  const maxRecordLen = 50;                                    // maximum length of record list. 

  //const navigate = useNavigate();
  const {ethereum} = window;
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
  const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);

  // useEffect(() => {
  //     const { ethereum } = window;
  //     const checkMetamaskAvailability = async () => {
  //         if (!ethereum) {
  //             setHaveMetamask(false);
  //         }
  //         setHaveMetamask(true);
  //     };
  //     checkMetamaskAvailability();
  // }, []);

////// connect to MetaMask. 
  const connectWallet = async () => {         // function that connect to METAMASK account, activated when clicking on 'connect'. 
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

          //navigate('/InterfaceDemo/profile');
      }
      catch (error){
          setIsConnected(false);
      }
  }


////// Contract Deployment. 
  // IMPORTANT: async / await is essential to get values instead of Promise. 
  const storeData = async (inputVal) => {
      const res = await contract.methods.set(inputVal).send({from: address});
      return res;
  }

  const getData = async () => {
      const res = await contract.methods.get().call();
      return res;
  }


////// history recording. 
  const RecordOverFlow = () => {
      if (recordLen > maxRecordLen){
          let outlierNum = recordLen - maxRecordLen;
          setHistoryRecord(current => current.splice(1, outlierNum));
          setRecordLen(maxRecordLen);
      }
  }

  const RecordPush = (opr, val, detail) => {
      let stat = 1;
      let cost = 0;
      if (val.length === 0){
          val = 'NA';
          cost = 'NA';
          stat = 0;
      }
      else{
          if (opr === 'get'){
              cost = 0;
              stat = 1;
          }
          else{
              if (detail === 'null'){
                  setStoredPending(false);
                  setStoredDone(true);
                  console.log('Rejected');
                  cost = 'NA';
                  stat = 2;
              }
              else{
                  setStoredDone(true);
                  console.log('Done');
                  console.log(detail);    // show the details of transaction. 
                  cost = detail.gasUsed;
                  stat = 1;
              }
          }
      }

      const newRecord = {
          id: recordLen + 1, 
          address: address, 
          operation: opr, 
          value: val, 
          cost: cost, 
          status: stat
      };
      if (recordLen === 0){
          setHistoryRecord([newRecord, newRecord]);
      }
      else{
          setHistoryRecord(current => [...current, newRecord]);
      }
      setRecordLen(recordLen + 1);

      if (recordLen > maxRecordLen){
          RecordOverFlow();
      }
  }


////// store and get value. 
  const storedValUpdate = async () => {
      const inputVal = document.getElementById('inputVal').value;
      setStoredPending(false);
      setStoredDone(false);

      if (inputVal.length === 0) {
          const detail = 'null';
          RecordPush('store', inputVal, detail);
      }
      else {
          setStoredPending(true);
          setStoredVal(inputVal);
          
          try{
              const detail = await storeData(inputVal);   // contract deployed. 
              RecordPush('store', inputVal, detail);      // recorded. 
          }
          catch(err){
              const detail = 'null';                      // no detail info. 
              RecordPush('store', inputVal, detail);      // recorded. 
          }
      }
  }

  const showValUpdate = async () => {
      const ans = await getData();
      setStoredPending(false);
      setStoredDone(false);

      setShowVal(ans);
      RecordPush('get', ans);
  }

  return(
    <div className="App">
        <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home connectWallet={connectWallet}/>}  haveMetamask={haveMetamask} />
              <Route path="/home" element={<Home connectWallet={connectWallet}  haveMetamask={haveMetamask} />}/>
              <Route path="/single" element={<Single/>}/>
              <Route path="*" element={<NotFound/>}/>
          </Routes>
        </BrowserRouter>
    </div>
  )
}

export default App;
