import React, {useEffect, useState} from "react";
import {Card, CardBody, CardFooter, CardHeader, CardTitle, Col, Row} from "reactstrap";
import "animate.css";
import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";

export default function DashboardCard({
                                          issueCountValue, icon, title, type, subtitle, subtitleIcon,
                                      }) {
    const [animationKey, setAnimationKey] = useState(0);

    function displayAnimatedIssueCountValue() {
        return (<div
            key={issueCountValue[0]}
            className="animate__animated animate__headShake"
            onAnimationEnd={() => setAnimationKey(animationKey + 1)}
        >
            {issueCountValue[1]}
        </div>);
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
    </div>)
}

