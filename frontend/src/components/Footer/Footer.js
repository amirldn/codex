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
import React from "react";
import {Container, Row} from "reactstrap";
// used for making the prop types of this component
import PropTypes from "prop-types";

function Footer(props) {
    return (<footer className={"footer" + (props.default ? " footer-default" : "")}>
            <Container fluid={props.fluid ? true : false}>
                <Row>
                    <nav className="footer pl-4">
                        <ul>
                            <li>
                                <div className="logo-img">
                                    <img src="https://i.imgur.com/NZ9guHn.png" alt="react-logo"
                                         style={{'width': '40px'}}/>
                                </div>
                            </li>
                            <li>
                                <a href="javascript:void(0);" target="_blank">
                                    Codex
                                </a>
                            </li>
                        </ul>
                    </nav>
                    <div className="credits ml-auto footer">
                        <div className="copyright">
                            &copy; {1900 + new Date().getYear()}, made with{" "}
                            <i className="fa fa-heart heart"/> by Amir Maula
                        </div>
                    </div>
                </Row>
            </Container>
        </footer>);
}

Footer.propTypes = {
    default: PropTypes.bool, fluid: PropTypes.bool
};

export default Footer;
