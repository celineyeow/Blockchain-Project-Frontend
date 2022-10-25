import { useEffect, useState } from 'react';
import '../Home.css';

const Home = ({connectWallet, haveMetamask, isConnected, address, networkType, balance, getData}) => {
    const [currValue, setCurrValue] = useState(0);

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
        console.log(address);
        console.log(networkType);
        console.log(balance);
        getCurrentValue();
    }, [isConnected])

    const getCurrentValue = async () => { 
        const ans = await getData();
        setCurrValue(ans);
    }

    return (
        <header className="App-header">
            <h1>Home</h1>
            <button>Connect Wallet</button>
            <button>Create Project</button>
            <p>{currValue}</p>
            {cards.map((card, i) => {
                return <p key={i}>{card.name}</p>
            })}
             {
                haveMetamask ?
                <div>
                    <p>
                        Please log in with&nbsp;
                        <span className = "login-highlight">
                            METAMASK 
                        </span>
                        &nbsp;to proceed. 
                    </p>
                    <a className = "global-link" onClick = {connectWallet}>
                        Click here to connect
                    </a>
                </div>
                :
                <div>
                    <p>
                        No MetaMask detected. 
                        <br></br>
                        Please install&nbsp;
                        <span className = "login-highlight">
                            METAMASK 
                        </span>
                        &nbsp;to your browser to proceed. 
                    </p>
                </div>
            }
        </header>
    );
}

export default Home;