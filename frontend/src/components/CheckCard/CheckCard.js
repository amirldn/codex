import React, {useEffect} from "react";
import {Button, Card, CardBody, Col, Row} from "reactstrap";

import 'animate.css';
import CheckStatus from "../CheckStatus/CheckStatus";

export default function CheckCard(props) {
    const [taskId, setTaskId] = React.useState('');

    function RunCheck(api_name) {
        // console.log("Running check: " + api_name)
        // Send the data then store the response
        fetch(("http://127.0.0.1:8000/check/run/?check_name=" + api_name), {
            method: "POST", headers: {"Content-Type": "application/json"},
        })
            .then(response => response.json())
            .then(data => {
                // console.log(data)  // Print the data
                setTaskId(data);
                // console.log('run_check data: ' + data.task_id)
                // console.log('run_check id: ' + taskId.task_id)
            })
    }


    useEffect(() => {
        // fetchTaskId();
        getLatest(props.check.api_name);
    }, []);


    function getLatest(api_name) {
        // console.log("Getting latest task id for check: " + api_name)
        // Send the data then store the response
        fetch(("http://127.0.0.1:8000/check/id/latest/" + api_name), {
            method: "GET", headers: {"Content-Type": "application/json"},
        })
            .then(response => response.json())
            .then(data => {
                // console.log(data)  // Print the data
                setTaskId(data);
            })
        // console.log('getlatest after async: ' + taskId)
    }



    return(
        <div className="animate__animated animate__fadeInUp rounded p-1">
            <Card className="card-check m-1">
                <CardBody>
                    <h5><i className={props.check.icon}/> {props.check.friendly_name}</h5>
                    <i>{props.check.description}</i>
                    <Row>
                        <Col md="6">
                            <p><b>Last Run:</b>
                                <br/>
                                5:45pm @ 11 Dec 2022
                            </p>
                        </Col>
                        <Col md="6">
                            <Button className="btn-round" color="success" outline
                                    onClick={() => RunCheck(props.check.api_name)}>
                                <i className="nc-icon nc-check-2"/> Run Check
                            </Button>
                        </Col>
                    </Row>
                    <CheckStatus
                        check={props.check}
                        taskId={taskId}
                    />
                </CardBody>
            </Card>
        </div>
    )
}