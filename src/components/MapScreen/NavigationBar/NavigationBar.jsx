import React from "react";
import BatchSelector from "./BatchSelector/BatchSelector";
import {Row, Col, Container, Button} from "react-bootstrap";
import Style from './NavigationBar.module.css';

export const NavigationBar = (props) => {
    return (
        <div className={Style.navBar}>
            <Container>
                <Row noGutters>
                    <Col xs={6} className={Style.title}>
                        Delivery Manager <span>v0.1</span>
                    </Col>
                    <Col xs={2} className={Style.print}>
                        <Button
                            onClick={() => {props.print()}}
                            variant={"outline-primary"}>
                            Drukuj
                        </Button>
                    </Col>
                    <Col xs={2} className={Style.select}>
                        <BatchSelector
                            activeBatch={props.activeBatch}
                            setActiveBatch={props.setActiveBatch}
                        />
                    </Col>
                    <Col xs={2} className={Style.logOut}>
                        <Button variant={"outline-warning"}>
                            Wyloguj
                        </Button>
                    </Col>
                </Row>
            </Container>

        </div>
    );
}