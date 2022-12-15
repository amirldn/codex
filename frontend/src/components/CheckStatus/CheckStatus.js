import React, {useEffect} from "react";
import {Button, Card, CardBody, Col, Row} from "reactstrap";

import 'animate.css';

export default function CheckStatus({check, taskId}) {

    const [status, setStatus] = React.useState({});
    const [shouldRefresh, setShouldRefresh] = React.useState(true);


    const fetchStatus = async () => {
        // Check taskId is not empty and the status.task_status is not 'SUCCESS' and taskId is different from the previous taskId


       console.log(taskId)
       if (taskId !== '') {
            if (status.task_status !== 'SUCCESS') {
                setShouldRefresh(true);
            }
            else {
                if (taskId !== status.task_id) {
                    setShouldRefresh(true);
                }
                else {
                    setShouldRefresh(true);
                }
            }
       }
       else {
           console.log('taskId was empty, should not be refreshing')
           setShouldRefresh(false);
       }




        if (shouldRefresh) {
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
            // if (shouldRefresh) {
                fetchStatus();
            // }
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

