import React, {useEffect} from "react";
import {Button, Card, CardBody, Col, Row} from "reactstrap";

import 'animate.css';

export default function CheckStatus(taskId) {

    const [status, setStatus] = React.useState([]);
    // TODO: fix this trying to get the fetch the status if there is no taskId
    let fetchStatus = () => {}
    console.log("hello from checkstatus")
    if (taskId) {
        const fetchStatus = async () => {
            const response = await fetch('http://127.0.0.1:8000/check/id/' + taskId);
            const data = await response.json();
            setStatus(data.data);
            console.log(data.data);
        }
    }
    else {
        const fetchStatus = () => {}
        console.log("no taskId")
    }

    const StatusContext = React.createContext({
        status: [], fetchStatus: () => {
        }
    })

    useEffect(() => {
        fetchStatus();
    }, [taskId])


    // TODO: This component should display the status of the check
    //  If the check is running, display a loading spinner
    //  If the check is complete, display the status of the check
    //  If the check errored, display the error message

    // If no task id is provided, display a message to run the check
    if (taskId === '') {
        return (
            // <StatusContext.Provider value={{status, fetchStatus}}>
                <div className="animate__animated animate__fadeInUp rounded p-1">
                    <Card className="card-check m-1">
                        <CardBody>
                            <h5><i className="nc-icon nc-check-2"/> Check Status</h5>
                            <p>Run the check to see the status</p>
                        </CardBody>
                    </Card>
                </div>
            // {/*</StatusContext.Provider>*/}
        )
    }

    return (
        <StatusContext.Provider value={{status, fetchStatus}}>
            <div className="animate__animated animate__fadeInUp rounded p-1">
                <p>hello from checkstatus</p>
                {status.map((status) => (
                    <Card className="card-check m-1">
                        <CardBody>
                            <i>{console.log(status)}</i>
                            <p>Status: <b><span className="text-success">CheckStatus-Debug</span></b></p>
                        </CardBody>
                    </Card>
                ))}
            </div>
        </StatusContext.Provider>
    )
}

