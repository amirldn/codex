import React, {useEffect} from "react";
import {Card, CardBody, CardFooter, CardHeader, CardTitle, Col, Row} from "reactstrap";

import 'animate.css';
import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from 'react-confetti'


export default function SystemHealthDash(props) {


    const {width, height} = useWindowSize();
    let status = "Ok";


    // Issue Count
    const [issueCount, setIssueCount] = React.useState([]);

    function fetchIssueCount() {
        fetch('http://127.0.0.1:8000/check/list/latest/issuetotal')
            .then(response => response.json())
            .then(data => setIssueCount(data.data));
    }

    useEffect(() => {
        fetchIssueCount();
    }, []);


    function displayIssueIcon(type) {
        if (type === 'Warn') {
            return (<Col md="2"><h1 style={{textAlign: "center"}}><i
                className="fa fa-exclamation-circle fa-2x text-warning"/></h1></Col>)
        }
        if (type === 'Crit') {
            return (
                <Col md="2"><h1 style={{textAlign: "center"}}><i className="fa fa-times-circle fa-2x text-danger"/></h1>
                </Col>)
        }
        if (type === 'Ok') {
            return (<Col md="2"><h1 style={{textAlign: "center"}}><i className="fa fa-check-circle fa-2x text-success"/>
            </h1></Col>)
        }
    }

    function displayWarnCritText() {
        if (issueCount.Warn === 1 && issueCount.Crit === 0) {
            return (<h2>{issueCount.Warn} warning</h2>)
        }
        if (issueCount.Warn > 1 && issueCount.Crit === 0) {
            return (<h2>{issueCount.Warn} warnings</h2>)
        }
        if (issueCount.Warn === 0 && issueCount.Crit === 1) {
            return (<h2>{issueCount.Crit} critical issue</h2>)
        }
        if (issueCount.Warn === 0 && issueCount.Crit > 1) {
            return (<h2>{issueCount.Crit} critical issues</h2>)
        }
        if (issueCount.Warn === 1 && issueCount.Crit === 1) {
            return (<h2>{issueCount.Warn} warning and {issueCount.Crit} critical issue</h2>)
        }
        if (issueCount.Warn > 1 && issueCount.Crit === 1) {
            return (<h2>{issueCount.Warn} warnings and {issueCount.Crit} critical issue</h2>)
        }
        if (issueCount.Warn === 1 && issueCount.Crit > 1) {
            return (<h2>{issueCount.Warn} warning and {issueCount.Crit} critical issues</h2>)
        }
        if (issueCount.Warn > 1 && issueCount.Crit > 1) {
            return (<h2>{issueCount.Warn} warnings and {issueCount.Crit} critical issues</h2>)
        }
    }


    function displayIssueCount() {
        // TODO: need to make this display how I want it to
        console.log(issueCount)
        if (issueCount === []) {
            return (<div className="spinner-border" role="status">
                <span className="sr-only">Loading...</span>
            </div>)
        } else if (issueCount.Warn > 0 || issueCount.Crit > 0) {
            return (<Row>
                {displayIssueIcon('Warn')}
                <Col md="10">
                    {displayWarnCritText()}
                    <p>On the last run, we saw some issues with your cyber security setup.</p>
                    <p>Last Run: 12 Sep - 08:38</p>
                </Col>
            </Row>)
        } else {
            return (<Row>
                <Col md="2"><h1><i className="nc-icon nc-check-2"></i></h1></Col>
                <Col md="10">

                    <h2>All good!</h2>

                    <p>On the last run, we saw no issues with your system.</p>
                    <p>Last Run: 12 Sep - 08:38</p>
                </Col>
            </Row>)
        }

    }


    return (

        <div className="animate__animated animate__fadeInUp rounded p-1">
            <Confetti
                width={width}
                height={height}
                recycle={false}
            />
            <Card className="card-status">
                <CardHeader>
                    <CardTitle tag="h4"><b>Status</b></CardTitle>
                    <hr/>
                    {/*<p className="card-category">System Cyber Health</p>*/}
                </CardHeader>
                <CardBody>
                    {displayIssueCount()}
                </CardBody>
                <CardFooter>
                    <hr/>
                    <div className="checkCategories">
                        <Row style={{'padding-left': '2%'}}>
                            <Card style={{'margin-right': '2%'}}>
                                <CardBody>
                                    <Row>
                                        <Col md="2"><h1><i className="nc-icon nc-check-2"></i></h1></Col>
                                        <Col md="10">
                                            <h2>Security</h2>
                                            <p>On the last run, we saw no issues with your system.</p>
                                        </Col>
                                    </Row>
                                </CardBody>
                            </Card>
                           <Card style={{'margin-right': '2%'}}>
                                <CardBody>
                                    <Row>
                                        <Col md="2"><h1><i className="nc-icon nc-check-2"></i></h1></Col>
                                        <Col md="10">
                                            <h2>Patching</h2>
                                            <p>On the last run, we saw no issues with your system.</p>
                                        </Col>
                                    </Row>
                                </CardBody>
                            </Card>
                            <Card style={{'margin-right': '2%'}}>
                                <CardBody>
                                    <Row>
                                        <Col md="2"><h1><i className="nc-icon nc-check-2"></i></h1></Col>
                                        <Col md="10">
                                            <h2>Testing</h2>
                                            <p>On the last run, we saw no issues with your system.</p>
                                        </Col>
                                    </Row>
                                </CardBody>
                            </Card>
                        </Row>

                    </div>
                </CardFooter>
            </Card>
        </div>

    )
}

