import React, {useState} from "react";
import {Button, Card, CardBody, CardHeader, Col, Collapse, Container, Row} from "reactstrap";

import 'animate.css';

function DrawStatusIcon(props) {
    if (props.status === 'Ok') {
        return <i className="fa fa-check-circle fa-3x text-success"/>
    } else if (props.status === 'Warn') {
        return <i className="fa fa-exclamation-circle fa-3x text-warning"/>
    } else if (props.status === 'Crit') {
        return <i className="fa fa-times-circle fa-3x text-danger"/>
    }
    return <i className="fa fa-question-circle fa-3x text-info"/>
}

export default function CheckStatusResultError({props}) {


    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    return (
        <div className="animate__animated animate__fadeInUp rounded p-1">
            <Card className="card-check m-1">
                <CardHeader>
                    <Container className="d-flex justify-content-between">
                        <Button className="btn btn-link rounded"
                                onClick={toggle}>
                            <Row>
                                <Col md="1">
                                    <i className="fa fa-question-circle fa-3x text-info"/>
                                </Col>
                                <Col md="10">
                                    <b>Internal Error</b>
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
                                <p><b>Error Detail:</b>
                                    <br/>
                                    {props.detail.fault.brief} | Error Code: {props.detail.fault.code}
                                    <br/>
                                    <br/>
                                    <i>{props.detail.fault.stderr}</i>
                                    <br/>
                                    {props.detail.fault.stdout}

                                </p>
                            </Col>
                        </Row>
                    </CardBody>
                </Collapse>
            </Card>
        </div>
    )
}