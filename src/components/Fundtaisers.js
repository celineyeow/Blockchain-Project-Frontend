import React from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
//import './fundraisers.css';

function Fundraisers() {
  return (
    <Card style={{backgroundColor: "#384455"}}>
    <Card.Body>
        <Card.Title>Support the children of U...</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">Mbale, Uganda</Card.Subtitle>
        <Card.Text>
        Help improve the quality of life for children who live on the streets in Mbale, and support their return to family and community. 
        </Card.Text>
        <Button variant="primary">Fund Me</Button>
    </Card.Body>
    </Card>
);
}

export default Fundraisers;