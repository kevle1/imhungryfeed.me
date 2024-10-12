import markerArrow from "../assets/icons/marker-ol.svg";
import markerTarget from "../assets/icons/target.svg";
import markerPin from "../assets/icons/place.svg";
import markerLocationTarget from "../assets/icons/close.svg";

import L from "leaflet";

const placeArrow = new L.Icon({
  iconUrl: markerArrow,
  iconRetinaUrl: markerArrow,
  iconAnchor: new L.Point(30, 80),
  popupAnchor: undefined,
  shadowUrl: undefined,
  shadowSize: undefined,
  shadowAnchor: undefined,
  iconSize: new L.Point(70, 95),
  className: "placeMarker",
});

const placeTarget = new L.Icon({
  iconUrl: markerTarget,
  iconRetinaUrl: markerTarget,
  iconAnchor: undefined,
  popupAnchor: undefined,
  shadowUrl: undefined,
  shadowSize: undefined,
  shadowAnchor: undefined,
  iconSize: new L.Point(40, 40),
  className: "placeTarget",
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
  className: "placePin",
});

const placeLocationTarget = new L.Icon({
  iconUrl: markerLocationTarget,
  iconRetinaUrl: markerLocationTarget,
  iconAnchor: undefined,
  popupAnchor: undefined,
  shadowUrl: undefined,
  shadowSize: undefined,
  shadowAnchor: undefined,
  iconSize: new L.Point(40, 40),
  className: "placeLocationTarget",
});

export { placeArrow, placeTarget, placePin, placeLocationTarget };
