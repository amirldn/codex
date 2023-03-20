import React, {useEffect} from "react";
import {Button, Card, CardBody, Col, Row} from "reactstrap";

import 'animate.css';
import CheckStatus from "../CheckStatus/CheckStatus";

export default function CheckCard(props) {
    const [taskId, setTaskId] = React.useState('');
    const [lastRun, setLastRun] = React.useState('N/A');
    const [instanceHasBeenRan, setInstanceHasBeenRan] = React.useState(false);

    function runCheck(api_name) {
        // Send the data then store the response
        fetch(("http://127.0.0.1:8000/check/run/?check_name=" + api_name), {
            method: "POST", headers: {"Content-Type": "application/json"},
        })
            .then(response => response.json())
            .then(data => {
                setTaskId(data);
            }).then(() => {
            setInstanceHasBeenRan(true);
        }).then(
            props.setSomethingChanged(Math.random())
        )

    }


    // When runAll is clicked, get latest taskIds
    useEffect(() => {
        getLatest(props.check.api_name);
        setInstanceHasBeenRan(true);
    }, [props.taskIdFromRunAll]);

    // On first run, get latest taskIds
    useEffect(() => {
        getLatest(props.check.api_name);
    }, []);


    function getLatest(api_name) {
        fetch(("http://127.0.0.1:8000/check/id/latest/" + api_name), {
            method: "GET", headers: {"Content-Type": "application/json"},
        })
            .then(response => response.json())
            .then(data => {
                setTaskId(data);
            })
    }

    function updateLastRan(date) {
        let formattedDate;
        if (date === '') {
            formattedDate = 'N/A'
        } else if (date === 'N/A') {
            formattedDate = 'N/A'
        } else {
            const jsDate = new Date(date);
            formattedDate = jsDate.toLocaleString('en-GB', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                second: 'numeric',
                hour12: false
            });
            formattedDate = formattedDate.replace(',', ' @');
        }
        setLastRun(formattedDate);
    }


    return (<div className="animate__animated animate__fadeInUp rounded p-1">
        <Card className="card-check m-1">
            <CardBody>
                <h5><i className={props.check.icon}/> {props.check.friendly_name}</h5>
                <i>{props.check.description}</i>
                <Row>
                    <Col md="6">
                        <p><b>Last Run:</b>
                            <br/>
                            <i>{lastRun}</i>
                        </p>
                    </Col>
                    <Col md="6">
                        <Button className="btn-round" color="success" outline
                                onClick={() => runCheck(props.check.api_name)}>
                            <i className="nc-icon nc-check-2"/> Run Check
                        </Button>
                    </Col>
                </Row>
                {/*{console.log("original taskId: " + taskId.task_id + " " + instanceHasBeenRan + " " + props.check.api_name + " new taskID: " + props.taskIdFromRunAll)}*/}
                <CheckStatus
                    check={props.check}
                    taskId={taskId}
                    updateLastRan={updateLastRan}
                    instanceHasBeenRan={instanceHasBeenRan}
                    setSomethingChanged={props.setSomethingChanged}
                />
            </CardBody>
        </Card>
    </div>)
}