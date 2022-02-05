import React, { useEffect, useState, useRef } from 'react';
import { CSSTransition, SwitchTransition } from 'react-transition-group';

import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet'

import getLocation, { getLocationTemp } from '../services/location';
import getPlaces, { Place, PlaceRequest, randomPlace } from '../services/place';

import Loading from '../pages/Loading';
import Button from '../components/FeedMeButton';
import PlaceCard from '../components/PlaceCard';
import FilterPanel from '../components/FilterPanel';

import { placeArrow, placePin } from '../components/MarkerIcon';
import { sleep, cooldownTime } from '../services/cooldown';

import '../assets/styles/map.scss'

interface MapView {
    location: [number, number],
    zoom: number
}

function Frame() {
    const isInitialRender = useRef(true);

    const [loading, setLoading] = useState(true);
    const [initialLocation, setInitialLocation] =
        useState<[number, number]>([-31.9474, 115.8648]); // Perth, WA as default

    useEffect(() => {
        if(isInitialRender.current){
            getLocationTemp() // Switch to getLocation() - used to stop hitting API
                .then(res => {
                    if(res !== null) {
                        setInitialLocation([res.lat, res.lon]);
                    }
                    else {
                        // Request location via browser API
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
                        <Map location={initialLocation} zoom={15}/>}
                </CSSTransition>
            </SwitchTransition>
        </div>
    );
}

function Map(view: MapView) {
    // Track 3 different points on the map
    const [userLocation, setUserLocation] = useState<[number, number]>(view.location); // Users current location
    const [viewLocation, setLocation] = useState<[number, number]>(view.location); // Map view location
    const [marker, setMarker] = useState<[number, number]>([0.0, 0.0]);

    const [mapZoom, setMapZoom] = useState(view.zoom);

    // Currently unused 
    const [buttonMessage] = useState("Feed Me!");
    const [loading, setLoading] = useState(false);

    const [places, setPlaces] = useState<[Place] | null>(null);
    const [currentPlace, setCurrentPlace] = useState<Place | null>(null);

    const [cooldown, setCooldown] = useState(false);

    const [request, setRequest] = useState<PlaceRequest>({ // Default values
        latitude: userLocation[0],
        longitude: userLocation[1],
        radius: 400,
        min_price: 1,
        max_price: 4,
        rating: 3.0
    });

    async function fetchPlace() {
        if(!loading && !cooldown) {
            setLoading(true);
            setCooldown(true);

            // If non filterable params have changed
            if (places === null ) { // || paramsChanged
                await getPlaces(request).then((placesResponse) => {
                    if(placesResponse !== null) {
                        setPlaces(placesResponse);
                        displayPlace(placesResponse);
                    }
                }); // TODO: Handle error

            }
            else {
                displayPlace(places);
            }

            setLoading(false);

            await sleep(cooldownTime);
            setCooldown(false);

            //setButtonMessage("Again!!");
        }
    }

    function displayPlace(places: [Place]) {
        let place = randomPlace(places);

        while(place.location.lat === viewLocation[0] &&
            place.location.lng === viewLocation[1]) {
                place = randomPlace(places);
        }

        console.log(place);

        setCurrentPlace(place);

        setLocation([place.location.lat, place.location.lng]);
        setMarker([place.location.lat, place.location.lng]);
        setMapZoom(17.5);
    }

    // TODO: Set parameters

    return (
        <div className="mapFrame">
            { currentPlace !== null ?
                <PlaceCard place={currentPlace!}/> :
                null }
            <div className="filters">
                <FilterPanel
                    updateRequest={setRequest}
                    placeRequest={request}
                    setUserLocation={setUserLocation}/>
            </div>
            <div className="mapContainer">
                <MapContainer center={viewLocation}
                    zoom={mapZoom}
                    zoomControl={false}
                    scrollWheelZoom={true}>
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
                    <UpdateView location={viewLocation} zoom={mapZoom} />

                    <Marker position={userLocation} icon={placePin}/>
                    <Marker position={viewLocation} icon={placePin}/>
                    <Marker position={marker} icon={placeArrow}/>
                </MapContainer>

                <div className="footer">
                    © Leaflet, OpenStreetMap & Google
                    <span className="right">
                        Source      Privacy Policy      About
                    </span>
                </div>
            </div>

            <div onClick={() => fetchPlace()}>
            <Button
                message={buttonMessage}
                loading={loading}/>
            </div>
        </div>
    );
}

function UpdateView(view: MapView) {
    const map = useMap();

    var centre = map.getCenter();

    // Avoid shaking the map slightly if request to update view to same coordinate
    if(roundCoord(centre.lat) !== roundCoord(view.location[0]) &&
        roundCoord(centre.lng) !== roundCoord(view.location[1]))
    {
        map.flyTo(view.location, view.zoom, {
            animate: true,
            duration: 0.5
        });
    }

    return null;
}

function roundCoord(coord: number): number {
    return parseFloat(coord.toFixed(4))
}

export default Frame;