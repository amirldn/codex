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
/*eslint-disable*/
import React, {useEffect} from "react";
// reactstrap components
import {
    Button, Card, CardHeader, CardBody, CardTitle, Row, Col, UncontrolledTooltip,
} from "reactstrap";

import CheckCard from "../components/CheckCard/CheckCard";
import DashboardCard from "../components/DashboardCard/DashboardCard";

function Checks() {

    // API call to fetch list of checks
    const [checkList, setCheckList] = React.useState([]);
    const fetchCheckList = async () => {
        const response = await fetch('http://127.0.0.1:8000/check/list/');
        const data = await response.json();
        setCheckList(data.data);
    }


    const [categoryList, setCategoryList] = React.useState([]);
    const fetchCategoryList = async () => {
        const response = await fetch('http://127.0.0.1:8000/check/list/category');
        const data = await response.json();
        setCategoryList(data.data);
    }

    useEffect(() => {
        fetchCheckList();
    }, [categoryList])

    useEffect(() => {
        fetchCategoryList()
    }, [])


    const [runAllTaskIds, setRunAllTaskIds] = React.useState({});
    const fetchRunAllTasksIds = async () => {
        console.log("fetchRunAllTasksIds")
        const response = await fetch('http://127.0.0.1:8000/check/run/all', {
            method: 'POST', headers: {
                'Content-Type': 'application/json',
            }
        });
        const data = await response.json().then((result) => {
            setRunAllTaskIds(result.data)
            console.log(result.data)
        })
    }

    const [runAllHappened, setRunAllHappened] = React.useState(false);
    const [somethingChanged, setSomethingChanged] = React.useState('');

    function handleRunAll() {
        setRunAllHappened(true)
        fetchRunAllTasksIds()
    }

    useEffect(() => {
        // console.log("useEffect runAllHappened")
    }, [runAllHappened])

    function getTaskIdForCheck(check) {
        const checkApiName = check.api_name
        return runAllTaskIds[checkApiName]
    }

    // Individual Counts
    const [issueCount, setIssueCount] = React.useState({});
    const [oldIssueCount, setOldIssueCount] = React.useState({});

    function fetchIssueCount() {
        fetch('http://127.0.0.1:8000/check/list/latest/issuetotal')
            .then(response => response.json())
            .then(data => setIssueCount(data.data));
    }

    useEffect(() => {
        fetchIssueCount();
    }, [runAllHappened, somethingChanged]);

    function displayIssueCount(type) {
        if (!issueCount.hasOwnProperty(type)) {
            return ([Math.random(), (<div className="spinner-border" role="status">
                <span className="sr-only">Loading...</span>
            </div>)])
        } else {
            return ([Math.random(), (<CardTitle tag="p">{issueCount[type]}</CardTitle>)])

        }
    }


    function displayCheckCount() {
        // console.log(checkCount)
        let total = issueCount['OK'] + issueCount['Warn'] + issueCount['Crit']
        if (!issueCount.hasOwnProperty('OK')) {
            return ([Math.random(), (<div className="spinner-border" role="status">
                <span className="sr-only">Loading...</span>
            </div>)])
        } else {
            return ([Math.random(), (<CardTitle tag="p">{total}</CardTitle>)])
        }
    }

    function displayRunAllButton() {
        if (runAllHappened) {
            return (<div>
                <UncontrolledTooltip target={'runAll'} placement='left'>
                    <span>All checks have been ran</span>
                </UncontrolledTooltip>
                <Button className="btn-round" color="primary" outline type="submit"
                        onClick={handleRunAll}
                        id='runAll' disabled>
                    <i className="nc-icon nc-spaceship"/> Run All
                </Button>
            </div>)
        } else {
            return (<div>
                <div id='runAll'></div>
                <UncontrolledTooltip target={'runAllDisabled'} placement='left'>
                    <span>
                    Run All Checks
                    </span>
                </UncontrolledTooltip>
                <Button className="btn-round" color="primary" outline type="submit"
                        onClick={handleRunAll}
                        id='runAllDisabled'>
                    <i className="nc-icon nc-spaceship"/> Run All
                </Button>
            </div>)
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
                               subtitleIcon={'fa fa-check'}
                               somethingChanged={somethingChanged}
                />
            </Col>
            <Col lg="3" md="6" sm="6">
                <DashboardCard type={'Warn'}
                               icon={'fa fa-triangle-exclamation text-warning'}
                               title={'Total Warnings'}
                               issueCountValue={displayIssueCount('Warn')}
                               subtitle={'Cautionary Checks'}
                               subtitleIcon={'fa fa-exclamation'}
                               somethingChanged={somethingChanged}
                />
            </Col>
            <Col lg="3" md="6" sm="6">
                <DashboardCard type={'Crit'}
                               icon={'fa fa-bomb text-danger'}
                               title={'Total Criticals'}
                               issueCountValue={displayIssueCount('Crit')}
                               subtitle={'Critical Checks'}
                               subtitleIcon={'fa fa-xmark'}
                               somethingChanged={somethingChanged}
                />
            </Col>
            <Col lg="3" md="6" sm="6">
                <DashboardCard type={'Total'}
                               icon={'fa fa-circle-nodes text-info'}
                               title={'Total Checks'}
                               issueCountValue={displayCheckCount()}
                               subtitle={'Cumulative Checks'}
                               subtitleIcon={'fa fa-layer-group'}
                               somethingChanged={somethingChanged}
                />
            </Col>
        </Row>
        <Row>
            <Col md="12">
                <Card>
                    <CardHeader>
                        <Row>
                            <Col md="10">
                                <CardTitle tag="h5">Checks</CardTitle>
                                <p>Check the status of your system by running these checks</p>
                            </Col>
                            <Col md="2">
                                {displayRunAllButton()}
                            </Col>
                        </Row>
                    </CardHeader>
                    <CardBody>
                        {categoryList.map((category, index) => (<Card className="card-check m-1" key={index}>
                            <CardBody>
                                <h5>{category}</h5>
                                <Row>
                                    {checkList.filter((check) => check.category === category).map((check) => (
                                        <CheckCard check={check}
                                                   key={check.id}
                                                   taskIdFromRunAll={getTaskIdForCheck(check)}
                                                   setSomethingChanged={setSomethingChanged}
                                        />))}
                                </Row>
                            </CardBody>
                        </Card>))}


                    </CardBody>
                </Card>
            </Col>
        </Row>

    </div>);
}

export default Checks;
