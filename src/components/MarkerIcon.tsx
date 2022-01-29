import markerIcon from '../assets/icons/marker-ol.svg'
import L from 'leaflet';

const icon = new L.Icon({
    iconUrl: markerIcon,
    iconRetinaUrl: markerIcon,
    iconAnchor: undefined,
    popupAnchor: undefined,
    shadowUrl: undefined,
    shadowSize: undefined,
    shadowAnchor: undefined,
    iconSize: new L.Point(70, 95),
    className: 'placeMarker'
});

export { icon };