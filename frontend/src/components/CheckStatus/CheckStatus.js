import React, {useEffect} from "react";
import {Button, Card, CardBody, Col, Container, Row} from "reactstrap";

import 'animate.css';
import CheckStatusResult from "../CheckStatusResult/CheckStatusResult";
import CheckStatusResultError from "../CheckStatusResultError/CheckStatusResultError";


export default function CheckStatus({check, taskId, updateLastRan, instanceHasBeenRan, setSomethingChanged}) {

    // console.log('checkstatus called for ' + check.api_name + ' with: ' + taskId.task_id)

    function GetOverallStatus({results}) {
        let overallStatus = 'Ok'
        let textColour = 'text-success'
        for (let i = 0; i < results.length; i++) {
            if (results[i].State === 'Crit') {
                overallStatus = 'Critical'
                textColour = 'text-danger'
                break
            } else if (results[i].State === 'Warn') {
                overallStatus = 'Warning'
                textColour = 'text-warning'
            }
        }
        return (<div>
            <i className={`fa fa-circle ${textColour}`}/>
            <span className={`statusbar-button-container ${textColour}`}>    {overallStatus}</span>
        </div>)
    }

    const [shouldRefresh, setShouldRefresh] = React.useState(false);

    const [status, setStatus] = React.useState('');

    const fetchStatus = async () => {
        if (taskId !== '') {
            // console.log('fetching status for ' + check.api_name + ' with: ' + taskId.task_id)

            const response = await fetch('http://127.0.0.1:8000/check/id/' + taskId.task_id);
            const data = await response.json();
            setStatus(data);
            if (data.task_status === 'PENDING' || status === '') {
                setShouldRefresh(true);
            } else {
                setShouldRefresh(false);
                setSomethingChanged(Math.random())
            }
        }
    }

    useEffect(() => {
        const interval = setInterval(() => {
            if (shouldRefresh) {
                fetchStatus();
            }
        }, 1000);
        fetchStatus()
        return () => clearInterval(interval);
    }, [shouldRefresh, taskId]);

    // If a taskId is present and a status exists, display the status
    if (taskId !== '' && status.task_status) {
        // console.log('status for ' + check.api_name + ' is: ' + status.task_status + ' with: ' + taskId.task_id + ' and instanceHasBeenRan: ' + instanceHasBeenRan)
        if (status.task_status === 'PENDING' && instanceHasBeenRan === false) {
            return (<div>
                <p>
                    Status:
                    <br/>
                    <b>
                        <i className={`fa fa-circle text-disabled`}/>
                        <span
                            className="text-disabled animate__animated animate__pulse">     Not Ran</span>
                    </b>
                </p>
            </div>)
        } else if (status.task_status === 'PENDING' && instanceHasBeenRan === true) {
            return (<div>
                <p>
                    Status:
                    <br/>
                    <b>
                        {/*Add a spinner icon*/}

                        <i className="fa fa-spinner fa-spin fa-1x fa-fw"/>
                        <span
                            className="text-info animate__animated animate__pulse">   Running...</span>
                    </b>
                </p>
            </div>)
        }
        if (status.task_status === 'SUCCESS') {
            updateLastRan(status.date_done)
            return (<div>
                <p>
                    Status:
                    <br/>
                    <b>
                        <span className="text-success animate__animated animate__pulse">
                            <GetOverallStatus results={status.task_result.data}/>
                        </span>
                    </b>
                </p>
                <p><b>Result:</b></p>
                <br/>
                <Container style={{overflow: 'scroll', maxHeight: '530px'}}>
                    {status.task_result.data.map((item) => (<CheckStatusResult props={item} key={item.ID}/>))}
                </Container>

                {/*{console.log(status)}*/}
            </div>)
        }
    }

    // If there was an error
    if (taskId !== '' && status.detail) {
        updateLastRan('N/A')
        return (<div>
                <p>Status: <br/>
                    <b>
                        <i className={"fa fa-exclamation-triangle fa-1x fa-fw"} style={{color: '#fbc658'}}/>
                        <span
                            className="text-danger animate__animated animate__pulse">Unknown - Internal Error
                        </span>
                    </b>
                </p>
                <CheckStatusResultError props={status}/>

            </div>

        )
    }


    // If no status is set
    return (<div>
        <p>
            Status:
            <br/>
            <b>
                <i className={`fa fa-circle text-disabled`}/>
                <span
                    className="text-disabled animate__animated animate__pulse">     Not Ran</span>
            </b>
        </p>
    </div>)
}

