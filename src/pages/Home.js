import '../Home.css';

const Home = ({connectWallet, haveMetamask}) => {
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

    return (
        <header className="App-header">
            <h1>Home</h1>
            <button>Connect Wallet</button>
            <button>Create Project</button>
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