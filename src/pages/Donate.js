import React from "react";
import "./donate.css";

// Components
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {Card} from "react-bootstrap";
import Fundraisers from "../components/Fundraisers";

const Donate = ({address, id, contract, timeLeft, beneficiary, claimed}) =>{
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

    const cardState = () => {
        if (timeLeft < 1) {
            if (claimed) {
                return '3';
            }
            return '2';
        }
        return '1';
    }

    const FunctionPanel = () => {
        return (
            <div className = "donate-box">
                {timeLeft < 1 ? null : <DonateValPanel/>}
                {cardState() === '2'?
                <Button style={{marginTop: "1rem", backgroundColor: "#060f1e"}} onClick={OwnerTransfer}>{"Transfer Out (Project Beneficiary Only)"}</Button>
                :null}
                <p style={{fontSize: "18px", paddingBottom: "0px", marginBottom: "0px", marginTop: "10px"}}>Beneficiary: </p>
                <a href={"https://goerli.etherscan.io/address/"+beneficiary}  target="_blank" style={{fontSize: "18px"}}>{beneficiary}</a>
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
                            <Fundraisers  i={id} contract={contract} address={address} havebutton={false} radioValue='0'/>
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