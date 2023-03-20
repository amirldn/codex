/*!

=========================================================
* Paper Dashboard React - v1.3.1
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

* Licensed under MIT (https://github.com/creativetimofficial/paper-dashboard-react/blob/main/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, {useEffect} from "react";
// react plugin used to create charts
// reactstrap components
import {
    Card, CardHeader, CardBody, CardFooter, CardTitle, Row, Col
} from "reactstrap";
// core components
import {
    dashboard24HoursPerformanceChart, dashboardEmailStatisticsChart, dashboardNASDAQChart
} from "variables/charts.js";
import CyberTip from "../components/CyberTip/CyberTip";
import 'animate.css';

import SystemHealthDash from "../components/SystemHealthDash/SystemHealthDash";

function Dashboard() {

    // Total No of Check Count
    const [checkCount, setCheckCount] = React.useState(0);

    // function fetchTotalCheckCount() {
    //
    //     fetch('http://127.0.0.1:8000/check/list/length')
    //         .then(response => response.json())
    //         .then(data => setCheckCount(data.data));
    // }
    //
    // useEffect(() => {
    //     fetchTotalCheckCount();
    // }, []);

    function displayCheckCount() {
        // console.log(checkCount)
        let total = issueCount['OK'] + issueCount['Warn'] + issueCount['Crit']
        if (!issueCount.hasOwnProperty('OK')) {
            return (<div className="spinner-border" role="status">
                <span className="sr-only">Loading...</span>
            </div>)
        } else {
            return (<CardTitle tag="p">{total}</CardTitle>)
        }
    }


    // Individual Counts
    const [issueCount, setIssueCount] = React.useState({});

    function fetchIssueCount() {
        fetch('http://127.0.0.1:8000/check/list/latest/issuetotal')
            .then(response => response.json())
            .then(data => setIssueCount(data.data));
    }

    useEffect(() => {
        fetchIssueCount();
    }, []);


    function displayIssueCount(type) {
        if (!issueCount.hasOwnProperty(type)) {
            return (<div className="spinner-border" role="status">

                <span className="sr-only">Loading...</span>
            </div>)
        } else {
            return (<CardTitle tag="p">{issueCount[type]}</CardTitle>)
        }
    }


    return (<>
        <div className="content">
            <Row>

                <Col lg="3" md="6" sm="6">
                    <Card className="card-stats">
                        <CardBody>
                            <Row>
                                <Col md="4" xs="5">
                                    <div className="icon-big text-center icon-warning">
                                        <i className="fa fa-vial-circle-check text-success"/>
                                    </div>
                                </Col>
                                <Col md="8" xs="7">
                                    <div className="numbers">
                                        <p className="card-category">Total Ok's</p>
                                        {displayIssueCount('OK')}
                                        <p/>
                                    </div>
                                </Col>
                            </Row>
                        </CardBody>
                        <CardFooter>
                            <hr/>
                            <div className="stats">
                                <i className="fa fa-check"/> Successful Checks
                            </div>
                        </CardFooter>
                    </Card>
                </Col>
                <Col lg="3" md="6" sm="6">
                    <Card className="card-stats">
                        <CardBody>
                            <Row>
                                <Col md="4" xs="5">
                                    <div className="icon-big text-center icon-warning">
                                        <i className="fa fa-triangle-exclamation text-warning"/>
                                    </div>
                                </Col>
                                <Col md="8" xs="7">
                                    <div className="numbers">
                                        <p className="card-category">Total Warnings</p>
                                        {displayIssueCount('Warn')}
                                        <p/>
                                    </div>
                                </Col>
                            </Row>
                        </CardBody>
                        <CardFooter>
                            <hr/>
                            <div className="stats">
                                <i className="fa fa-exclamation"/>Cautionary Checks
                            </div>
                        </CardFooter>
                    </Card>
                </Col>
                <Col lg="3" md="6" sm="6">
                    <Card className="card-stats">
                        <CardBody>
                            <Row>
                                <Col md="4" xs="5">
                                    <div className="icon-big text-center icon-warning">
                                        <i className="fa fa-bomb" style={{color: '#ef8157'}}></i>
                                    </div>
                                </Col>
                                <Col md="8" xs="7">
                                    <div className="numbers">
                                        <p className="card-category">Total Criticals</p>
                                        {displayIssueCount('Crit')}
                                        <p/>
                                    </div>
                                </Col>
                            </Row>
                        </CardBody>
                        <CardFooter>
                            <hr/>
                            <div className="stats">
                                <i className="fa fa-xmark"/> Critical Checks
                            </div>
                        </CardFooter>
                    </Card>
                </Col>
                <Col lg="3" md="6" sm="6">
                    <Card className="card-stats">
                        <CardBody>
                            <Row>
                                <Col md="4" xs="5">
                                    <div className="icon-big text-center icon-warning">
                                        <i className="fa fa-circle-nodes text-info"/>
                                    </div>
                                </Col>
                                <Col md="8" xs="7">
                                    <div className="numbers">
                                        <p className="card-category">Total Checks</p>
                                        {displayCheckCount()}
                                        <p/>
                                    </div>
                                </Col>
                            </Row>
                        </CardBody>
                        <CardFooter>
                            <hr/>
                            <div className="stats">
                                <i className="fa fa-layer-group"/> Cumulative Checks
                            </div>
                        </CardFooter>
                    </Card>
                </Col>
            </Row>
            <Row>

                <Col md="12">
                    <SystemHealthDash/>
                </Col>
                <Col md="12">
                    <hr/>
                    <CyberTip/>
                </Col>
            </Row>
        </div>
    </>);
}

export default Dashboard;
