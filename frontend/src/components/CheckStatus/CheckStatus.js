import React, {useEffect} from "react";
import {Button, Card, CardBody, Col, Row} from "reactstrap";

import 'animate.css';

export default function CheckStatus({check, taskId}) {

    const [status, setStatus] = React.useState({});


    const fetchStatus = async () => {
        if (taskId !== '') {
            const response = await fetch('http://127.0.0.1:8000/check/id/' + taskId.task_id);
            const data = await response.json();
            setStatus(data);
            console.log(data);
        } else {
            console.log("being asked to fetch but there is no taskId")
        }
    }

    useEffect(() => {
        const interval = setInterval(() => {
            fetchStatus();
        }, 1000);
        fetchStatus();
        return () => clearInterval(interval);
    }, []);


    // If a taskId is present, fetch and set the status
    if (taskId !== '') {
        console.log("taskID for " + check.api_name + " is " + taskId.task_id)
        return (
            <div>
                <p>Status: <b><span className="text-success">Ran</span></b></p>
                <p><b>Message:</b>
                    <br/>
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

