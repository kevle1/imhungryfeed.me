import React, { useEffect, useState } from 'react';
import { CSSTransition, SwitchTransition } from 'react-transition-group';

import getLocation, { getLocationTemp } from '../services/location';

import Loading from '../pages/Loading';
import Button from '../components/FeedMeButton';
import '../assets/styles/map.scss'

function Frame() {
  const [loading, setLoading] = useState(true);

    useEffect(() => {
        getLocationTemp() // Switch to getLocation() - used to stop hitting API
        .then(res => {
            console.log(res);
            setLoading(false)
        });
    });

    return (
        <div className="main">
            <SwitchTransition mode="out-in">
                <CSSTransition
                key={loading.toString()}
                addEndListener={(node, done) => {
                    node.addEventListener("transitionend", done, false);
                }}
                classNames="loadingTransition"
                >
                    {loading ? <Loading/> : <Map/>}
                </CSSTransition>
            </SwitchTransition>
        </div>
    );
}

function Map(){
    return (
        <div className="mapFrame">
            <div className="interaction">
                {/* Interaction components go here (button, etc) */}
            </div>
            <div className="mapContainer">

            </div>
            <Button/>
        </div>
    );
}

export default Frame;