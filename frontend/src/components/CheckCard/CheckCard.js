import React, {useEffect} from "react";
import {Button, Card, CardBody, Col, Row} from "reactstrap";

import 'animate.css';

export default function CheckCard(props) {
  return (
      <div className="animate__animated animate__fadeInUp rounded p-1">
        <Card className="card-check m-1">
            <CardBody>
              <h5>Guest Account</h5>
                <p>Check if the guest account is enabled</p>
                <p>Latest : <span className="text-success">Pass</span></p>
                <Row>
                    <Col md="6">
                        <p><b>Last Run:</b>
                            <br/>
                            5:45pm @ 11 Dec 2022
                        </p>
                    </Col>
                    <Col md="6">
                        <Button className="btn-round" color="success" outline>
                            <i className="nc-icon nc-check-2"/> Run Check
                        </Button>
                    </Col>
                </Row>
                <Row>
                {/*    Add a large rounded refresh button*/}
                    <Col md="6">
                        <Button className="btn-round" color="info" outline>
                            <i className="nc-icon nc-refresh-69"/> Refresh
                        </Button>
                    </Col>
                </Row>

            </CardBody>
        </Card>
        {/*<div className="rounded bg-secondary text-white">*/}
        {/*  <p>hello</p>*/}
        {/*</div>*/}
      </div>
  )
}

