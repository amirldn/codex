import React, {useEffect} from "react";
import {Button, Card, CardBody, Col, Row} from "reactstrap";

import 'animate.css';
import CheckStatus from "../CheckStatus/CheckStatus";

export default function CheckCard(props) {
    const [taskId, setTaskId] = React.useState('');

    function RunCheck(api_name) {
        console.log("Running check: " + api_name)
        // Send the data then store the response
        fetch(("http://127.0.0.1:8000/check/run/?check_name=" + api_name), {
            method: "POST", headers: {"Content-Type": "application/json"},
        })
            .then(response => response.json())
            .then(data => {
                // console.log(data)  // Print the data
                setTaskId(data);
                console.log('run_check data: ' + data.task_id)
                console.log('run_check id: ' + taskId.task_id)
            })
    }
    //
    // function fetchTaskId() {
    //
    // }

    // TODO: make this only run on creation of the component
    useEffect(() => {
        // fetchTaskId();
        getLatest(props.check.api_name);
    }, []);



    // const TaskIDContext = React.createContext({
    //     taskId: '', fetchTaskId: () => {
    //     }
    // })

    // TODO: On creation of the component, fetch the latest task id for the check
    // TODO: Maybe delete TaskIDContext - don't think it's needed

    function getLatest(api_name) {
        console.log("Getting latest task id for check: " + api_name)
        // Send the data then store the response
        fetch(("http://127.0.0.1:8000/check/id/latest/" + api_name), {
            method: "GET", headers: {"Content-Type": "application/json"},
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)  // Print the data
                setTaskId(data);
            })
        // console.log('getlatest after async: ' + taskId)
    }

    function displayCheckStatus() {
        // if (taskId !== '') {
            return (<CheckStatus
                check={props.check}
                taskId={taskId}
            />)
        // }
    }


    return(
    // return (<TaskIDContext.Provider value={{taskId, fetchTaskId}}>
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
                    {/*{displayCheckStatus()}*/}
                </CardBody>
            </Card>
        </div>
    // </TaskIDContext.Provider>);
    )
}