import '../assets/styles/panel.scss'
import 'rc-slider/assets/index.css';

import React, { useState } from 'react';

import searchIcon from '../assets/icons/search.svg';
import locationIcon from '../assets/icons/location.svg';

import Slider, { Range } from 'rc-slider';

function FilterPanel() {
    const [radius, setRadius] = useState(400);
    const [priceRange, setPriceRange] = useState<[number, number]>([1,4]); // Always [min, max]
    const [rating, setRating] = useState(3.0);

    return (
        <div className="filterPanel">
            <div className="location">
                <div className="category">
                    <span id="subheading">LOCATION</span>
                    <span id="status">Approximate, based on IP</span>
                </div>

                <div className="searchBox">
                    <input></input>
                    <img className="locationIcon" src={locationIcon}/>
                    <button className="searchButton">
                        <img className="searchIcon" src={searchIcon}/>
                    </button>
                </div>
            </div>
            <hr className="dividingLine"></hr>
            <div className="sliders">
                <div className="radiusSlider">
                    <div className="category">
                        <span id="subheading">RADIUS</span>
                        <span id="status">{radius}m</span>
                    </div>
                    <div className="slider">
                        <Slider defaultValue={radius}
                            onChange={val => setRadius(val)}
                            min={200}
                            max={2000}
                            step={100}/>
                    </div>
                </div>
                <div className="priceSlider">
                    <div className="category">
                        <span id="subheading">PRICE RANGE</span>
                        <span id="status">{calculatePriceSymbol(priceRange)}</span>
                    </div>
                    <div className="slider">
                        <Range defaultValue={priceRange}
                            min={1}
                            max={4}
                            onChange={val => setPriceRange([val[0], val[1]])}/>
                    </div>
                </div>
                <div className="ratingSlider">
                    <div className="category">
                        <span id="subheading">RATING</span>
                        <span id="status">{(Math.round(rating * 10) / 10).toFixed(1)}+</span>
                    </div>
                    <div className="slider">
                        <Slider defaultValue={rating}
                            min={1}
                            max={4.5}
                            step={0.5}
                            onChange={val => setRating(val)}/>
                    </div>
                </div>
            </div>
        </div>
    )
}


function calculatePriceSymbol(range: [number, number]) {
    let min = new Array(range[0] + 1).join("$");
    let max = new Array(range[1] + 1).join("$");

    if (range[0] === range[1])
        return min;

    return min + "-" + max;
}

export default FilterPanel;