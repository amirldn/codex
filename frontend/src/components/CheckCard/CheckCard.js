import React, {useEffect} from "react";
import {Button, Card, CardBody, Col, Row} from "reactstrap";

import 'animate.css';

export default function CheckCard(props) {
  return (
      <div className="animate__animated animate__fadeInUp rounded p-1">
        <Card className="card-check m-1">
            <CardBody>
              <h5><i className={props.check.icon}/> {props.check.friendly_name}</h5>
                {console.log(props)}
                {/*make text italic*/}
                <i>{props.check.description}</i>
                <p>Status: <b><span className="text-success">Ok</span></b></p>
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
                        <p>{props.check.api_name}</p>
                    </Col>
                </Row>
                <Row>
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

