import { useEffect, useState } from 'react';
import '../Home.css';
import DonateCard from '../components/DonateCard.js';
import Modal from 'react-modal';
import Fundraisers from '../components/Fundtaisers';

const Home = ({connectWallet, haveMetamask, isConnected, address, networkType, balance, getData, storeData}) => {
    const [currValue, setCurrValue] = useState(0);
    const [modalIsOpen, setIsOpen] = useState(false);

    const cards = [
        {
            id: 1,
            name: "Cat"
        },
        {
            id: 2,
            name: "Dog",
        },
        {
            id: 3,
            name: "Bat",
        },
    ];

    useEffect(() => {
        if(haveMetamask && !isConnected){
            connectWallet();
        }
    }, [haveMetamask])

    useEffect(() => {
        console.log(address);
        console.log(networkType);
        console.log(balance);
        getCurrentValue();
    }, [isConnected])

    const getCurrentValue = async () => { 
        const ans = await getData();
        setCurrValue(ans);
    }

    const StartFund = () => {
        setIsOpen(true);
        console.log("Start Fund");
        //storeData(20);
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

            <p>{currValue}</p>
            <div style={{display: "flex", gap: "20px", textAlign: "left"}}>
                {cards.map((card, i) => {
                    return(
                        <div style={{width: "33%"}} key={i}>
                            {/*<DonateCard
                                location="Singapore"
                                title={card.name}
                                description="Help support the quality of.."
                            />*/}
                            <Fundraisers/>
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