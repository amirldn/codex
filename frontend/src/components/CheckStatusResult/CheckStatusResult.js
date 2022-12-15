import React, {useEffect, useState} from "react";
import {Button, Card, CardBody, CardHeader, Col, Collapse, Row} from "reactstrap";

import 'animate.css';
import CheckStatus from "../CheckStatus/CheckStatus";

export default function CheckStatusResult(props) {


    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);


    return (
        <div className="animate__animated animate__fadeInUp rounded p-1">
            <Card className="card-check m-1">
                <CardHeader>

                    <Button className="btn btn-link" data-toggle="collapse" data-target="#collapseOne"
                            aria-expanded="true"
                            aria-controls="collapseOne"
                            onClick={toggle}>
                        <Row>
                            <Col md="8">
                                <Row>
                                    <Col md="10">
                                        <Row>
                                            <Col md="2">
                                                <b><i className='fa fa-user'/></b>
                                            </Col>
                                            <Col md="10">
                                                <b> Defender Enabled</b>
                                            </Col>
                                        </Row>

                                    </Col>
                                    <Col md="2">
                                        <i className="fa fa-chevron-down"/>
                                    </Col>
                                </Row>
                            </Col>
                            <Col md="4">
                                <i className="fa fa-check-circle fa-5x text-success"/>
                            </Col>
                        </Row>
                    </Button>
                </CardHeader>
                {/*<div id="collapseOne" className="collapse show" aria-labelledby="headingOne" data-parent="#accordion">*/}
                <Collapse isOpen={isOpen}>
                    <CardBody>
                        <Row>
                            <i>Checks if the Windows Defender service is enabled</i>
                        </Row>
                    </CardBody>
                </Collapse>
                {/*</div>*/}
            </Card>
        </div>
    )
}

// <div className="card">
//     <div className="card-header" id="headingOne">
//         <h5 className="mb-0">
//             <button className="btn btn-link" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true"
//                     aria-controls="collapseOne">
//                 Collapsible Group Item #1
//             </button>
//         </h5>
//     </div>
//
//     <div id="collapseOne" className="collapse show" aria-labelledby="headingOne" data-parent="#accordion">
//         <div className="card-body">
//             Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon
//             officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3
//             wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et.
//             Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan
//             excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt
//             you probably haven't heard of them accusamus labore sustainable VHS.
//         </div>
//     </div>
// </div>


{/*    <CardBody>*/
}
{/*        <Row>*/
}
{/*            <Col md="8">*/
}
{/*                <h5><i className='fa fa-user'/> Defender Enabled</h5>*/
}
{/*                <i>Checks if the Windows Defender service is enabled</i>*/
}
{/*            </Col>*/
}
{/*            <Col md="4">*/
}
{/*                <i className="fa fa-check-circle fa-5x text-success"/>*/
}
{/*            </Col>*/
}
{/*        </Row>*/
}

{/*    </CardBody>*/
}