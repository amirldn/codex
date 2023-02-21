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

    function displayIssueCount() {
        // TODO: need to make this display how I want it to
        console.log(issueCount)
        if (issueCount === []) {
            return (<div className="spinner-border" role="status">
                <span className="sr-only">Loading...</span>
            </div>)
        } else if (issueCount.Warn > 0) {
            return (<Row>
                <Col md="2"><h1><i className="nc-icon nc-check-2"></i></h1></Col>
                <Col md="10">

                    <h2>{issueCount.Warn} warnings and {issueCount.Crit} criticals</h2>

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


    return (// <TipContext.Provider value={{tip, fetchTip}}>

        <div className="animate__animated animate__fadeInUp rounded p-1">
            <Confetti
                width={width}
                height={height}
                recycle={false}
            />
            <Card className="card-status">
                <CardHeader>
                    <CardTitle tag="h5">Status</CardTitle>
                    <p className="card-category">System Cyber Health</p>
                </CardHeader>
                <CardBody>
                    {displayIssueCount()}
                </CardBody>
                {/*<CardFooter>*/}
                {/*</CardFooter>*/}
            </Card>
        </div>
        // </TipContext.Provider>

    )
}

