import React, {useEffect} from "react";
import {Button, Card, CardBody, Col, Row} from "reactstrap";

import 'animate.css';
import CheckStatus from "../CheckStatus/CheckStatus";

export default function CheckCard(props) {
  //  Write a function that will submit a post request to run the check

    const [taskId, setTaskId] = React.useState('');
    function RunCheck(api_name) {
        // Send the data then store the response
        fetch(("http://127.0.0.1:8000/check/run/?check_name="+api_name), {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        })
        .then(response => response.json())
        .then(data => {
            console.log(data)  // Print the data
            setTaskId(data);
        })
      }

  function fetchTaskId() {
  }

  const TaskIDContext = React.createContext({
    taskId: [], fetchTaskId: () => {}
  })


  return (
      <TaskIDContext.Provider value={{taskId, fetchTaskId}}>
          <div className="animate__animated animate__fadeInUp rounded p-1">
            <Card className="card-check m-1">
                <CardBody>
                  <h5><i className={props.check.icon}/> {props.check.friendly_name}</h5>
                    {/*{console.log(props)}*/}
                    <i>{props.check.description}</i>
                    {/*<p>Status: <b><span className="text-success">Ok</span></b></p>*/}
                    <CheckStatus taskId={taskId.taskId}/>
                    <Row>
                        <Col md="6">
                            <p><b>Last Run:</b>
                                <br/>
                                5:45pm @ 11 Dec 2022
                            </p>
                        </Col>
                        <Col md="6">
                            <Button className="btn-round" color="success" outline onClick={() => RunCheck(props.check.api_name)}>
                                <i className="nc-icon nc-check-2"/> Run Check
                            </Button>
                            <p>{props.check.api_name}</p>
                            <p>{taskId.taskId}</p>
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
      </TaskIDContext.Provider>
  )
}

