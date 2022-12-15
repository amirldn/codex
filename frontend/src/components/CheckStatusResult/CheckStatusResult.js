import React, {useState} from "react";
import {Button, Card, CardBody, CardHeader, Col, Collapse, Row} from "reactstrap";

import 'animate.css';

export default function CheckStatusResult(props) {


    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    return (
        <div className="animate__animated animate__fadeInUp rounded p-1">
            <Card className="card-check m-1">
                <CardHeader>

                    <Button className="btn btn-link" data-toggle="collapse" data-target="#collapseOne"
                            aria-expanded="true"
                            aria-controls="collapseOne"
                            onClick={toggle}>
                        <Row>
                            <Col md="8">
                                <Row>
                                    <Col md="10">
                                        <Row>
                                            <Col md="2">
                                                <b><i className='fa fa-user'/></b>
                                            </Col>
                                            <Col md="10">
                                                {/*{console.log(props)}*/}
                                                <b> {props.props.CheckName}</b>
                                            </Col>
                                        </Row>

                                    </Col>
                                    <Col md="2">
                                        <i className="fa fa-chevron-down"/>
                                    </Col>
                                </Row>
                            </Col>
                            <Col md="4">
                                <i className="fa fa-check-circle fa-5x text-success"/>
                            </Col>
                        </Row>
                    </Button>
                </CardHeader>
                <Collapse isOpen={isOpen}>
                    <CardBody>
                        <Row>
                            <i>{props.props.Message}</i>
                        </Row>
                    </CardBody>
                </Collapse>
            </Card>
        </div>
    )
}