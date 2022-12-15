

import React, {useEffect} from "react";
import {Card, CardBody} from "reactstrap";

import 'animate.css';

// const TipContext = React.createContext({
//   tip: [], fetchTip: () => {
//   }
// })

export default function CyberTip(props) {


  const [tip, setTip] = React.useState({});
  const fetchTip = async () => {
    const response = await fetch('http://127.0.0.1:8000/cybertip/tip/');
    const data = await response.json();
    setTip(data.data);
  }



  // TODO: make this refresh the animation too
  // Refresh the component every 10 seconds but make it fetch as soon as it is loaded
    useEffect(() => {
        const interval = setInterval(() => {
            fetchTip();
        }, 10000);
        fetchTip();
        return () => clearInterval(interval);
    }, []);




  return (
    // <TipContext.Provider value={{tip, fetchTip}}>
      <div className="animate__animated animate__fadeInUp rounded p-1">
        <Card className="card-tip-of-the-day m-1">
            <CardBody>
              <h3><i className="nc-icon nc-bulb-63"/> Cyber Tip of the Day</h3>
              <h2>{tip.title}</h2>
              <p>{tip.description}</p>
              {/*<p>debug text - should show API above</p>*/}
            </CardBody>
        </Card>
        {/*<div className="rounded bg-secondary text-white">*/}
        {/*  <p>hello</p>*/}
        {/*</div>*/}
      </div>
    // </TipContext.Provider>

  )
}

