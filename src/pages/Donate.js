import React, { useState } from "react";
import "./donate.css";

// Components
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import ProgressBar from 'react-bootstrap/ProgressBar'
import {Card, Container} from "react-bootstrap";
import Fundraisers from "../components/Fundraisers";

const Donate = ({address, id, contract, name, description, currAmount, goalAmount, timeLeft}) =>{
    const Donate = async (e) => {
        e.preventDefault();
        console.log(e.target[0].value);
        await contract.methods.donate(id).send({from: address, value: e.target[0].value*10**18});
    }

    const OwnerTransfer = async () => {
        await contract.methods.transferOut(id).send({from: address});
    }

    const DonateValPanel = () => {
        return (
            <Form onSubmit={Donate}>
                <Form.Group className="mb-3" controlId="formBasicAmount">
                    <Form.Label>Enter Donation Amount</Form.Label>
                    <Form.Control placeholder="Enter amount" />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Donate
                </Button>
            </Form>
        )
    }

    const FunctionPanel = () => {
        return (
            <div className = "donate-box">
                {timeLeft < 1 ? null : <DonateValPanel/>}
                <Button style={{marginTop: "1rem", backgroundColor: "#060f1e"}} onClick={OwnerTransfer}>{"Transfer Out (Project Beneficiary)"}</Button>
            </div>
        )
    }

    return (
        <div className = "donate-background">
            <h1 style={{paddingTop: "10rem"}}>Donation Page</h1>
            <Card.Body style={{width: "60%"}}>
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <Fundraisers  i={id} contract={contract} address={address} havebutton={false}/>
                        </div>
                        <div className="col">
                            <FunctionPanel/>
                        </div>
                    </div>
                </div>
            </Card.Body>
        </div>
    )
}

export default Donate;