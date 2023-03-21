import React, {useState} from "react";
import {Button, Card, CardBody, CardHeader, Col, Collapse, Container, Row} from "reactstrap";
import 'animate.css';

export default function CheckStatusResultError({props}) {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    return (
        <div className="animate__animated animate__fadeInUp rounded p-1">
            <Card className="card-check m-1">
                <CardHeader>
                   <Container className="d-flex">
                    <Button className="btn btn-link rounded"
                            onClick={toggle}
                    style={{width: 'inherit'}}>
                           <Row style={{flexWrap: 'nowrap'}}>
                                <Col md="1">
                                    <i className="fa fa-question-circle fa-3x text-info"/>
                                </Col>
                                <Col md="10" style={{textAlign: 'left', paddingLeft: '2rem'}}>
                                        <b style={{verticalAlign: 'middle'}}>Internal Error</b>
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