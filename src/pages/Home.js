import { useEffect, useState } from 'react';
import './Home.css';
import DonateCard from '../components/DonateCard.js';
import Modal from 'react-modal';
import Fundraisers from '../components/Fundtaisers';

const Home = ({connectWallet, haveMetamask, isConnected, address, networkType, balance, contract}) => {
    const [currValue, setCurrValue] = useState(0);
    const [modalIsOpen, setIsOpen] = useState(false);
    const [projectLen, setProjectLen] = useState(0);

    useEffect(() => {
        if(haveMetamask && !isConnected){
            connectWallet();
        }
    }, [haveMetamask])

    useEffect(() => {
        getProjectLen();
    }, []);

    const getProjectLen = async () => { 
        const res = await contract.methods.getLastUsedProjectId().call();
        setProjectLen(res+1);
        console.log(projectLen);
    }

    const StartFund = () => {
        setIsOpen(true);
        console.log("Start Fund");
    }

    const closeModal = () => {
        setIsOpen(false);
    }

    return (
        <div className="theme">
            <div className="header-comp">
                <div className="fund-me">
                    <h2>Fundme</h2>
                </div>
                <div className="start-fund">
                    <button className="start-fund-button" onClick={StartFund}>
                        Start a Fundraiser
                    </button>
                </div>
            </div>

            <h1>Fundraiser</h1>

            <div style={{display: "flex", gap: "20px", textAlign: "left", flexWrap: "wrap"}}>
                {[...Array(projectLen)].map((_, i) => {
                    return(
                        <div style={{width: "30%"}} key={i}>
                            <Fundraisers  i={i} contract={contract}/>
                        </div>
                    )
                })}
            </div>

            {isConnected ? 
            <p style={{color: "green"}}>Wallet Connected: {address}</p>
            :
            <a style={{color: "red"}} onClick={connectWallet}>Wallet Not Connected</a>
            }

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                ariaHideApp={false}
                contentLabel="Example Modal"
            >
                <p>abc</p>
                <p>abc</p>
                <p>abc</p>
            </Modal>
        </div>
    );
}

export default Home;