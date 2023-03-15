import React from "react";
import {
    Button, Card, CardBody, CardFooter, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row
} from "reactstrap";


import 'animate.css';

export default function CheckStatusResolveSteps({props}) {


    // Based on the props, we need to render the steps to resolve the issue
    // Have a pagination bar at the bottom of the card that allows the different steps from the array in props to be displayed
    // The pagination bar should be hidden if there are no steps to resolve

    const [stepView, setStepView] = React.useState(0);

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


    if (props === null) {
        return (<div/>)
    } else {


        return <div className="animate__animated animate__fadeInUp rounded p-1">
            <Card className="card-check m-1">
                <CardHeader>
                    <h5>Steps to Resolve</h5>
                </CardHeader>
                <CardBody>
                    <Row>
                        <Button
                            className="btn btn-link rounded" onClick={() => updateStep(-2)}>
                            Apply Fix
                        </Button>
                        <Col>
                            <Col>
                                <b>Manual Steps</b>
                            </Col>
                            <br/>
                            <Card>
                                <CardBody>
                                    {displayStepContent()}
                                    {displayImage()}
                                </CardBody>
                            </Card>

                        </Col>
                    </Row>

                </CardBody>
                <CardFooter>
                    <Row>
                        <Col className="d-flex justify-content-end">
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
                </CardFooter>
            </Card>
        </div>
    }
}