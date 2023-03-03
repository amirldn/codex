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
import {Line, Pie} from "react-chartjs-2";
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
    // Check Count
    const [checkCount, setCheckCount] = React.useState(0);

    function fetchCheckCount() {
        fetch('http://127.0.0.1:8000/check/list/length')
            .then(response => response.json())
            .then(data => setCheckCount(data.data));
    }

    useEffect(() => {
        fetchCheckCount();
    }, []);

    function displayCheckCount() {
        if (checkCount === 0) {
            return (<div className="spinner-border" role="status">
                <span className="sr-only">Loading...</span>
            </div>)
        } else {
            return (<CardTitle tag="p">{checkCount}</CardTitle>)
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
                                        <i className="nc-icon nc-money-coins text-success"/>
                                    </div>
                                </Col>
                                <Col md="8" xs="7">
                                    <div className="numbers">
                                        <p className="card-category">Total Ok's</p>
                                        <CardTitle tag="p">86</CardTitle>
                                        <p/>
                                    </div>
                                </Col>
                            </Row>
                        </CardBody>
                        <CardFooter>
                            <hr/>
                            <div className="stats">
                                <i className="far fa-calendar"/> Last day
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
                                        <i className="nc-icon nc-vector text-danger"/>
                                    </div>
                                </Col>
                                <Col md="8" xs="7">
                                    <div className="numbers">
                                        <p className="card-category">Total Warnings</p>
                                        <CardTitle tag="p">63</CardTitle>
                                        <p/>
                                    </div>
                                </Col>
                            </Row>
                        </CardBody>
                        <CardFooter>
                            <hr/>
                            <div className="stats">
                                <i className="far fa-clock"/> In the last week
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
                                        <i className="nc-icon nc-favourite-28 text-primary"/>
                                    </div>
                                </Col>
                                <Col md="8" xs="7">
                                    <div className="numbers">
                                        <p className="card-category">Total Criticals</p>
                                        <CardTitle tag="p">38</CardTitle>
                                        <p/>
                                    </div>
                                </Col>
                            </Row>
                        </CardBody>
                        <CardFooter>
                            <hr/>
                            <div className="stats">
                                <i className="fas fa-sync-alt"/> Update now
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
                                        <i className="nc-icon nc-globe text-warning"/>
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
                                <i className="fas fa-sync-alt"/> Update Now
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
                    {/*<div className={"animate__animated animate__fadeInUp"}>*/}
                    <hr/>
                    {/*</div>*/}
                    <CyberTip/>
                </Col>
            </Row>
        </div>
    </>);
}

export default Dashboard;
