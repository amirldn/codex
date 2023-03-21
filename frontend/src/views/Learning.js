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

    const tips = [{
        title: "Introduction", icon: "fa fa-info-circle", body: (<div>
            <h6>What is Cybersecurity?</h6>
            <p>Cybersecurity is the practice of protecting your computer, network, and data from
                unauthorized access or attacks. It is important to keep your computer and network
                secure
                because hackers can steal your personal information, such as your credit card
                numbers,
                passwords, and social security numbers.</p>
            <br/>
            <h6>Why is it important?</h6>
            <p>Having a secure computer and network is important because hackers can steal your
                personal
                information, such as your credit card numbers, passwords, and social security
                numbers.</p>
            <br/>
            <h6>How do I keep my computer and network secure?</h6>
            <p>There are a few things you can do to keep your computer and network secure. First,
                you
                should make sure that your computer and network are up to date. Next, you should
                install
                antivirus software and keep it up to date. Finally, you should use strong passwords
                and
                never share them with anyone.</p>
            <p>The National Cyber Security Centre is a government agency that provides advice on how
                to keep your computer and network secure.
                <br/>
                You can find more information on their website <a href="https://www.ncsc.gov.uk/"> here</a>.
            </p>
        </div>)
    }, {
        title: "Passwords", icon: "fa fa-key", body: (<div>
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
            You can use the password generator tool built into Codex to generate a strong password for you!
            <br/>
            Try using it <a href={"/admin/tools/password"}> here</a>.
            <br/>
            <br/>
            <h6>Why should I use a password manager?</h6>
            <p>A password manager is a software application that stores all of your passwords in an
                encrypted file. It is a good idea to use a password manager because it allows you to
                have strong, unique passwords for all of your accounts. It also allows you to have a
                different password for each account.</p>
        </div>)
    }, {
        title: "Phishing", icon: "fa fa-fish", body: (<div>
            <h6>What is phishing?</h6>
            <p>Phishing is a type of cyberattack in which hackers send fake emails or text messages to
                trick
                you into giving them your personal information.</p>
            <br/>
            <h6>Why is it important?</h6>
            <p>Phishing is important because hackers can use your personal information to steal your
                money
                or identity.</p>
            <br/>
            <h6>How do I avoid phishing?</h6>
            <p>There are a few things you can do to avoid phishing. First, you should never click on
                links
                or attachments in emails or text messages from people you don't know. Next, you
                should
                never give out your personal information over the phone or in an email. Finally, you
                should
                never give out your personal information to anyone who calls you.</p>
        </div>)
    }, {
        title: "Malware", icon: "fa fa-bug", body: (<div>
            <h6>What is malware?</h6>
            <p>Malware is a type of software that is designed to cause damage to your computer or
                network.</p>
            <br/>
            <h6>Why is it important?</h6>

            <p>Malware is important because it can cause damage to your computer or network.</p>
            <br/>
            <h6>How do I avoid malware?</h6>
            <p>There are a few things you can do to avoid malware. First, you should never download
                software from untrusted sources. Next, you should never open emails or text messages
                from
                people you don't know. Finally, you should never click on links or attachments in
                emails
                or text messages from people you don't know.</p>
        </div>)
    }, {
        title: "Social Engineering", icon: "fa fa-user-friends", body: (<div>
            <h6>What is social engineering?</h6>

            <p>Social engineering is a type of cyberattack in which hackers use social skills to trick
                you
                into giving them your personal information.</p>
            <br/>
            <h6>Why is it important?</h6>
            <p>Social engineering is important because hackers can use your personal information to
                steal
                your money or identity.</p>
            <br/>
            <h6>How do I avoid social engineering?</h6>
            <p>There are a few things you can do to avoid social engineering. First, you should never
                give
                out your personal information over the phone or in an email. Next, you should never
                give
                out your personal information to anyone who calls you. Finally, you should never

                click on links or attachments in emails or text messages from people you don't know.</p>
        </div>)
    }, {
        title: "Ransomware", icon: "fa fa-lock", body: (<div>
            <h6>What is ransomware?</h6>
            <p>Ransomware is a type of malware that locks your computer or network until you pay a
                ransom.</p>
            <br/>
            <h6>Why is it important?</h6>

            <p>Ransomware is important because it can lock your computer or network until you pay a
                ransom.</p>
            <br/>

            <h6>How do I avoid ransomware?</h6>

            <p>There are a few things you can do to avoid ransomware. First, you should never click on
                links or attachments in emails or text messages from people you don't know. Next, you
                should
                never download software from untrusted sources. Finally, you should never open emails
                or
                text messages from people you don't know.</p>
        </div>)
    }, {
        title: "Viruses", icon: "fa fa-virus", body: (<div>
            <h6>What is a virus?</h6>
            <p>A virus is a type of malware that can replicate itself and spread to other computers
                and
                networks.</p>
            <br/>
            <h6>Why is it important?</h6>
            <p>Viruses can quickly spread across networks (including your own local home environment) and infect
                other
                devices.
            </p>
            <br/>
            <h6>How do I avoid viruses?</h6>
            <p>There are a few things you can do to avoid viruses. First, you should never click on
                links
                or attachments in emails or text messages from people you don't know. Next, you
                should

                never download software from untrusted sources. Finally, you should never open emails
                or
                text messages from people you don't know.</p>
        </div>)
    }, {
        title: "Trojans", icon: "fa fa-horse", body: (<div>
            <h6>What is a Trojan?</h6>
            <p>A Trojan is a type of malware that is disguised as a legitimate program. They can be in the form of
                malware
                or a virus.</p>
            <br/>
            <h6>Why is it important?</h6>
            <p>Trojans are important because they can be disguised as legitimate programs and can be difficult to
                detect.
                When downloading files or programs from the internet, even a trusted source could become compromised
                and
                infect your device with a trojan.
            </p>

            <br/>
            <h6>How do I avoid Trojans?</h6>
            <p>There are a few things you can do to avoid Trojans. First, you should never click on
                links
                or attachments in emails or text messages from people you don't know. Next, you
                should
                never download software from untrusted sources. You should ensure you have some form of real time
                malware
                protection set up on your machine. To go the extra mile, often a website will display the 'hash' of
                a
                file
                which indicates a form of mathematical signature for a file that they have created. After a file has
                been
                downloaded, you can generate a mathemtical signature using your file and double check it is the same
                as
                what
                the site have provided.</p>
        </div>),
    }, {
        title: "Spyware", icon: "fa fa-eye", body: (<div>
            <h6>What is spyware?</h6>
            <p>Spyware is a type of malware that is designed to collect information about you without your
                knowledge.</p>
            <br/>
            <h6>Why is it important?</h6>
            <p>Spyware is important because it can collect information about you without your knowledge.</p>
            <br/>
            <h6>How do I avoid spyware?</h6>
            <p>There are a few things you can do to avoid spyware. First, you should never click on
                links
                or attachments in emails or text messages from people you don't know. Next, you
                should
                never download software from untrusted sources. Finally, you should never open emails
                or
                text messages from people you don't know.</p>
        </div>),
    }, {
        title: "Adware", icon: "fa fa-ad", body: (<div>
            <h6>What is adware?</h6>

            <p>Adware is a type of malware that is designed to display advertisements on your computer or mobile
                device.</p>
            <br/>
            <h6>Why is it important?</h6>
            <p>Adware is important because it means that your device will be constantly fetching adverts and
                distrupting
                your experience. It can also lead to slowness on your machine as processing power is spent
                displaying
                ads instead of running the applications that you want.</p>
            <br/>
            <h6>How do I avoid adware?</h6>
            <p>There are a few things you can do to avoid adware. First, you should avoid clicking on links or
                attachments in emails or text messages from people you don't know. An adblocker is a great way to
                avoid
                adware. You can install an adblocker on your browser or on your device. If you are using a mobile
                device,
                you can find one on your device's app store. If you are using a desktop, you can install an
                adblocker as
                a browser extension.</p>
        </div>),
    }, {
        title: "Botnet", icon: "fa fa-robot", body: (<div>
            <h6>What is a botnet?</h6>
            <p>A botnet is a network of computers that have been infected with malware and are controlled by a
                hacker.</p>
            <br/>
            <h6>Why is it important?</h6>
            <p>Botnets are important because they can be used to launch attacks on other computers and networks.</p>
            <br/>
            <h6>How do I avoid botnets?</h6>
            <p>There are a few things you can do to avoid botnets. First, you should never click on
                links
                or attachments in emails or text messages from people you don't know. Next, you
                should
                never download software from untrusted sources. Having a real-time system scanner is also valuable
                as it
                will be able to scan for suspicious activity on your system.</p>
        </div>)
    }, {
        title: "2 Factor Authentication", icon: "fa fa-shield-alt", body: (<div>
            <h6>What is 2 Factor Authentication?</h6>
            <p>2 Factor Authentication is a security feature that requires you to enter a code in
                addition to
                your password to gain access to your account. In fact, you may have been using a form of 2FA without
                knowing it in the form of a credit/debit card. In order to withdraw money from an ATM, you need two
                forms of authentication, a physical card & a PIN number. There is no 'username' option when
                withdrawing
                from an ATM as your identity is resolved from the physical card.</p>
            <br/>
            <h6>Why is it important?</h6>
            <p>2 Factor Authentication is important because it makes it harder for hackers to gain
                access to
                your account as they require two forms of authentication to gain entry. It can be a bit of an
                annoyance
                to use however it is one of the best forms of security.</p>
            <br/>
            <h6>How do I enable 2 Factor Authentication?</h6>
            <p>2 Factor Authentication is slowly becoming an option on more and more websites. You should enable it
                where possible, especially on sites that house sensitive data such as emails, social media websites
                &
                online storage sites like iCloud. Online banking sites often have these options by default.</p>
        </div>)
    }];


    const [selectedTip, setSelectedTip] = useState(0);
    const [tipTitle, setTipTitle] = useState(tips[selectedTip].title);
    const [tipBody, setTipBody] = useState(tips[selectedTip].body);
    const [tipIcon, setTipIcon] = useState(tips[selectedTip].icon);

    useEffect(() => {
        setTipTitle(tips[selectedTip].title);
        setTipBody(tips[selectedTip].body);
        setTipIcon(tips[selectedTip].icon);
    }, [selectedTip]);

    function handleTipChange(newValue) {
        setSelectedTip(newValue);
    }

    return (<div className="content">
        <Row>
            <Col md="12">
                <h2 className="mb-2">Expand your knowledge</h2>
                <p>
                    This page provides you with helpful tips and tricks to keep your data, identity and system
                    safe.
                    <br/>
                    <br/>
                    As easy as a one click Amazon purchase is, it can be just as easy for a hacker to do the
                    same
                    thing
                    but with your credit card! Keeping your data safe involves more than just a
                    password,
                    vigilance is key.
                </p>
                <hr/>
            </Col>
        </Row>

        <Row>
            <Col md="3">
                <Card className="card-category" style={{height: '100%', marginBottom: '0'}}>
                    <CardHeader>
                        <CardTitle tag="h4">Cyber Categories</CardTitle>
                    </CardHeader>
                    <CardBody>
                        <ul>
                            {/*TODO: Change this from href to link that changes state instead*/}
                            <li><a href="javascript:void(0);" onClick={() => handleTipChange(0)}><i
                                className={tips[0].icon}/> Introduction</a></li>
                            <li><a href="javascript:void(0);" onClick={() => handleTipChange(1)}><i
                                className={tips[1].icon}/> Passwords</a></li>
                            <li><a href="javascript:void(0);" onClick={() => handleTipChange(1)}><i
                                className={tips[11].icon}/> 2-Factor Authentication</a></li>
                            <li><a href="javascript:void(0);" onClick={() => handleTipChange(2)}><i
                                className={tips[2].icon}/> Phishing</a></li>
                            <li><a href="javascript:void(0);" onClick={() => handleTipChange(4)}><i
                                className={tips[3].icon}/> Malware</a></li>
                            <li><a href="javascript:void(0);" onClick={() => handleTipChange(4)}><i
                                className={tips[4].icon}/> Social Engineering</a></li>
                            <li><a href="javascript:void(0);" onClick={() => handleTipChange(5)}><i
                                className={tips[5].icon}/> Ransomeware</a></li>
                            <li><a href="javascript:void(0);" onClick={() => handleTipChange(6)}><i
                                className={tips[6].icon}/> Viruses</a></li>
                            <li><a href="javascript:void(0);" onClick={() => handleTipChange(7)}><i
                                className={tips[7].icon}/> Trojan</a></li>
                            <li><a href="javascript:void(0);" onClick={() => handleTipChange(8)}><i
                                className={tips[8].icon}/> Spyware</a></li>
                            <li><a href="javascript:void(0);" onClick={() => handleTipChange(9)}><i
                                className={tips[9].icon}/> Adware</a></li>
                            <li><a href="javascript:void(0);" onClick={() => handleTipChange(10)}><i
                                className={tips[10].icon}/> Botnets</a></li>
                        </ul>
                    </CardBody>
                </Card>
            </Col>
            <Col md="9">
                <Card className="card-user">
                    <CardBody>
                        <h3><i className={tipIcon}/> {tipTitle}</h3>
                        {tipBody}
                    </CardBody>
                </Card>
            </Col>
        </Row>
    </div>);
}

export default Learning;
