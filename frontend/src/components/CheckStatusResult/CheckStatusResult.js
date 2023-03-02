import React, {useState} from "react";
import {Button, Card, CardBody, CardHeader, Col, Collapse, Container, Row} from "reactstrap";
import CheckStatusResolveSteps from "../CheckStatusResultResolveSteps/CheckStatusResolveSteps";

import 'animate.css';

function DrawStatusIcon({status}) {
    if (status === 'Ok') {
        return <i className="fa fa-check-circle fa-3x text-success"/>
    } else if (status === 'Warn') {
        return <i className="fa fa-exclamation-circle fa-3x text-warning"/>
    } else if (status === 'Crit') {
        return <i className="fa fa-times-circle fa-3x text-danger"/>
    }
    return <i className="fa fa-question-circle fa-3x text-info"/>
}

export default function CheckStatusResult({props}) {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    function renderResolveSteps() {
        if (props.ResolveSteps) {
            // Combine props.ResolveSteps with props.ResolveImg
            let resolveProps = {
                resolveSteps: props.ResolveSteps,
                resolveImg: props.ResolveImg
            }
            return (<CheckStatusResolveSteps props={resolveProps}/>)
        }
    }


    return (<div className="animate__animated animate__fadeInUp rounded p-1">
        <Card className="card-check m-1">
            <CardHeader>
                <Container className="d-flex justify-content-between">
                    <Button className="btn btn-link rounded"
                            onClick={toggle}>
                        <Row>
                            <Col md="1">
                                <DrawStatusIcon status={props.State}/>
                            </Col>
                            <Col md="10">
                                <b>{props.CheckName}</b>
                            </Col>
                            <Col md="1">
                                <i className="fa fa-chevron-down"/>
                            </Col>
                        </Row>
                    </Button>
                </Container>
            </CardHeader>
            <Collapse isOpen={isOpen}>
                <CardBody>
                    <Row>
                        <Col>
                            <i>{props.Message}</i>
                        </Col>


                    </Row>
                    <Row>
                        <Col md="12">
                            {renderResolveSteps()}
                        </Col>
                    </Row>
                </CardBody>
            </Collapse>
        </Card>
    </div>)
}