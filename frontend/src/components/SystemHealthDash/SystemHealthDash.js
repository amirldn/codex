import React, {useEffect} from "react";
import {Card, CardBody, CardFooter, CardHeader, CardTitle, Col, Row} from "reactstrap";

import 'animate.css';
import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from 'react-confetti'

function SystemHealthDashCategoryCard({props}) {
    let statuses = props.statuses;
    let type = 'Unknown';


    function displayIssueText() {
        if (statuses.critical === 1 && statuses.warning === 0 && statuses.unknown === 0) {
            return ('There is one critical issue.')
        } else if (statuses.critical === 0 && statuses.warning === 1 && statuses.unknown === 0) {
            return ('There is one warning.')
        } else if (statuses.critical === 0 && statuses.warning === 0 && statuses.unknown === 1) {
            return ('There is one check that could not be ran.')
        } else if (statuses.critical === 1 && statuses.warning === 1 && statuses.unknown === 0) {
            return ('There is one critical issue and one warning.')
        } else if (statuses.critical === 1 && statuses.warning === 0 && statuses.unknown === 1) {
            return ('There is one critical issue and one check that could not be ran.')
        } else if (statuses.critical === 0 && statuses.warning === 1 && statuses.unknown === 1) {
            return ('There is one warning and one check that could not be ran.')
        } else if (statuses.critical === 1 && statuses.warning === 1 && statuses.unknown === 1) {
            return ('There is one critical issue, one warning, and one check that could not be ran.')
        } else if (statuses.critical > 1 && statuses.warning === 0 && statuses.unknown === 0) {
            return ('There are ' + statuses.critical + ' critical issues.')
        } else if (statuses.critical === 0 && statuses.warning > 1 && statuses.unknown === 0) {
            return ('There are ' + statuses.warning + ' warnings.')
        } else if (statuses.critical === 0 && statuses.warning === 0 && statuses.unknown > 1) {
            return ('There are ' + statuses.unknown + ' checks that could not be ran.')
        } else if (statuses.critical > 1 && statuses.warning > 1 && statuses.unknown === 0) {
            return ('There are ' + statuses.critical + ' critical issues and ' + statuses.warning + ' warnings.')
        } else if (statuses.critical > 1 && statuses.warning === 0 && statuses.unknown > 1) {
            return ('There are ' + statuses.critical + ' critical issues and ' + statuses.unknown + ' checks that could not be ran.')
        } else if (statuses.critical === 0 && statuses.warning > 1 && statuses.unknown > 1) {
            return ('There are ' + statuses.warning + ' warnings and ' + statuses.unknown + ' checks that could not be ran.')
        } else if (statuses.critical > 1 && statuses.warning > 1 && statuses.unknown > 1) {
            return ('There are ' + statuses.critical + ' critical issues, ' + statuses.warning + ' warnings, and ' + statuses.unknown + ' checks that could not be ran.')
        } else if (statuses.critical === 1 && statuses.warning === 1 && statuses.unknown === 1) {
            return ('There is one critical issue, one warning, and one check that could not be ran.')
        } else if (statuses.critical === 1 && statuses.warning === 1 && statuses.unknown > 1) {
            return ('There is one critical issue, one warning, and ' + statuses.unknown + ' checks that could not be ran.')
        } else if (statuses.critical === 1 && statuses.warning > 1 && statuses.unknown === 1) {
            return ('There is one critical issue, ' + statuses.warning + ' warnings, and one check that could not be ran.')
        } else if (statuses.critical > 1 && statuses.warning === 1 && statuses.unknown === 1) {
            return ('There is one warning, ' + statuses.critical + ' critical issues, and one check that could not be ran.')
        } else if (statuses.critical > 1 && statuses.warning > 1 && statuses.unknown === 1) {
            return ('There is one check that could not be ran, ' + statuses.critical + ' critical issues, and ' + statuses.warning + ' warnings.')
        } else if (statuses.critical === 1 && statuses.warning > 1 && statuses.unknown > 1) {
            return ('There is one critical issue, ' + statuses.warning + ' warnings, and ' + statuses.unknown + ' checks that could not be ran.')
        } else if (statuses.critical > 1 && statuses.warning === 1 && statuses.unknown > 1) {
            return ('There is one warning, ' + statuses.critical + ' critical issues, and ' + statuses.unknown + ' checks that could not be ran.')
        }
        // 0 critical issues, 0 warnings, 0 checks that could not be ran
        else {
            // return ('No checks have been found for this category.')
            return ('')
        }
    }

    function okText() {
        if (statuses.ok === 1) {
            return ('1 check passed ok!')
        } else if (statuses.ok > 1) {
            const string = statuses.ok + ' checks passed ok!'
            return (string)
        } else {
            return ('No checks have passed for this category.')
        }
    }

    function displayIssueIcon(type) {
        if (statuses.critical > 0) {
            type = 'Crit'
        } else if (statuses.warning > 0) {
            type = 'Warn'
        } else if (statuses.unknown > 0) {
            type = 'Unknown'
        } else {
            type = 'Ok'
        }
        if (type === 'Unknown') {
            return (<Col md="2"><h2><i
                className="fa fa-question-circle fa text-info"/></h2></Col>)
        }
        if (type === 'Warn') {
            return (<Col md="2"><h2>
                <i className="fa fa-exclamation-circle fa text-warning"/></h2></Col>)
        }
        if (type === 'Crit') {
            return (<Col md="2"><h2><i
                className="fa fa-times-circle fa text-danger"/></h2></Col>)
        }
        if (type === 'Ok') {
            return (<Col md="2"><h2><i
                className="fa fa-check-circle fa text-success"/></h2></Col>)
        }
    }


    return (// Make the card fill the avaliable space
        <Card style={{
            marginRight: '2%', width: '50%'
        }}>
            <CardBody>
                <Row>
                    {displayIssueIcon(type)}
                    <Col md="10">
                        <h2>{props.category}</h2>
                        <p>{okText()}</p>
                        <p>{displayIssueText()}</p>
                    </Col>
                </Row>
            </CardBody>
        </Card>)
}

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


    // Category Issue Count
    const [categoryIssueCount, setCategoryIssueCount] = React.useState([]);

    function fetchCategoryIssueCount() {
        fetch('http://127.0.0.1:8000/check/list/latest/category')
            .then(response => response.json())
            .then(data => setCategoryIssueCount(data.data));
    }

    useEffect(() => {
        fetchCategoryIssueCount();
    }, []);


    // Latest Run Time
    const [latestRunTime, setLatestRunTime] = React.useState([]);

    function fetchLatestRunTime() {
        fetch('http://127.0.0.1:8000/check/list/latest/lastupdated')
            .then(response => response.json())
            .then(data => updateLastRan(data.data));
    }

    useEffect(() => {
        fetchLatestRunTime();
    }, []);

    function updateLastRan(date) {
        let formattedDate;
        if (date === '') {
            formattedDate = 'N/A'
        } else if (date === 'N/A') {
            formattedDate = 'N/A'
        } else {
            const jsDate = new Date(date);
            formattedDate = jsDate.toLocaleString('en-GB', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                second: 'numeric',
                hour12: false
            });
            formattedDate = formattedDate.replace(',', ' @');
        }
        setLatestRunTime(formattedDate);
    }


    function displayIssueIcon(type) {
        if (type === 'Warn') {

            return (<Col md="2"><h1 style={{
                textAlign: "center", paddingTop: '15%'
            }}><i
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
            return (<h2>{issueCount.Crit} critical issue and {issueCount.Warn} warning</h2>)
        }
        if (issueCount.Warn > 1 && issueCount.Crit === 1) {
            return (<h2>{issueCount.Crit} critical issue and {issueCount.Warn} warnings</h2>)
        }
        if (issueCount.Warn === 1 && issueCount.Crit > 1) {
            return (<h2>{issueCount.Crit} critical issues and {issueCount.Warn} warning</h2>)
        }
        if (issueCount.Warn > 1 && issueCount.Crit > 1) {
            return (<h2>{issueCount.Crit} critical issues and {issueCount.Warn} warnings</h2>)
        }
    }

    function displayIssueCount() {
        if (issueCount === []) {
            return (<div className="spinner-border" role="status">
                <span className="sr-only">Loading...</span>
            </div>)
        } else if (issueCount.Warn > 0 || issueCount.Crit > 0) {
            return (<Row>
                <div className='animate__tada animate__animated animate__delay-2s'>
                    {displayIssueIcon('Warn')}
                </div>
                <Col md="10">
                    {displayWarnCritText()}
                    <p>On the last run, we saw some issues with your cyber security setup.</p>
                    <p>Last Run: {latestRunTime}</p>
                </Col>
            </Row>)
        } else if (issueCount.Warn === 0 && issueCount.Crit === 0 && issueCount.OK === 0) {
            return (<Row>
                <Col md="2">
                    <div className='animate__tada animate__animated animate__delay-2s'>
                        <h1 style={{
                            textAlign: "center", paddingTop: '15%'
                        }}>
                            <i
                                className="fa fa-exclamation-circle fa-2x text-info"/></h1>
                    </div>
                </Col>
                <Col md="10">
                    <h4>No Codex checks have been ran</h4>
                    <p>You'll need to run some checks first before we can see how your system is doing.</p>
                    <p>Take a look at the <a href='/admin/checks/'>checks</a> page to get started.</p>
                </Col>
            </Row>)
        } else if (issueCount.Warn === 0 && issueCount.Crit === 0 && issueCount.OK > 0) {
            return (<Row>
                {/*Make the icon vertically aligned*/}
                <Col md="2">

                    <div className='animate__tada animate__animated animate__delay-2s'>
                        <h1 style={{
                            textAlign: "center", paddingTop: '15%'
                        }}>
                            <i className="fa fa-check-circle fa-2x text-success"/></h1>
                    </div>
                </Col>
                <Col md="10">
                    <h4>Codex found no issues, keep it up!</h4>
                    <p>It looks like your system is up to date & protected across all Codex checks.</p>
                    <p>Take a look at the <a href='/admin/learning/'>learning</a> page to improve your cybersecurity
                        knowledge.</p>
                </Col>
            </Row>)
        } else {
            return (<Row>
                <Col md="2">
                    <h1>
                        <div className="spinner-border" role="status" style={{width: '3rem', height: '3rem'}}>
                            <h2 className="sr-only">Loading...</h2>
                        </div>
                    </h1>
                </Col>
                <Col md="10">
                    <h4>Codex is setting up...</h4>
                </Col>
            </Row>)
        }
    }


    function displayCategories() {
        // console.log(issueCount)
        if (!(issueCount.Warn === 0 && issueCount.Crit === 0 && issueCount.OK === 0)) {
            return (<CardFooter>
                <hr/>
                <div className="checkCategories">
                    <Row style={{
                        'display': 'flex',
                        'justifyContent': 'space-between',
                        'alignItems': 'center',
                        'paddingLeft': '2%',
                        'flexWrap': 'nowrap'
                    }}>
                        {categoryIssueCount.map((category) => (
                            <SystemHealthDashCategoryCard key={category.category} props={category}/>))}
                    </Row>
                </div>
            </CardFooter>)
        }
    }

    return (<div className="animate__animated animate__fadeInUp rounded p-1">
            <Confetti
                width={width}
                height={height}
                recycle={false}
            />
            <Card className="card-status">
                <CardHeader>
                    <CardTitle tag="h4"><b>Status</b></CardTitle>
                    <hr/>
                </CardHeader>
                <CardBody>
                    {displayIssueCount()}
                </CardBody>
                {displayCategories()}
            </Card>
        </div>

    )
}

