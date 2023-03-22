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
    Col,
    Button,
    Form,
    FormGroup,
    Label,
    Input,
    CardText,
    Container
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
            <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>


                <iframe width="560" height="315" src="https://www.youtube.com/embed/88-FENio9Yw"
                        title="YouTube video player" frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen></iframe>
            </div>
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

            <br/>
            <h6>Password Strength Checker</h6>
            <p>You can use the password strength checker below to check the strength of your password. It is safe to
                enter your real password here as it is not stored anywhere however you should refrain from doing so.
                The tool is more useful for checking the strength of a password you are considering using.
            </p>
            <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>

                <iframe src="https://www.security.org/how-secure-is-my-password/" title="Password Strength Checker"
                        width='560' height='500'
                ></iframe>

            </div>
        </div>)
    }, {
        title: "Phishing", icon: "fa fa-fish", body: (<div>
            <h6>What is phishing?</h6>
            <p>Phishing is a type of cyberattack in which hackers send fake emails or text messages to
                trick
                you into giving them your personal information.</p>
            <br/>
            <h6>Why is it important?</h6>
            <p>Phishing attacks have been around for a long time and are commonplace. They are present in many different
                forms including but not limited to emails, text messages, phone calls, and even in person. Some phishing
                attempts are very convincing and can be difficult to spot which is why
                vigilance is key.
            </p>
            <br/>
            <h6>How do I avoid phishing?</h6>
            <p>There are a few things you can do to avoid phishing. Clicking links in emails / texts is the most common
                way
                that attackers are able to get you to visit their malicious websites. Ensure that the person or business
                sending you the email is legitimate before clicking any links. If you are unsure, you can double check
                the sender's email address or phone number and compare it to what you are able to find from a trusted
                source such as the business' official website. It's important to be skeptical as to what details you are
                being asked to enter into any online form. If you are unsure, you can always contact the business
                <br/>
                <br/>
                <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>

                    <iframe width="560" height="315" src="https://www.youtube.com/embed/Yz0PnAkeRiI"
                            title="YouTube video player" frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen></iframe>
                </div>
            </p>
        </div>)
    }, {
        title: "Malware", icon: "fa fa-bug", body: (<div>
            <h6>What is malware?</h6>
            <p>Malware is a type of software that is designed to cause damage to your computer or
                network. Malware is any software designed to harm or exploit another component of hardware or software
                is referred to as malware. Malware, which stands for "malicious software," is a catch-all word for all
                forms of malicious
                software and code, including Trojans, spyware, ransomware, and viruses.</p>
            <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>

                <iframe width="560" height="315" src="https://www.youtube.com/embed/NMYbkzjI5EY"
                        title="YouTube video player" frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen></iframe>
            </div>
            <br/>
            <h6>Why is it dangerous?</h6>

            <p>
                Malware can cause damage to your computer or network in a variety of ways as it an umbrella term.
            </p>
            <br/>
            <h6>How do I avoid malware?</h6>
            <p>You should ensure that you have antivirus software installed on your computer that has realtime
                protection as a feature. Some good recommendations are
                <a href={"https://www.avast.com/en-us/index"}> Avast</a>
                ,
                <a href='https://www.malwarebytes.com/'> Malwarebytes</a>
                , and
                <a href={"https://www.bitdefender.com/solutions/free.html"}> Bitdefender</a>
                .
                You should also ensure that you are using a strong password and that you are not clicking on any
                suspicious links or attachments in emails or text messages. Avoiding pirated software is

            </p>
        </div>)
    }, {
        title: "Social Engineering", icon: "fa fa-user-friends", body: (<div>
            <h6>What is social engineering?</h6>

            <p>Social engineering is a type of cyberattack in which hackers use social skills to trick
                you
                into giving them your personal information for malicious intent.</p>
            <br/>
            <h6>Why is it important?</h6>
            <p>Social engineering is important because hackers can use your personal information to
                steal
                your money or identity. This can then be used to impersonate you (fraud) with benefit to the
                hacker. </p>
            <br/>
            <h6>How do I avoid social engineering?</h6>
            <p>Vigilance is key when it comes to social engineering. If you are unsure about something, you should
                always check that the person/site asking for your information is legitimate. You can do this by
                double checking the sender's email address or phone number and comparing it to what you are able to
                find
                from a trusted source such as the business' official website. If you are being called on the phone
                and
                being asked to provide details, it's often good practice to call back the official phone number
                found
                from a trusted source as many attackers are able to spoof phone numbers so that they look official.
                <br/>
                <br/>
                <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>

                    <iframe width="560" height="315" src="https://www.youtube.com/embed/Vo1urF6S4u0"
                            title="YouTube video player" frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen></iframe>
                </div>

            </p>
        </div>)
    }, {
        title: "Ransomware", icon: "fa fa-lock", body: (<div>
            <h6>What is ransomware?</h6>
            <p>Ransomware is a type of malware that locks (and encrypts) your computer or network until you pay a
                ransom. Here is a short video that explains it.</p>
            <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                <iframe width="560" height="315" src="https://www.youtube.com/embed/-KL9APUjj3E"
                        title="YouTube video player" frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen></iframe>
            </div>
            <br/>
            <h6>Why is it important?</h6>

            <p>Ransomware has recently seen a rise in popularity as it is a very profitable business for hackers.
                There have been recent cases of hackers locking entire school districts' computers and more vital
                systems, such as hospitals, until they pay a ransom. The <a
                    href='https://www.theguardian.com/technology/2022/aug/11/nhs-ransomware-attack-what-happened-and-how-bad-is-it'>NHS
                    was recently hit with a ransomware attack</a> that caused distruption around the UK.

            </p>
            <br/>

            <h6>How do I avoid ransomware?</h6>
            <p>Ransomware is tricky to avoid because it can be installed on your computer without you knowing. The
                usual
                rules apply of
                not downloading software from untrusted sources, not clicking on links or attachments in emails or
                text
                messages from people you don't know.
                In the unfortunate event that you do get ransomware, you can try to remove it using the <a
                    href='https://www.bleepingcomputer.com/download/rkill/'>Rkill tool</a>.
                It's also advisable to maintain backups of your data so that you can restore it if you do get
                ransomware.

            </p>
        </div>)
    }, {
        title: "2 Factor Authentication", icon: "fa fa-shield-alt", body: (<div>
            <h6>What is 2 Factor Authentication?</h6>
            <p>2 Factor Authentication is a security feature that requires you to enter a code in
                addition to
                your password to gain access to your account. In fact, you may have been using a form of 2FA
                without
                knowing it in the form of a credit/debit card. In order to withdraw money from an ATM, you need
                two
                forms of authentication, a physical card & a PIN number. There is no 'username' option when
                withdrawing
                from an ATM as your identity is resolved from the physical card.</p>
            <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                <iframe width="560" height="315" src="https://www.youtube.com/embed/hGRii5f_uSc"
                        title="YouTube video player" frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen></iframe>
            </div>
            <br/>
            <h6>Why is it important?</h6>
            <p>2 Factor Authentication is important because it makes it harder for hackers to gain
                access to
                your account as they require two forms of authentication to gain entry. It can be a bit of an
                annoyance
                to use however it is one of the best forms of security.</p>
            <br/>
            <h6>How do I enable 2 Factor Authentication?</h6>
            <p>2 Factor Authentication is slowly becoming an option on more and more websites. You should enable
                it
                where possible, especially on sites that house sensitive data such as emails, social media
                websites
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
                            <li><a href="javascript:void(0);" onClick={() => handleTipChange(0)}><i
                                className={tips[0].icon}/> Introduction</a></li>
                            <li><a href="javascript:void(0);" onClick={() => handleTipChange(1)}><i
                                className={tips[1].icon}/> Passwords</a></li>
                            <li><a href="javascript:void(0);" onClick={() => handleTipChange(6)}><i
                                className={tips[6].icon}/> 2-Factor Authentication</a></li>
                            <li><a href="javascript:void(0);" onClick={() => handleTipChange(2)}><i
                                className={tips[1].icon}/> Phishing</a></li>
                            <li><a href="javascript:void(0);" onClick={() => handleTipChange(3)}><i
                                className={tips[3].icon}/> Malware</a></li>
                            <li><a href="javascript:void(0);" onClick={() => handleTipChange(4)}><i
                                className={tips[4].icon}/> Social Engineering</a></li>
                            <li><a href="javascript:void(0);" onClick={() => handleTipChange(5)}><i
                                className={tips[5].icon}/> Ransomeware</a></li>
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
