import React, { useEffect, useState, useRef } from 'react';
import { CSSTransition, SwitchTransition } from 'react-transition-group';

import { MapContainer, TileLayer, Marker, Circle, useMap, useMapEvents } from 'react-leaflet'

import getLocation from '../services/location';
import getPlaces, { Place, PlaceRequest, randomPlace } from '../services/place';

import Loading from '../pages/Loading';
import Tab from '../components/Tab';
import Button from '../components/FeedMeButton';
import PlaceCard from '../components/PlaceCard';
import FilterPanel from '../components/FilterPanel';

import { placeArrow, placeLocationTarget, placeTarget } from '../components/MarkerIcon';
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
            getLocation()
                .then(res => {
                    if(res !== null) {
                        setInitialLocation([res.lat, res.lon]);
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
    const [userLocation, setUserLocation] =
    useState<[number, number]>(view.location); // Users current location

    const [viewLocation, setViewLocation] =
     useState<[number, number]>(view.location); // Map view location

    const [placeMarker, setPlaceMarker] =
        useState<[number, number]>([0.0, 0.0]);

    const [mapZoom, setMapZoom] = useState(view.zoom);

    const [buttonMessage] = useState("Feed Me!");
    const [loading, setLoading] = useState(false);

    const [places, setPlaces] =
        useState<[Place] | null>(null);

    const [currentPlace, setCurrentPlace] =
        useState<Place | null>(null);

    const [cooldown, setCooldown] = useState(false);

    const [showDrawer, setShowDrawer] = useState(true);

    const [request, setRequest] = useState<PlaceRequest>({ // Default values
        latitude: userLocation[0],
        longitude: userLocation[1],
        radius: 400,
        min_price: 1,
        max_price: 4,
        rating: 3.0
    });

    useEffect(() => {
        setPlaces(null);
    }, [request]); // When filters updated, clear places result

    async function fetchPlace() {
        if(!loading && !cooldown) {
            setLoading(true);
            setCooldown(true);

            if (places === null ) {
                await getPlaces(request).then((placesResponse) => {
                    if(placesResponse !== null) {
                        setPlaces(placesResponse);
                        displayPlace(placesResponse);
                    }
                }).catch((error) =>
                     alert("Error: Could not get places"));
            }
            else {
                displayPlace(places);
            }

            setLoading(false);

            await sleep(cooldownTime);
            setCooldown(false);
        }
    }

    function displayPlace(places: [Place]) {
        setShowDrawer(false);
        let place = randomPlace(places);

        while(place.location.lat === viewLocation[0] &&
            place.location.lng === viewLocation[1]) {
                place = randomPlace(places);
        }

        setCurrentPlace(place);

        setViewLocation([place.location.lat, place.location.lng]);
        setPlaceMarker([place.location.lat, place.location.lng]);
        setMapZoom(17.5);
    }

    function UpdateView(view: MapView) {
        const map = useMap();

        useMapEvents({
            click(e) {
                setCurrentPlace(null);
                setPlaces(null);

                let placeRequest = { ...request };

                placeRequest.latitude = e.latlng.lat;
                placeRequest.longitude = e.latlng.lng;

                setMapZoom(15);

                setUserLocation([
                    e.latlng.lat,
                    e.latlng.lng
                ]);

                setViewLocation([
                    e.latlng.lat,
                    e.latlng.lng
                ]);

                setRequest(placeRequest);
            },
        })

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

    return (
        <div className="mapFrame">
            { currentPlace !== null ?
                <PlaceCard place={currentPlace!}/> :
                null }
            <div className="filters">
                { showDrawer ? <FilterPanel
                    updateRequest={setRequest}
                    placeRequest={request}
                    setUserLocation={setUserLocation}
                    setViewLocation={setViewLocation}
                    showPanel={setShowDrawer}/> : null}

                <div onClick={() => setShowDrawer(true)}>
                    <Tab/>
                </div>
            </div>
            <div className="mapContainer">
                <MapContainer center={viewLocation}
                    zoom={mapZoom}
                    zoomControl={false}
                    scrollWheelZoom={true}

                    >
                    <TileLayer url="https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.png"/>
                    <UpdateView location={viewLocation} zoom={mapZoom} />

                    <Circle center={userLocation}
                        radius={request.radius + 300} // Google radius appears to be much larger
                        color="#fa4a0a"
                        fillOpacity={0}/>

                    { currentPlace !== null ?
                        <>
                            <Marker position={placeMarker} icon={placeArrow}/>
                            <Marker position={viewLocation} icon={placeTarget}/>
                        </> : null }

                    <Marker position={userLocation} icon={placeLocationTarget}/>
                </MapContainer>

                <div className="footer">
                    <span className="copyright">
                        © Stadia, OpenStreetMap & Google
                    </span>
                    <span className="right">
                        <span className="entry">
                            <a href="https://github.com/kevinle-1/imhungryfeed.me"
                                target='_blank'
                                rel="noreferrer">Source</a>
                        </span>
                        <span className="entry">
                            <a href="/privacy"
                                target='_blank'
                                rel="noreferrer">Privacy Policy</a>
                        </span>
                        {/* <span className="entry">
                            About
                        </span> */}
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

function roundCoord(coord: number): number {
    return parseFloat(coord.toFixed(4))
}

export default Frame;