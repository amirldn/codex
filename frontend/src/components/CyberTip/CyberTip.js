

import React, {useEffect} from "react";
import {Card, CardBody} from "reactstrap";


const TipContext = React.createContext({
  tip: [], fetchTip: () => {
  }
})

export default function CyberTip(props) {


  const [tip, setTip] = React.useState({});
  const fetchTip = async () => {
    const response = await fetch('http://127.0.0.1:8000/cybertip/tip/');
    const data = await response.json();
    setTip(data.data);
  }

  useEffect(() => {
      fetchTip();
  }, []);

  return (
    <TipContext.Provider value={{tip, fetchTip}}>
      <div className="rounded bg-secondary p-1">
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
      </div>>
    </TipContext.Provider>

  )
}

