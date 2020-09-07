import React from 'react';
import AddressMenu from "./components/AddressMenu/AddressMenu";
import Map from "./components/Map/Map";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {Col, Container, Row} from "react-bootstrap";

function App() {
    return (
        <div className="App">
            <Container>
                <Row noGutters>
                    <Col xs={8}>
                        <Map/>
                    </Col>
                    <Col xs={4}>
                        <AddressMenu/>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default App;
