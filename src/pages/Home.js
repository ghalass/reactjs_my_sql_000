import React from "react";
import { Button, Card } from "react-bootstrap";

function Home() {
  return (
    <div>
      <h6>Welcome To Home page</h6>
      <hr />
      <Card>
        <Card.Header>Featured</Card.Header>
        <Card.Body>
          <Card.Title>Special title treatment</Card.Title>
          <Card.Text>
            With supporting text below as a natural lead-in to additional
            content.
          </Card.Text>
          <Button variant="primary">Go somewhere</Button>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Home;
