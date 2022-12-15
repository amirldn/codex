import React, {useEffect} from "react";
import {Button, Card, CardBody, Col, Row} from "reactstrap";

import 'animate.css';

export default function CheckStatus({check, taskId}) {

    const [status, setStatus] = React.useState({});
    // The value of status disappears when the component is changing it seems so cannot perform our conditional here
    const fetchStatus = async () => {
        if (taskId !== '') {
// && (status.task_status !== 'SUCCESS') && (taskId.task_id !== status.task_id)
            const response = await fetch('http://127.0.0.1:8000/check/id/' + taskId.task_id);
            const data = await response.json();
            setStatus(data);
            console.log('refreshing status for' + taskId.task_id);
        }
    }

// If the taskId changes or status.task_status is not SUCCESS then fetch the status

    useEffect(() => {
        const interval = setInterval(() => {
            fetchStatus();
        }, 5000);

        fetchStatus();
        return () => clearInterval(interval);
    }, []);


    // If a taskId is present and a status exists, display the status
    if (taskId !== '' && status.task_status) {
        // console.log("taskID for " + check.api_name + " is " + taskId.task_id)
        return (
            <div>
                <p>Status: <b><span className="text-success">{status.task_status}</span></b></p>
                <p><b>Output:</b>
                    <br/>
                    {/*{console.log(status)}*/}
                    {status.task_result.data.map((item) => (
                        <li key={item.ID}>
                            <b>{item.CheckName}</b>
                            <br/>
                            {item.Message}
                            <br/>
                            {item.State}
                        </li>
                    ))}


                </p>
            </div>

        )
    }


    // TODO: This component should display the status of the check
    //  If the check is running, display a loading spinner
    //  If the check is complete, display the status of the check
    //  If the check errored, display the error message

    // If no task id is provided, display a message to run the check


    // If no status is set
    return (
        <div className="animate__animated animate__fadeInUp rounded pt-1 ">
            <p>Status: <b><span className="text-secondary">Not Run</span></b></p>
        </div>
    )
}

