import React, {useState} from "react";
import {
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Col,
    Collapse,
    Container,
    Pagination,
    PaginationItem,
    PaginationLink,
    Row
} from "reactstrap";

import 'animate.css';

export default function CheckStatusResolveSteps({props}) {


    // Based on the props, we need to render the steps to resolve the issue
    // Have a pagination bar at the bottom of the card that allows the different steps from the array in props to be displayed
    // The pagination bar should be hidden if there are no steps to resolve

    const [stepView, setStepView] = React.useState(0);
    const [stepContent, setStepContent] = React.useState('')


    function updateStep(step) {
        if (step == -2) {
            if (stepView == props.length - 1) {
                console.log(stepView)
                return
            }
            setStepView(stepView + 1)
        } else if (step == -1) {
            if (stepView == 0) {
                console.log(stepView)
                return
            }
            setStepView(stepView - 1)
        } else {
            setStepView(step)
        }
        setStepContent(props[stepView])
        console.log(stepView)
        return;
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
                        <Col>
                            <p><b>Steps</b>
                                <br/>
                                {stepContent}
                            </p>
                        </Col>
                    </Row>

                </CardBody>
                <CardFooter>
                    <Row>
                        <Pagination size={'sm'}>
                            <PaginationItem>
                                <PaginationLink previous tag="button"
                                                onClick={() => updateStep(-1)}>Prev</PaginationLink>
                            </PaginationItem>
                            {props.map((step, index) => {
                                return <PaginationItem>
                                    <PaginationLink tag="button"
                                                    onClick={() => updateStep(index)}>{index + 1}</PaginationLink>
                                </PaginationItem>
                            })}
                            <PaginationItem>
                                <PaginationLink next tag="button" onClick={() => updateStep(-2)}>Next</PaginationLink>
                            </PaginationItem>


                        </Pagination>
                    </Row>
                </CardFooter>
            </Card>
        </div>
    }
}