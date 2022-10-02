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
import React from "react";
// react plugin used to create charts
import { Line, Pie } from "react-chartjs-2";
// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Row,
  Col
} from "reactstrap";
// core components
import {
  dashboard24HoursPerformanceChart,
  dashboardEmailStatisticsChart,
  dashboardNASDAQChart
} from "variables/charts.js";

function Dashboard() {
  return (
    <>
      <div className="content">
        <Row>
          <Col lg="3" md="6" sm="6">
            <Card className="card-stats">
              <CardBody>
                <Row>
                  <Col md="4" xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-globe text-warning" />
                    </div>
                  </Col>
                  <Col md="8" xs="7">
                    <div className="numbers">
                      <p className="card-category">Capacity</p>
                      <CardTitle tag="p">150GB</CardTitle>
                      <p />
                    </div>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
                <hr />
                <div className="stats">
                  <i className="fas fa-sync-alt" /> Update Now
                </div>
              </CardFooter>
            </Card>
          </Col>
          <Col lg="3" md="6" sm="6">
            <Card className="card-stats">
              <CardBody>
                <Row>
                  <Col md="4" xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-money-coins text-success" />
                    </div>
                  </Col>
                  <Col md="8" xs="7">
                    <div className="numbers">
                      <p className="card-category">Scans Ran</p>
                      <CardTitle tag="p">1,345</CardTitle>
                      <p />
                    </div>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
                <hr />
                <div className="stats">
                  <i className="far fa-calendar" /> Last day
                </div>
              </CardFooter>
            </Card>
          </Col>
          <Col lg="3" md="6" sm="6">
            <Card className="card-stats">
              <CardBody>
                <Row>
                  <Col md="4" xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-vector text-danger" />
                    </div>
                  </Col>
                  <Col md="8" xs="7">
                    <div className="numbers">
                      <p className="card-category">Errors</p>
                      <CardTitle tag="p">23</CardTitle>
                      <p />
                    </div>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
                <hr />
                <div className="stats">
                  <i className="far fa-clock" /> In the last week
                </div>
              </CardFooter>
            </Card>
          </Col>
          <Col lg="3" md="6" sm="6">
            <Card className="card-stats">
              <CardBody>
                <Row>
                  <Col md="4" xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-favourite-28 text-primary" />
                    </div>
                  </Col>
                  <Col md="8" xs="7">
                    <div className="numbers">
                      <p className="card-category">Followers</p>
                      <CardTitle tag="p">+45K</CardTitle>
                      <p />
                    </div>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
                <hr />
                <div className="stats">
                  <i className="fas fa-sync-alt" /> Update now
                </div>
              </CardFooter>
            </Card>
          </Col>
        </Row>
        {/*<Row>*/}
        {/*  <Col md="12">*/}
        {/*    <Card>*/}
        {/*      <CardHeader>*/}
        {/*        <CardTitle tag="h5">Users Behavior</CardTitle>*/}
        {/*        <p className="card-category">24 Hours performance</p>*/}
        {/*      </CardHeader>*/}
        {/*      <CardBody>*/}
        {/*        <Line*/}
        {/*          data={dashboard24HoursPerformanceChart.data}*/}
        {/*          options={dashboard24HoursPerformanceChart.options}*/}
        {/*          width={400}*/}
        {/*          height={100}*/}
        {/*        />*/}
        {/*      </CardBody>*/}
        {/*      <CardFooter>*/}
        {/*        <hr />*/}
        {/*        <div className="stats">*/}
        {/*          <i className="fa fa-history" /> Updated 3 minutes ago*/}
        {/*        </div>*/}
        {/*      </CardFooter>*/}
        {/*    </Card>*/}
        {/*  </Col>*/}
        {/*</Row>*/}
        {/*<Row>*/}
        {/*  <Col md="4">*/}
        {/*    <Card>*/}
        {/*      <CardHeader>*/}
        {/*        <CardTitle tag="h5">Email Statistics</CardTitle>*/}
        {/*        <p className="card-category">Last Campaign Performance</p>*/}
        {/*      </CardHeader>*/}
        {/*      <CardBody style={{ height: "266px" }}>*/}
        {/*        <Pie*/}
        {/*          data={dashboardEmailStatisticsChart.data}*/}
        {/*          options={dashboardEmailStatisticsChart.options}*/}
        {/*        />*/}
        {/*      </CardBody>*/}
        {/*      <CardFooter>*/}
        {/*        <div className="legend">*/}
        {/*          <i className="fa fa-circle text-primary" /> Opened{" "}*/}
        {/*          <i className="fa fa-circle text-warning" /> Read{" "}*/}
        {/*          <i className="fa fa-circle text-danger" /> Deleted{" "}*/}
        {/*          <i className="fa fa-circle text-gray" /> Unopened*/}
        {/*        </div>*/}
        {/*        <hr />*/}
        {/*        <div className="stats">*/}
        {/*          <i className="fa fa-calendar" /> Number of emails sent*/}
        {/*        </div>*/}
        {/*      </CardFooter>*/}
        {/*    </Card>*/}
        {/*  </Col>*/}
        {/*  <Col md="8">*/}
        {/*    <Card className="card-chart">*/}
        {/*      <CardHeader>*/}
        {/*        <CardTitle tag="h5">NASDAQ: AAPL</CardTitle>*/}
        {/*        <p className="card-category">Line Chart with Points</p>*/}
        {/*      </CardHeader>*/}
        {/*      <CardBody>*/}
        {/*        <Line*/}
        {/*          data={dashboardNASDAQChart.data}*/}
        {/*          options={dashboardNASDAQChart.options}*/}
        {/*          width={400}*/}
        {/*          height={100}*/}
        {/*        />*/}
        {/*      </CardBody>*/}
        {/*      <CardFooter>*/}
        {/*        <div className="chart-legend">*/}
        {/*          <i className="fa fa-circle text-info" /> Tesla Model S{" "}*/}
        {/*          <i className="fa fa-circle text-warning" /> BMW 5 Series*/}
        {/*        </div>*/}
        {/*        <hr />*/}
        {/*        <div className="card-stats">*/}
        {/*          <i className="fa fa-check" /> Data information certified*/}
        {/*        </div>*/}
        {/*      </CardFooter>*/}
        {/*    </Card>*/}
        {/*  </Col>*/}
        {/*</Row>*/}
        <Row>

            <Col md="12">
              <Card className="card-status">
                <CardHeader>
                  <CardTitle tag="h5">Status</CardTitle>
                  <p className="card-category">System Cyber Health</p>
                </CardHeader>
                <CardBody>
                  <Row>
                    <Col md="2"><h1><i className="nc-icon nc-check-2"></i></h1></Col>
                    <Col md="10">

                    <h2>All good!</h2>
                    <p>On the last run, we saw no issues with your system.</p>
                      <p>Last Run: 12 Sep - 08:38</p>
                    </Col>
                    </Row>
                </CardBody>
                <CardFooter>
                  <div className="rounded bg-secondary p-1">
                    <Card className="card-tip-of-the-day m-1">
                        <CardBody>
                            <h3><i className="nc-icon nc-bulb-63"/> Cyber Tip of the Day</h3>
                            <p>Use the <b>System Status</b> page to see the health of your system. If you see any issues, you can click on the issue to see more details.</p>
                        </CardBody>
                    </Card>
                    {/*<div className="rounded bg-secondary text-white">*/}
                    {/*  <p>hello</p>*/}
                    {/*</div>*/}
                  </div>
                </CardFooter>
              </Card>
            </Col>
        </Row>
      </div>
    </>
  );
}

export default Dashboard;
