import React, {useEffect} from "react";
import {Card, CardBody} from "reactstrap";

import 'animate.css';

export default function CyberTip(props) {
    const [tip, setTip] = React.useState({});
    const [animationKey, setAnimationKey] = React.useState(0);
    const fetchTip = async () => {
        const response = await fetch('http://127.0.0.1:8000/cybertip/tip/');
        const data = await response.json();
        setTip(data.data);
    }


    // Refresh the component every 10 seconds but make it fetch as soon as it is loaded
    useEffect(() => {
        const interval = setInterval(() => {
            fetchTip();
        }, 10000);
        fetchTip();
        return () => clearInterval(interval);
    }, []);

    return (
        <div key={tip.title}
             className="animate__animated animate__headShake p rounded p-1">
            <Card className="card-tip-of-the-day m-1">
                <CardBody>
                    <h3 style={{'marginBottom' : '2%'}}><i className="nc-icon nc-bulb-63"/> Cyber Tips</h3>
                    <h2 style={{'marginBottom' : '1%'}}>{tip.title}</h2>
                    <p >{tip.description}</p>
                </CardBody>
            </Card>
        </div>

    )
}

