import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

function DefaultCard(props) {
  return (
    <Card style={{ minWidth: "18rem" }} className={"col-2 p-2"}>
      <Card.Img
        variant="top"
        style={{ height: "22rem", objectFit: "cover" }}
        src={props.cover}
      />
      <Card.Body>
        <Card.Title>{props.title}</Card.Title>
        <Card.Text>{props.desc}</Card.Text>
        <Button variant="primary">See More</Button>
      </Card.Body>
    </Card>
  );
}

export default DefaultCard;
