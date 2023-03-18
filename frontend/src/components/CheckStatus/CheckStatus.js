import React, {useEffect} from "react";
import {Button, Card, CardBody, Col, Row} from "reactstrap";

import 'animate.css';
import CheckStatusResult from "../CheckStatusResult/CheckStatusResult";
import CheckStatusResultError from "../CheckStatusResultError/CheckStatusResultError";


export default function CheckStatus({check, taskId, updateLastRan, instanceHasBeenRan}) {

    console.log('checkstatus called for ' + check.api_name + ' with: ' + taskId.task_id)

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
        return (<span className={`statusbar-button-container ${textColour}`}>{overallStatus}</span>)
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
        if (status.task_status === 'PENDING' && instanceHasBeenRan === false) {
            return (<div>
                <p>
                    Status:
                    <br/>
                    <b>
                        <span
                            className="text-disabled animate__animated animate__pulse">Not Ran</span>
                    </b>
                </p>
            </div>)
        }
        else if (status.task_status === 'PENDING' && instanceHasBeenRan === true) {
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
                {status.task_result.data.map((item) => (<CheckStatusResult props={item} key={item.ID}/>))}
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
                        <span
                            className="text-danger animate__animated animate__pulse">Unknown - Internal Error
                        </span>
                    </b>
                </p>
                <CheckStatusResultError props={status}/>

            </div>

        )
    }


    // TODO: This component should display the status of the check
    //  If the check is running, display a loading spinner
    //  If the check is complete, display the status of the check
    //  If the check errored, display the error message

    // If no task id is provided, display a message to run the check


    // If no status is set
    return (<div className="animate__animated animate__fadeInUp rounded pt-1 ">
        <p>Status: <b><span className="text-secondary">Not Run</span></b></p>
    </div>)
}

