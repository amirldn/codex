

import React, {useEffect} from "react";
import {Card, CardBody, CardFooter, CardHeader, CardTitle, Col, Row} from "reactstrap";

import 'animate.css';
import CyberTip from "../CyberTip/CyberTip";

const TipContext = React.createContext({
  tip: [], fetchTip: () => {
  }
})

export default function SystemHealthDash(props) {


  const [tip, setTip] = React.useState({});
  const fetchTip = async () => {
    const response = await fetch('http://127.0.0.1:8000/cybertip/tip/');
    const data = await response.json();
    setTip(data.data);
  }



  // Refresh the component every 30 seconds but make it fetch as soon as it is loaded
    useEffect(() => {
        const interval = setInterval(() => {
            fetchTip();
        }, 30000);
        fetchTip();
        return () => clearInterval(interval);
    }, []);




  return (
    <TipContext.Provider value={{tip, fetchTip}}>
      <div className="animate__animated animate__fadeInUp rounded p-1">
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
              {/*<hr />*/}
              {/*<CyberTip />*/}
            </CardFooter>
          </Card>
      </div>
    </TipContext.Provider>

  )
}

