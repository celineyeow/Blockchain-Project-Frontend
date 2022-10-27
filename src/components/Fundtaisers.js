import { doesNotMatch } from "assert";
import React from "react";
import { useEffect, useState } from 'react';
import { ProgressBar } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
//import './fundraisers.css';

const Fundraisers = ({i, contract}) => {
    const [currProject, setCurrProject] = useState(null);

    //Project Details
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [currAmount, setCurrAmount] = useState(0);
    const [goalAmount, setGoalAmount] = useState(0);
    const [timeLeft, setTimeLeft] = useState(0);

    const FundMePage = () => {
        console.log("Move");
        window.location.href = '/donate';
    }

    const getProject = async () => { 
        const res = await contract.methods.getProjectDetails(2).call();
        setCurrProject(res);
    }

    useEffect(() => {
        console.log(i);
        getProject();
    }, []);

    useEffect(() => {
        if(currProject !== null){
            console.log(currProject);
            setName(currProject.name);
            setDescription(currProject.description);
            setCurrAmount(currProject.currentAmt);
            setGoalAmount(currProject.goalAmt);
            setTimeLeft(currProject.timeLeft);
        }
    }, [currProject]);

  return (
    <div>
        {currProject ===  null ? null :
        <Card style={{backgroundColor: "#384455"}}>
            <Card.Body>
                <Card.Title>{name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{timeLeft} seconds left</Card.Subtitle>
                <Card.Text>{description}</Card.Text>
                <ProgressBar style={{marginBottom: "20px"}}/>
                <Card.Subtitle className="mb-2 text-muted">{currAmount}/{goalAmount}</Card.Subtitle>
                <Button variant="primary" onClick={FundMePage}>Fund Me</Button>
            </Card.Body>
        </Card>}
    </div>
    
);
}

export default Fundraisers;