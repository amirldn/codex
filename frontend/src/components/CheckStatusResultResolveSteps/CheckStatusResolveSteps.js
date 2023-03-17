import React, {useEffect} from "react";
import {
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Col,
    Pagination,
    PaginationItem,
    PaginationLink,
    Row,
    UncontrolledTooltip
} from "reactstrap";


import 'animate.css';
import CheckStatusResult from "../CheckStatusResult/CheckStatusResult";
import CheckStatusResultError from "../CheckStatusResultError/CheckStatusResultError";

function FixStatus({fixName, taskId}) {
    const [shouldRefresh, setShouldRefresh] = React.useState(false);
    const [status, setStatus] = React.useState('');

    const fetchStatus = async () => {
        if (taskId !== '' && (taskId.hasOwnProperty('task_id'))) {
            // console.log(taskId.hasOwnProperty('task_id'))
            // console.log(taskId)
            // console.log('fetching status for ' + fixName + ' with: ' + taskId.task_id)
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

    if (taskId.hasOwnProperty('detail')) {
        // console.log('taskId returned an error')
        return (<div>
                <p><b>Fix Status:</b> <br/>
                    <b>
                        <span
                            className="text-danger animate__animated animate__pulse">
                            Unknown - Internal Error
                        </span>
                    </b>
                    <br/>
                    Please try the manual steps below
                </p>

            </div>

        )
    }


    if (status.task_status === 'PENDING') {
        return (<div>
            <p>
                <b>Fix Status:</b>
                <br/>
                <b><span className="text-info animate__animated animate__pulse">{status.task_status}</span>
                </b>
            </p>
        </div>)
    }

    function displayResult(result) {
        // console.log('display result')
        // console.log(result)
        if (result.State === "Crit") {
            return (<div>
                <p>
                    <b>
                        <span
                            className="text-danger animate__animated animate__pulse">
                            Error - {result.Message}
                        </span>
                    </b>
                    <br/>
                    Please try the manual steps below instead.
                </p>
                <br/>
            </div>)
        }
        if (result.State === "Ok") {
            return (<div>

                <b>
                        <span
                            className="text-success animate__animated animate__pulse">
                            Success - {result.Message}
                        </span>
                </b>
                <br/>
                Please refresh the check above.
                <br/>
                <br/>
            </div>)

        }
    }

    if (status.task_status === 'SUCCESS') {
        return (<div>
            <b>Fix Results:</b>
            {status.task_result.data.map((item) => (displayResult(item)))}
        </div>)
    }


    return null;
}

export default function CheckStatusResolveSteps({props}) {


    // Based on the props, we need to render the steps to resolve the issue
    // Have a pagination bar at the bottom of the card that allows the different steps from the array in props to be displayed
    // The pagination bar should be hidden if there are no steps to resolve

    const [stepView, setStepView] = React.useState(0);
    const [taskId, setTaskId] = React.useState('');
    const [fixApplied, setFixApplied] = React.useState(false);
    // console.log(props)

    function updateStep(step) {
        if (step === -2) {
            if (stepView === props.resolveSteps.length - 1) {
                return
            }
            setStepView(stepView + 1)
        } else if (step === -1) {
            if (stepView === 0) {
                return
            }
            setStepView(stepView - 1)
        } else {
            setStepView(step)
        }
        return;
    }

    function displayImage() {
        if (props.resolveImg[stepView]) {
            let imgDir = 'https://i.imgur.com/' + props.resolveImg[stepView]
            return (<div className="image"
                         style={{
                             height: '100%',
                             display: 'flex',
                             alignItems: 'center',
                             justifyContent: 'center',
                             maxWidth: '40rem',
                             paddingBottom: '4rem'
                         }}>
                <img src={imgDir} alt='' style={{maxHeight: '100%', maxWidth: '100%'}}/>
            </div>);
        }
    }

    function displayStepContent() {
        if (props.resolveSteps[stepView]) {
            return (<div className="">
                <p>{props.resolveSteps[stepView]}</p>
            </div>)
        }
    }

    function runFix(fix_name) {
        // Send the data then store the response
        // console.log('runFix ran with fix_name: ' + fix_name)
        setFixApplied(true)
        fetch(("http://127.0.0.1:8000/check/fix/?fix_name=" + fix_name), {
            method: "POST", headers: {"Content-Type": "application/json"},
        })
            .then(response => response.json())
            .then(data => {
                setTaskId(data);
            })
    }

    function displayAutomatedFix() {
        if (props.fixName) {
            if (fixApplied) {
                return (<Row style={{'paddingLeft': 'inherit'}}>
                    <Col>
                        <Row style={{'marginLeft': 'auto'}}>
                            <b>Automated Fix</b>
                        </Row>
                        <Row className='pl-1'>
                            {/*Make a tooltip around the button*/}

                            <Button id='fixAppliedButton' className="btn-round" color="success" outline
                            >
                                <i className="nc-icon nc-check-2"/> Fix Applied
                            </Button>
                            <UncontrolledTooltip placement="right" target='fixAppliedButton'>
                                The fix has already been applied.
                            </UncontrolledTooltip>
                        </Row>
                        <Row>
                            <FixStatus
                                fixName={props.fixName}
                                taskId={taskId}/>
                        </Row>
                    </Col>
                </Row>)
            }
            return (<Row style={{'paddingLeft': 'inherit'}}>
                <Col>
                    <Row style={{'marginLeft': 'auto'}}>
                        <b>Automated Fix</b>
                    </Row>
                    <Row className='pl-1'>
                        <UncontrolledTooltip placement="right" target='applyFixButton'>
                            Codex can try to automatically resolve the issue. Click to run.
                        </UncontrolledTooltip>
                        <Button className="btn-round" color="info" outline id='applyFixButton'
                                onClick={() => runFix(props.fixName)}>
                            <i className="nc-icon nc-check-2"/> Apply Fix
                        </Button>

                    </Row>
                </Col>
            </Row>)
        } else {
            return (<Row style={{'paddingLeft': 'inherit'}}>
                <Col>
                    <Row style={{'marginLeft': 'auto'}}>
                        <b>Automated Fix</b>
                    </Row>
                    <Row className='pl-1'>
                        <UncontrolledTooltip placement="right" target='noFixAvaliable'>
                            Codex does not have an automated fix for this issue. Please try the manual steps.
                        </UncontrolledTooltip>
                        <Button className="btn-round" color="disabled" outline id='noFixAvaliable'
                        >
                            None Available
                        </Button>
                    </Row>
                </Col>
            </Row>)
        }
    }

    // Conditional Rendering
    if (props === null) {
        return (<div/>)
    } else {


        return <div className="animate__animated animate__fadeInUp rounded p-1">
            <Card className="card-check m-1">
                <CardHeader>
                    <h5>Steps to Resolve</h5>
                </CardHeader>
                <CardBody>
                    {displayAutomatedFix()}
                    <Row>
                        <Col>

                            <Col>
                                <b>Manual Steps</b>
                            </Col>
                            <br/>
                            <Row>
                                <Col className="d-flex justify-content-start">
                                    <Pagination size={'sm'}>
                                        {/*TODO: Grey out if at its last step*/}
                                        <PaginationItem>
                                            <PaginationLink previous tag="button"
                                                            onClick={() => updateStep(-1)}>Prev</PaginationLink>
                                        </PaginationItem>

                                        {props.resolveSteps.map((step, index) => {
                                            return <PaginationItem key={props.resolveSteps[index]}>
                                                <PaginationLink tag="button"
                                                                onClick={() => updateStep(index)}>{index + 1}</PaginationLink>
                                            </PaginationItem>
                                        })}
                                        <PaginationItem>
                                            <PaginationLink next tag="button"
                                                            onClick={() => updateStep(-2)}>Next</PaginationLink>
                                        </PaginationItem>


                                    </Pagination>
                                </Col>

                            </Row>
                            <Card>
                                <CardHeader>
                                    <b>Step {stepView + 1}</b>
                                </CardHeader>
                                <CardBody>
                                    {displayStepContent()}
                                    {displayImage()}
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>

                </CardBody>

            </Card>
        </div>
    }
}