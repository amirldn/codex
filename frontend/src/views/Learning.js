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
    Card, CardHeader, CardBody, CardFooter, CardTitle, Row, Col, Button, Form, FormGroup, Label, Input, CardText
} from "reactstrap";
// core components
import 'animate.css';

function Learning() {


    return (<div className="content">
        <Row>
            <Col md="12">
                <h2 className="mb-2">Expand your knowledge</h2>
                <p>
                    This page provides you with helpful tips and tricks to keep your data, identity and system safe.
                    <br/>
                    <br/>
                    As easy as a one click Amazon purchase is, it can be just as easy for a hacker to do the same thing
                    but with your credit card for example! Keeping your data safe involves more than just a password,
                    vigilance is key.
                </p>
                <hr/>
            </Col>
        </Row>

        {/*    Create a sidebar with several cybersecurity topics then create a main card with detailed information about the topic from the sidebar*/}
        <Row>

            <Col md="3">
                <Card className="card-category">
                    <CardHeader>
                        <CardTitle tag="h4">Cyber Categories</CardTitle>
                    </CardHeader>
                    <CardBody>
                        <CardText>
                            <ul>
                                <li><a href="#passwords">Passwords</a></li>
                                <li><a href="#phishing">Phishing</a></li>
                                <li><a href="#social">Social Engineering</a></li>
                                <li><a href="#malware">Malware</a></li>
                                <li><a href="#ransomware">Ransomware</a></li>
                                <li><a href="#virus">Viruses</a></li>
                                <li><a href="#trojan">Trojans</a></li>
                                <li><a href="#spyware">Spyware</a></li>
                                <li><a href="#adware">Adware</a></li>
                                <li><a href="#botnet">Botnets</a></li>
                            </ul>
                        </CardText>
                    </CardBody>
                </Card>
            </Col>
            <Col md="9">
                <Card className="card-user">
                    <CardBody>
                        <CardText>
                            <h3>Passwords</h3>
                            <br/>
                            <h6>What is a password?</h6>
                            <p>A password is a secret word or phrase that allows you to gain access to your account.</p>
                            <br/>
                            <h6>Why is it important?</h6>
                            <p>Having a strong password is the first line of defense against hackers. If your password
                                is too
                                weak, hackers can easily guess it and gain access to your account.</p>
                            <br/>
                            <h6>How do I make a strong password?</h6>
                            <p>There are a few things to consider when making a strong password. First, it should be at
                                least 12 characters long. Next, it should include at least one number, one uppercase
                                letter, and one symbol. Finally, it should not include any of your personal information
                                (such as your name, birthday, etc.).</p>
                            <br/>
                            <h6>Why should I use a password manager?</h6>
                            <p>A password manager is a software application that stores all of your passwords in an
                                encrypted file. It is a good idea to use a password manager because it allows you to
                                have strong, unique passwords for all of your accounts. It also allows you to have a
                                different password for each account.</p>
                        </CardText>
                    </CardBody>
                </Card>
            </Col>


        </Row>


    </div>);
}

export default Learning;
