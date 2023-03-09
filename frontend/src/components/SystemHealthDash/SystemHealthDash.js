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
            return ('No checks have been found for this category.')
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
            let type = 'Ok'
        }
        if (type === 'Unknown') {
            return (<Col md="2"><h2><i
                className="fa fa-question-circle fa text-info"/></h2></Col>)
        }
        if (type === 'Warn') {
            return (<Col md="2"><i
                className="fa fa-exclamation-circle fa text-warning"/></Col>)
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


    return (<Card style={{'marginRight': '2%'}}>
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
        // TODO: need to update the time
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
                <CardFooter>
                    <hr/>
                    <div className="checkCategories">
                        <Row style={{
                            'paddingLeft': '2%', 'flexWrap': 'nowrap'
                        }}>
                            {/*{console.log(categoryIssueCount)}*/}
                            {categoryIssueCount.map((category) => (
                                <SystemHealthDashCategoryCard key={category.category} props={category}/>))}
                        </Row>
                    </div>
                </CardFooter>
            </Card>
        </div>

    )
}

