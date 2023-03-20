import React, {useEffect} from "react";
import {Card, CardBody, CardFooter, CardHeader, CardTitle, Col, Row} from "reactstrap";

import 'animate.css';
import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from 'react-confetti'

export default function DashboardCard({issueCountValue, icon, title, type, subtitle, subtitleIcon}) {

    // TODO: get this animation to work
    function displayAnimatedIssueCountValue() {
        return (<div className='animate__animated animate__headShake'>
                {issueCountValue}
            </div>)

    }

    return (<div>
            <Card className="card-stats">
                <CardBody>
                    <Row>
                        <Col md="4" xs="5">
                            <div className="icon-big text-center icon-warning">
                                <i className={icon}/>
                            </div>
                        </Col>
                        <Col md="8" xs="7">
                            <div className="numbers">
                                <p className="card-category">{title}</p>
                                {displayAnimatedIssueCountValue()}
                                <p/>
                            </div>
                        </Col>
                    </Row>
                </CardBody>
                <CardFooter>
                    <hr/>
                    <div className="stats">
                        <i className={subtitleIcon}/>{subtitle}
                    </div>
                </CardFooter>
            </Card>

        </div>

    )
}

