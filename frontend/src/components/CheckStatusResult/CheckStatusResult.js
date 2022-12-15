import React, {useEffect} from "react";
import {Button, Card, CardBody, Col, Row} from "reactstrap";

import 'animate.css';
import CheckStatus from "../CheckStatus/CheckStatus";

export default function CheckStatusResult(props) {
    return (
        <div className="animate__animated animate__fadeInUp rounded p-1">
            <Card className="card-check m-1">
                <CardBody>
                    <Row>
                        <Col md="8">
                            <h5><i className='fa fa-user'/> Defender Enabled</h5>
                            <i>Checks if the Windows Defender service is enabled</i>
                        </Col>
                        <Col md="4">
                            <i className="fa fa-check-circle fa-5x text-success"/>
                        </Col>
                    </Row>

                </CardBody>
            </Card>
        </div>
    )
}

