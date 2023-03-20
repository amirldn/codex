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
    UncontrolledAlert, Alert, Button, Card, CardHeader, CardBody, CardTitle, Row, Col,
} from "reactstrap";

import CheckCard from "../components/CheckCard/CheckCard";

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

    function handleRunAll() {
        setRunAllHappened(true)
        fetchRunAllTasksIds()
    }

    useEffect(() => {
        console.log("useEffect runAllHappened")
    }, [runAllHappened])

    function getTaskIdForCheck (check) {
        const checkApiName = check.api_name
        return runAllTaskIds[checkApiName]
    }


    return (<div className="content">
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
                                <Button className="btn-round" color="primary" outline type="submit"
                                        onClick={handleRunAll}>
                                    <i className="nc-icon nc-spaceship"/> Run All
                                </Button>
                            </Col>
                        </Row>
                    </CardHeader>
                    <CardBody>
                        {categoryList.map((category, index) => (<Card className="card-check m-1" key={index}>
                            <CardBody>
                                <h5>{category}</h5>
                                <Row>
                                    {checkList.filter((check) => check.category === category).map((check) => (
                                        <CheckCard check={check} key={check.id} taskIdFromRunAll={getTaskIdForCheck(check)}/>))}
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
