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
import React, {useEffect, useState} from "react";
// react plugin used to create charts
// reactstrap components
import {
    Card,
    CardHeader,
    CardBody,
    CardTitle,
    Row,
    Col, Button, Form, FormGroup, Input, CardText
} from "reactstrap";
// core components
import 'animate.css';

function Password() {
    const [symbolState, setSymbolState] = useState(true);
    const [numberState, setNumberState] = useState(true);
    const [upperState, setUpperState] = useState(true);
    const [lengthState, setLengthState] = useState(12);

    const [generatedPassword, setGeneratedPassword] = React.useState('Generate a Password');
    const fetchGeneratedPassword = async () => {
        const response = await fetch('http://127.0.0.1:8000/password/generate/?' +
            new URLSearchParams({
                length: lengthState,
                special: symbolState,
                numbers: numberState,
                upper: upperState
            }));
        const data = await response.json();
        setGeneratedPassword(data.data.password);
    }

    useEffect(() => {
        fetchGeneratedPassword();
    }, []);

    return (
        <div className="content">
            <Row>
                <Col md="12">
                    <h2 className="mb-2">Secure Password Generator</h2>
                    <p>
                        This page provides you with a tool to generate secure passwords. Passwords should be
                        complicated!
                        Reusing a password (even altering it) is bad practice and can lead a data breach on
                        one site affecting all your accounts. By using multiple passwords, you can ensure that if one
                        site is breached, your other accounts are still safe.
                        <br/>
                        <br/>
                        This tool provides you with parameters you can use to generate secure passwords using a
                        combination of letters, numbers, and symbols to that are hard to crack. It is recommended that
                        you use a password manager to store your passwords. If you do not have a password manager, you
                        can look into options such as LastPass, 1Password, or KeePass.
                    </p>
                    <hr/>
                </Col>
            </Row>

            <Row>
                <Col className="ml-auto mr-auto" md="6">
                    <Card>
                        <CardHeader>
                            <CardTitle tag="h4">Password Generator Tool</CardTitle>
                            <p>Use the parameters below to generate a secure password for your accounts</p>
                        </CardHeader>

                        <CardBody>
                            <Form>
                                <Row>
                                    <Col className="pr-1" md="6">
                                        <FormGroup>
                                            <label>Length</label>
                                            {/* change this to range */}
                                            <Input
                                                defaultValue="12"
                                                placeholder="Length"
                                                type="number"
                                                onChange={e => setLengthState(e.target.value)}
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col className="pl-1" md="6">
                                        <FormGroup>
                                            <label>Include Symbols</label>
                                            <Input
                                                type="select"
                                                name="select"
                                                id="exampleSelect"
                                                onChange={e => setSymbolState(e.target.value)}
                                            >
                                                <option>Yes</option>
                                                <option>No</option>
                                            </Input>
                                        </FormGroup>
                                    </Col>
                                    <Col className="pr-1" md="6">
                                        <FormGroup>
                                            <label>Include Numbers</label>
                                            <Input
                                                type="select"
                                                name="select"
                                                id="exampleSelect"
                                                onChange={e => setNumberState(e.target.value)}
                                            >
                                                <option>Yes</option>
                                                <option>No</option>
                                            </Input>
                                        </FormGroup>
                                    </Col>
                                    <Col className="pl-1" md="6">
                                        <FormGroup>
                                            <label>Include Upper Case</label>
                                            <Input
                                                type="select"
                                                name="select"
                                                id="exampleSelect"
                                                onChange={e => setUpperState(e.target.value)}
                                            >
                                                <option>Yes</option>
                                                <option>No</option>
                                            </Input>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <div className="update ml-auto mr-auto">
                                        <Button
                                            className="btn-info"
                                            color="primary"
                                            size="lg"
                                            onClick={fetchGeneratedPassword}
                                        >
                                            Generate Password
                                        </Button>
                                    </div>
                                </Row>
                            </Form>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col className="ml-auto mr-auto" md="10">
                    <Card>
                        <CardBody>
                            <CardTitle tag="h5" className="text-center">Generated Password</CardTitle>
                            <hr/>
                            <CardText className="text-center">
                                <strong>{generatedPassword}</strong>
                            </CardText>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </div>
    );
}

export default Password;
