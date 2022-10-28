import { useState } from "react";

import "./donate.css";

// Custom Components
import ProgressBar from "../components/ProgressBar";

// Components
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const Donate = ({address, id, contract, name, description, currAmount, goalAmount, timeLeft}) =>{
    const [completed, setCompleted] = useState(100, 100);

    const FunctionIntro = () => {
        return (
            <div className = "donate-intro">
                <p>
                    {name}
                    <br/>
                    {description}
                    <br/>
                    Progress Bar
                </p>
            </div>
        )
    }

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
                <DonateValPanel/>
                <br/>
                <ProgressBar bgcolor={"#6a1b9a"} completed={completed} />
                <br/>
                <Button onClick={OwnerTransfer}>{"Transfer Out (Project Owner)"}</Button>
            </div>
        )
    }

    return (
        <div className = "donate-background">
            <h1>Donation Page</h1>
            <div className = "donate">
                <FunctionIntro/>
                <div className = "donate-vertLine">
                    <p>&nbsp;<br/>&nbsp;<br/>&nbsp;<br/>&nbsp;<br/>&nbsp;<br/>&nbsp;</p>
                </div>
                <FunctionPanel/>
            </div>
        </div>
    )
}

export default Donate;