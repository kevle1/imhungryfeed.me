import markerArrow from '../assets/icons/marker-ol.svg'
import markerPin from '../assets/icons/target.svg'
import L from 'leaflet';

const placeArrow = new L.Icon({
    iconUrl: markerArrow,
    iconRetinaUrl: markerArrow,
    iconAnchor: new L.Point(30, 80),
    popupAnchor: undefined,
    shadowUrl: undefined,
    shadowSize: undefined,
    shadowAnchor: undefined,
    iconSize: new L.Point(70, 95),
    className: 'placeMarker'
});

const placePin = new L.Icon({
    iconUrl: markerPin,
    iconRetinaUrl: markerPin,
    iconAnchor: undefined,
    popupAnchor: undefined,
    shadowUrl: undefined,
    shadowSize: undefined,
    shadowAnchor: undefined,
    iconSize: new L.Point(40, 40),
    className: 'placePin'
});

export { placeArrow, placePin };