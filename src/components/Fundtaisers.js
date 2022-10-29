import React from "react";
import { useEffect, useState } from 'react';

import { ProgressBar } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Donate from '../pages/Donate.js';
import Modal from 'react-modal';
//import './fundraisers.css';

const Fundraisers = ({i, contract, address}) => {
    const [currProject, setCurrProject] = useState(null);

    //Project Details
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [currAmount, setCurrAmount] = useState(0);
    const [goalAmount, setGoalAmount] = useState(0);
    const [timeLeft, setTimeLeft] = useState(0);
    const [modalIsOpen, setIsOpen] = useState(false);
    const [claimed, setClaimed] = useState(false);

    const closeModal = () => {
        setIsOpen(false);
    }

    const FundMePage = () => {
        setIsOpen(true);
    }

    const getProject = async () => { 
        const res = await contract.methods.getProjectDetails(i).call();
        console.log(res);
        setCurrProject(res);
    }

    useEffect(() => {
        //console.log(i);
        getProject();
    }, []);

    useEffect(() => {
        if(currProject !== null){
            setName(currProject.name);
            setDescription(currProject.description);
            setCurrAmount(currProject.currentAmt);
            setGoalAmount(currProject.goalAmt);
            setTimeLeft(currProject.timeLeft);
            setClaimed(currProject.claimed);
        }
    }, [currProject]);

  return (
    <div>
        {currProject ===  null ? null :
            claimed ? 
                <Card style={{backgroundColor: "#384455"}}>
                    <Card.Body>
                        <Card.Title>{name+" (Project Claimed!)"}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">Project over</Card.Subtitle>
                        <Card.Text>{description}</Card.Text>
                        <ProgressBar animated style={{marginBottom: "20px"}} now={((currAmount/(10**18))/goalAmount)*100} label={`${(currAmount/goalAmount)*100}%`}/>
                        <Card.Subtitle className="mb-2 text-muted">{currAmount/(10**18)}/{goalAmount/(10**0)}</Card.Subtitle>
                        <Button variant="primary" onClick={FundMePage}>View Details</Button>
                    </Card.Body>
                </Card>
            :
                <Card style={{backgroundColor: "#384455"}}>
                    <Card.Body>
                        <Card.Title>{name}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">{timeLeft} seconds left</Card.Subtitle>
                        <Card.Text>{description}</Card.Text>
                        <ProgressBar animated style={{marginBottom: "20px"}} now={((currAmount/(10**18))/goalAmount)*100} label={`${(currAmount/goalAmount)*100}%`}/>
                        <Card.Subtitle className="mb-2 text-muted">{currAmount/(10**18)}/{goalAmount/(10**0)}</Card.Subtitle>
                        <Button variant="primary" onClick={FundMePage}>Fund Me</Button>
                    </Card.Body>
                </Card>
        }

        <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            ariaHideApp={false}
            contentLabel="Example Modal"
        >
            <Donate
                address={address}
                id={i}
                name={name}
                description={description}
                currAmount={currAmount}
                goalAmount={goalAmount}
                timeLeft={timeLeft}
                contract={contract}
            />
        </Modal>
    </div>
    
);
}

export default Fundraisers;