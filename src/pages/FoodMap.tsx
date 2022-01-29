import React, { useEffect, useState, useRef } from 'react';
import { CSSTransition, SwitchTransition } from 'react-transition-group';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'

import getLocation, { getLocationTemp } from '../services/location';

import Loading from '../pages/Loading';
import Button from '../components/FeedMeButton';
import '../assets/styles/map.scss'

interface MapView {
    location: [number, number];
}

function Frame() {
    const isInitialRender = useRef(true);

    const [loading, setLoading] = useState(true);
    const [location, setLocation] = useState<[number, number]>([-31.9474, 115.8648]); // Perth, WA as default

    useEffect(() => {
        if(isInitialRender.current){
            getLocationTemp() // Switch to getLocation() - used to stop hitting API
                .then(res => {
                    if(res !== null) {
                        setLocation([res.lat, res.lon]);
                    }

                    setLoading(false);
                });

            isInitialRender.current = false;
            return;
        }
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
                    {loading ?
                        <Loading/> :
                        <Map location={location}/>}
                </CSSTransition>
            </SwitchTransition>
        </div>
    );
}

function Map(view: MapView) {
    return (
        <div className="mapFrame">
            <div className="mapContainer">
                <MapContainer center={view.location}
                    zoom={15}
                    scrollWheelZoom={true}>
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
                    {/* <Marker position={[51.505, -0.09]}>
                        <Popup>
                        A pretty CSS3 popup. <br /> Easily customizable.
                        </Popup>
                    </Marker> */}
                </MapContainer>
            </div>
            <Button/> 
        </div>
    );
}

export default Frame;