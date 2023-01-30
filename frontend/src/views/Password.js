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
    CardFooter,
    CardTitle,
    Row,
    Col, Button, Form, FormGroup, Label, Input, CardText
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
                number: numberState,
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

            {/*            <Form>*/}
            {/*                <Row className="pt-2 pl-5 pr-5">*/}
            {/*                    <Col lg="6" md="12" sm="12">*/}
            {/*                        <Card className="card-stats">*/}
            {/*                            <CardBody>*/}
            {/*                                <Row>*/}
            {/*                                    <Col md="4" xs="5">*/}
            {/*                                        <div className="icon-big text-center icon-warning">*/}
            {/*                                            <i className="nc-icon nc-globe text-warning"/>*/}
            {/*                                        </div>*/}
            {/*                                    </Col>*/}
            {/*                                    <Col md="8" xs="7">*/}
            {/*                                        <div className="numbers">*/}
            {/*                                            <p className="card-category">Length</p>*/}
            {/*                                            <CardTitle tag="p">12 Chars</CardTitle>*/}
            {/*                                            <p/>*/}
            {/*                                        </div>*/}
            {/*                                    </Col>*/}
            {/*                                </Row>*/}
            {/*                            </CardBody>*/}
            {/*                            <CardFooter>*/}
            {/*                                <hr/>*/}
            {/*                                <div className="stats">*/}
            {/*                                    /!*    Create a slider input value from 0 to 36*!/*/}
            {/*                                    <FormGroup>*/}
            {/*                                        <Label for="passwordLength">*/}
            {/*                                           Length of Password*/}
            {/*                                        </Label>*/}
            {/*                                        <Input*/}
            {/*                                            id="passwordLength"*/}
            {/*                                            name="range"*/}
            {/*                                            type="range"*/}
            {/*                                        />*/}
            {/*                                    </FormGroup>*/}
            {/*                                </div>*/}
            {/*                            </CardFooter>*/}
            {/*                        </Card>*/}
            {/*                    </Col>*/}
            {/*                    <Col lg="6" md="12" sm="12">*/}
            {/*                        <Card className="card-stats">*/}
            {/*                            <CardBody>*/}
            {/*                                <Row>*/}
            {/*                                    <Col md="3" xs="5">*/}
            {/*                                        <div className="icon-big text-center icon-warning">*/}
            {/*                                            <i className="nc-icon nc-money-coins text-success"/>*/}
            {/*                                        </div>*/}
            {/*                                    </Col>*/}
            {/*                                    <Col md="9" xs="7">*/}
            {/*                                        <div className="numbers">*/}
            {/*                                            <p className="card-category">Upper-Case Chars</p>*/}
            {/*                                            <CardTitle tag="p">Yes</CardTitle>*/}
            {/*                                            <p/>*/}
            {/*                                        </div>*/}
            {/*                                    </Col>*/}
            {/*                                </Row>*/}
            {/*                            </CardBody>*/}
            {/*                            <CardFooter>*/}
            {/*                                <hr/>*/}
            {/*                                <div className="stats">*/}
            {/*                                    <i className="far fa-calendar"/> Last day*/}
            {/*                                </div>*/}
            {/*                            </CardFooter>*/}
            {/*                        </Card>*/}
            {/*                    </Col>*/}
            {/*                </Row>*/}
            {/*                <Row className="pl-5 pr-5">*/}
            {/*                    <Col lg="6" md="12" sm="12">*/}
            {/*                        <Card className="card-stats">*/}
            {/*                            <CardBody>*/}
            {/*                                <Row>*/}
            {/*                                    <Col md="4" xs="5">*/}
            {/*                                        <div className="icon-big text-center icon-warning">*/}
            {/*                                            <i className="nc-icon nc-vector text-danger"/>*/}
            {/*                                        </div>*/}
            {/*                                    </Col>*/}
            {/*                                    <Col md="8" xs="7">*/}
            {/*                                        <div className="numbers">*/}
            {/*                                            <p className="card-category">Symbols</p>*/}
            {/*                                            <CardTitle tag="p">Yes</CardTitle>*/}
            {/*                                            <p/>*/}
            {/*                                        </div>*/}
            {/*                                    </Col>*/}
            {/*                                </Row>*/}
            {/*                            </CardBody>*/}
            {/*                            <CardFooter>*/}
            {/*                                <hr/>*/}
            {/*                                <div className="stats">*/}
            {/*                                    <FormGroup switch={symbolState.toString()}>*/}
            {/*<Label for="symbolSwitch">Include Symbols</Label>*/}
            {/*                                        <Input*/}
            {/*                                            id="symbolSwitch"*/}
            {/*                                            type="switch"*/}
            {/*                                            name="switch"*/}
            {/*                                            onChange={() => setSymbolState(!symbolState)}*/}
            {/*                                            checked={symbolState}*/}
            {/*                                        />*/}
            {/*      </FormGroup>*/}
            {/*                                </div>*/}
            {/*                            </CardFooter>*/}
            {/*                        </Card>*/}
            {/*                    </Col>*/}
            {/*                    <Col lg="6" md="12" sm="12">*/}
            {/*                        <Card className="card-stats">*/}
            {/*                            <CardBody>*/}
            {/*                                <Row>*/}
            {/*                                    <Col md="4" xs="5">*/}
            {/*                                        <div className="icon-big text-center icon-warning">*/}
            {/*                                            <i className="nc-icon nc-favourite-28 text-primary"/>*/}
            {/*                                        </div>*/}
            {/*                                    </Col>*/}
            {/*                                    <Col md="8" xs="7">*/}
            {/*                                        <div className="numbers">*/}
            {/*                                            <p className="card-category">Numbers</p>*/}
            {/*                                            <CardTitle tag="p">Yes</CardTitle>*/}
            {/*                                        </div>*/}
            {/*                                    </Col>*/}
            {/*                                </Row>*/}
            {/*                            </CardBody>*/}
            {/*                            <CardFooter>*/}
            {/*                                <hr/>*/}
            {/*                                <div className="stats">*/}
            {/*                                    <i className="fas fa-sync-alt"/> Update now*/}
            {/*                                </div>*/}
            {/*                            </CardFooter>*/}
            {/*                        </Card>*/}
            {/*                    </Col>*/}
            {/*                </Row>*/}
            {/*            </Form>*/}

            {/* Create a form that has the option of symbols, length, numbers and upper case chars*/}
            {/* Create a button that generates a password based on the form*/}

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
                                    <Col className="pl-1" md="6">
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
