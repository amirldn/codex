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
import DashboardCard from "../components/DashboardCard/DashboardCard";

function Dashboard() {

    // Total No of Check Count
    const [checkCount, setCheckCount] = React.useState(0);


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


    return (<div className="content">
            <Row>

                <Col lg="3" md="6" sm="6">
                    <DashboardCard type={'OK'}
                                   icon={'fa fa-vial-circle-check text-success'}
                                   title={'Total Ok\'s'}
                                   issueCountValue={displayIssueCount('OK')}
                                   subtitle={'Successful Checks'}
                                   subtitleIcon={'fa fa-check'}/>
                </Col>
                <Col lg="3" md="6" sm="6">
                    <DashboardCard type={'Warn'}
                                   icon={'fa fa-triangle-exclamation text-warning'}
                                   title={'Total Warnings'}
                                   issueCountValue={displayIssueCount('Warn')}
                                   subtitle={'Cautionary Checks'}
                                   subtitleIcon={'fa fa-exclamation'}/>
                </Col>
                <Col lg="3" md="6" sm="6">
                    <DashboardCard type={'Crit'}
                                   icon={'fa fa-bomb text-danger'}
                                   title={'Total Criticals'}
                                   issueCountValue={displayIssueCount('Crit')}
                                   subtitle={'Critical Checks'}
                                   subtitleIcon={'fa fa-xmark'}/>
                </Col>
                <Col lg="3" md="6" sm="6">
                    <DashboardCard type={'Total'}
                                   icon={'fa fa-circle-nodes text-info'}
                                   title={'Total Checks'}
                                   issueCountValue={displayCheckCount()}
                                   subtitle={'Cumulative Checks'}
                                   subtitleIcon={'fa fa-layer-group'}/>
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
        </div>);
}

export default Dashboard;
