import React, { useEffect, useState } from 'react';
import './Home.css';

// Custom Components
import Fundraisers from '../components/Fundraisers';

// Components
import Modal from 'react-modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {Card, ProgressBar} from "react-bootstrap";

const Home = ({connectWallet, haveMetamask, isConnected, address, networkType, balance, contract}) => {
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
        setProjectLen(res);
    }

    const StartFund = () => {
        setIsOpen(true);
    }

    const closeModal = () => {
        setIsOpen(false);
    }

    const createProject = async (e)=> {
        e.preventDefault();
        await contract.methods.createNewProject(e.target[0].value, e.target[1].value, e.target[2].value,
            e.target[3].value, e.target[4].value).send({from: address});
        console.log("Project Created");
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

            <p>{parseInt(projectLen)+1} Projects</p>

            <div style={{display: "flex", gap: "20px", textAlign: "left", flexWrap: "wrap"}}>
                {[...Array(parseInt(projectLen)+1)].map((_, i) => {
                    return(
                        <div style={{width: "32%"}} key={i}>
                            <Fundraisers  i={i} contract={contract} address={address} havebutton={true}/>
                        </div>
                    )
                })}
            </div>

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                ariaHideApp={false}
                contentLabel="Example Modal"
            >
                <Form onSubmit={createProject}>
                    <Form.Group className="mb-3" controlId="formBasicName">
                        <Form.Label>Project Name</Form.Label>
                        <Form.Control placeholder="Enter project name" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicDesc">
                        <Form.Label>Description</Form.Label>
                        <Form.Control as="textarea" placeholder="Enter description" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicBene">
                        <Form.Label>Beneficiary</Form.Label>
                        <Form.Control placeholder="Enter wallet address" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicGoal">
                        <Form.Label>Goal Amount</Form.Label>
                        <Form.Control placeholder="Enter goal in Ether" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicDur">
                        <Form.Label>Duration</Form.Label>
                        <Form.Control placeholder="Enter duration in seconds" />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </Modal>
            <Card style={{backgroundColor: "#384465", marginTop: "3rem", marginBottom: "1rem"}}>
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