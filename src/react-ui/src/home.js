import React, { Component } from 'react';
import {Button, Jumbotron, Card, Row, Container, Image} from "react-bootstrap";
import './styles/home.css';
import doc_analysis from "./assets/logo/doc_analysis.png";
import statistic from "./assets/logo/statistic.png";

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showInfo: false
        };
        this.toggle = this.toggle.bind(this);
    }

    toggle() {
    this.setState(oldState => ({ showInfo: !oldState.showInfo }));
  }
  render() {
    return (
        <div className="App-home">
            <Container className="card-wrapper">
                <Row>
                    <Card className="analysis_card">

                        <Card.Img src={doc_analysis} className="analysis_img"/>
                        <Card.Body>
                            <Card.Title>Dokument Analysieren</Card.Title>
                            <Button variant="primary">Go somewhere</Button>
                        </Card.Body>
                    </Card>
                    <Card className="statistic_card">
                        <Card.Img src={statistic}  className="statistic_img"/>
                        <Card.Body>
                            <Card.Title>Statistiken</Card.Title>
                            <Button variant="primary">Go somewhere</Button>
                        </Card.Body>
                    </Card>
                </Row>
            </Container>

            <Jumbotron>
                <h1>Hello, world!</h1>
  <p>
    This is a simple hero unit, a simple jumbotron-style component for calling
    extra attention to featured content or information.
  </p>
  <p>
    <Button variant="primary" id='app-info' onClick={this.toggle}>Learn more</Button>
  </p>
</Jumbotron>
        </div>
    );
  }
}

export default Home;