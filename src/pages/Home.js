import React, { useEffect, useState } from 'react';
import './Home.css';

// Custom Components
import Fundraisers from '../components/Fundraisers';

// Components
import Modal from 'react-modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {Card, Alert} from "react-bootstrap";
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';

const Home = ({connectWallet, haveMetamask, isConnected, address, networkType, balance, contract}) => {
    const [modalIsOpen, setIsOpen] = useState(false);
    const [projectLen, setProjectLen] = useState(0);
    const [formError, setFromError] = useState("");
    const [showFail, setShowFail] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [showLoading, setShowLoading] = useState(false);
    const [radioValue, setRadioValue] = useState('1');

    const radios = [
        { name: 'Show All', value: '0', variant: 'light'},
        { name: 'Active', value: '1', variant: 'success' },
        { name: 'Unclaimed', value: '2', variant: 'warning' },
        { name: 'Closed', value: '3', variant: 'secondary' },
    ];

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
        setProjectLen(res);
    }

    const StartFund = () => {
        setIsOpen(true);
        setShowFail(false);
        setShowLoading(false);
        setShowLoading(false);
    }

    const closeModal = () => {
        setIsOpen(false);
    }

    const createProject = async (e)=> {
        setShowFail(false);
        setShowSuccess(false);
        setShowLoading(true);
        try{
            e.preventDefault();
            await contract.methods.createNewProject(e.target[0].value, e.target[1].value, e.target[2].value,
                e.target[3].value, e.target[4].value).send({from: address});
            setShowSuccess(true);
            setShowLoading(false);

            setTimeout(function() {
                setIsOpen(false);
                setShowSuccess(false);
              }, 4000);
        }
        catch(err){
            setFromError(err);
            setShowFail(true);
            setShowLoading(false);
        }
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

            <h1 style={{paddingTop: "3rem"}}>Fundraiser</h1>

            <ButtonGroup style={{zIndex: 0}}>
                {radios.map((radio, idx) => (
                <ToggleButton
                    key={idx}
                    id={`radio-${idx}`}
                    type="radio"
                    variant={radio.variant}
                    name="radio"
                    value={radio.value}
                    checked={radioValue === radio.value}
                    onChange={(e) => setRadioValue(e.currentTarget.value)}
                >
                    {radio.name}
                </ToggleButton>
                ))}
            </ButtonGroup>

            <div style={{display: "flex", gap: "20px", textAlign: "left", flexWrap: "wrap", marginTop: "15px"}}>
                {[...Array(parseInt(projectLen)+1)].map((_, i) => {
                    return(
                         <Fundraisers key={i} i={i} contract={contract} address={address} havebutton={true} radioValue={radioValue}/>
                    )
                })}
            </div>
            <div style={{backgroundColor: "#384455"}}>   
            <Modal
                className="FrontModal"
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                ariaHideApp={false}
                contentLabel="Example Modal"
                size="lg"
            >
                <Alert variant={'danger'}  show={showFail}>
                    Error: {formError.message}
                </Alert>
                
                <Alert variant={'success'}  show={showSuccess}>
                    Project Created
                </Alert>

                <Alert variant={'secondary'}  show={showLoading}>
                    Loading...
                </Alert>
                <Form onSubmit={createProject} style={{backgroundColor: "#384455", color: "#ffffff", padding: "40px", height: "100%"}}>
                    <Form.Group className="mb-3" controlId="formBasicName">
                        <Form.Label>Project Name</Form.Label>
                        <Form.Control required placeholder="Enter project name" style={{border: "1px solid white", color: "white", backgroundColor: "#384455"}} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicDesc">
                        <Form.Label>Description</Form.Label>
                        <Form.Control as="textarea" placeholder="Enter description" style={{border: "1px solid white", color: "white", backgroundColor: "#384455"}}/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicBene">
                        <Form.Label>Beneficiary</Form.Label>
                        <Form.Control placeholder="Enter wallet address" style={{border: "1px solid white", color: "white", backgroundColor: "#384455"}}/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicGoal">
                        <Form.Label>Goal Amount</Form.Label>
                        <Form.Control placeholder="Enter goal in Ether" style={{border: "1px solid white", color: "white", backgroundColor: "#384455"}}/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicDur">
                        <Form.Label>Duration</Form.Label>
                        <Form.Control placeholder="Enter duration in seconds" style={{border: "1px solid white", color: "white", backgroundColor: "#384455"}}/>
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </Modal>
            </div> 
            <Card style={{backgroundColor: "#384455", marginTop: "3rem", marginBottom: "1rem"}}>
                <div className="card-header">
                    Status Legend
                </div>
                <Card.Body>
                    <div className="container">
                        <div className="row row-cols-lg-10">
                            <div className="col">
                                <span style={{fontStyle: "oblique"}} className="badge text-bg-success">Active</span>
                                <Card.Text style={{marginTop: "0.5rem"}}>Project is active</Card.Text>
                            </div>
                            <div className="col">
                                <span style={{fontStyle: "oblique"}} className="badge bg-warning text-dark">Unclaimed</span>
                                <Card.Text style={{marginTop: "0.5rem"}}>Project ended but fund not yet claimed by beneficiary</Card.Text>
                            </div>
                            <div className="col">
                                <span style={{fontStyle: "oblique"}} className="badge bg-secondary">Closed</span>
                                <Card.Text style={{marginTop: "0.5rem"}}>Project ended and fund has been claimed</Card.Text>
                            </div>
                        </div>
                    </div>
                </Card.Body>
            </Card>

            {isConnected ?
                <p style={{color: "green", marginTop: "20px"}}>Wallet Connected: {address}</p>
                :
                <a style={{color: "red", marginTop: "20px"}} onClick={connectWallet}>Wallet Not Connected</a>
            }
        </div>
    );
}

export default Home;