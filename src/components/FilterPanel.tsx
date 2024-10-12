import "../assets/styles/panel.scss";
import "rc-slider/assets/index.css";

import React, { useState } from "react";

import locationIcon from "../assets/icons/location.svg";
import close from "../assets/icons/arrow-r.svg";

import { getLocationViaBrowser } from "../services/location";
import { PlaceRequest } from "../services/place";
import { sleep } from "../services/cooldown";

import Slider, { Range } from "rc-slider";

interface PanelInterface {
  placeRequest: PlaceRequest;
  updateRequest: React.Dispatch<React.SetStateAction<PlaceRequest>>;
  setUserLocation: React.Dispatch<React.SetStateAction<[number, number]>>;
  setViewLocation: React.Dispatch<React.SetStateAction<[number, number]>>;
  showPanel?: React.Dispatch<React.SetStateAction<boolean>>;
}

function FilterPanel(request: PanelInterface) {
  const [locationSource, setLocationSource] = useState(
    "Approximate, based on IP",
  );

  async function handleBrowserLocationClick() {
    setLocationSource("Requesting location...");

    await getLocationViaBrowser()
      .then((browserLocation) => {
        let placeRequest = { ...request.placeRequest };

        placeRequest.latitude = browserLocation.coords.latitude;
        placeRequest.longitude = browserLocation.coords.longitude;

        request.setUserLocation([
          browserLocation.coords.latitude,
          browserLocation.coords.longitude,
        ]);
        request.setViewLocation([
          browserLocation.coords.latitude,
          browserLocation.coords.longitude,
        ]);

        request.updateRequest(placeRequest);
        setLocationSource("Browser Location");
      })
      .catch(async (error) => {
        setLocationSource("Couldn't get location");
        await sleep(2000);
        setLocationSource("Approximate, based on IP");
      });
  }

  return (
    <div className="filterPanel">
      {request.showPanel ? (
        <div className="closeTab" onClick={() => request.showPanel!(false)}>
          <img alt="Close icon" id="close" src={close} />
        </div>
      ) : null}

      <div className="items">
        <div className="location">
          <div className="category">
            <span id="subheading">LOCATION</span>
            <span id="status">{locationSource}</span>
          </div>

          <div className="searchBox">
            {/* <input></input>
                    <img className="locationIcon"
                        src={locationIcon}
                        onClick={() => handleBrowserLocationClick()}/> */}
            <button
              className="locationButton"
              onClick={() => handleBrowserLocationClick()}
            >
              <img
                alt="Location icon"
                className="locationIcon"
                src={locationIcon}
              />
              <span id="txt">Get Current Location</span>
            </button>
          </div>
        </div>
        <hr className="dividingLine"></hr>
        <div className="sliders">
          <div className="radiusSlider">
            <div className="category">
              <span id="subheading">RADIUS</span>
              <span id="status">{request.placeRequest.radius}m</span>
            </div>
            <div className="slider">
              <Slider
                defaultValue={request.placeRequest.radius}
                onChange={(val) => {
                  let placeRequest = { ...request.placeRequest };
                  placeRequest.radius = val;

                  request.updateRequest(placeRequest);
                }}
                min={200}
                max={2000}
                step={100}
              />
            </div>
          </div>
          <div className="priceSlider">
            <div className="category">
              <span id="subheading">PRICE RANGE</span>
              <span id="status">
                {calculatePriceSymbol(
                  request.placeRequest.min_price,
                  request.placeRequest.max_price,
                )}
              </span>
            </div>
            <div className="slider">
              <Range
                defaultValue={[
                  request.placeRequest.min_price,
                  request.placeRequest.max_price,
                ]}
                min={1}
                max={4}
                onChange={(val) => {
                  let placeRequest = { ...request.placeRequest };
                  placeRequest.min_price = val[0];
                  placeRequest.max_price = val[1];

                  request.updateRequest(placeRequest);
                }}
              />
            </div>
          </div>
          <div className="ratingSlider">
            <div className="category">
              <span id="subheading">RATING</span>
              <span id="status">
                {(Math.round(request.placeRequest.rating * 10) / 10).toFixed(1)}
                +
              </span>
            </div>
            <div className="slider">
              <Slider
                defaultValue={request.placeRequest.rating}
                min={1}
                max={4.5}
                step={0.5}
                onChange={(val) => {
                  let placeRequest = { ...request.placeRequest };
                  placeRequest.rating = val;

                  request.updateRequest(placeRequest);
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function calculatePriceSymbol(minPrice: number, maxPrice: number) {
  let min = new Array(minPrice + 1).join("$");
  let max = new Array(maxPrice + 1).join("$");

  if (minPrice === maxPrice) return min;

  return min + "-" + max;
}

export default FilterPanel;
