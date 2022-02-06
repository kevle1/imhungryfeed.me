import { Place } from '../services/place';
import '../assets/styles/place.scss';

import arrow from '../assets/icons/marker.svg'
import StarRatings from 'react-star-ratings';

interface PlaceCardModel {
    place?: Place
}

function PlaceCard(p: PlaceCardModel) {
    let place = p.place!;

    return(<div className="placeCard">
        <a href={place.url} target='_blank'>
            <div className="placeName">
                {place.name}
            </div>
        </a>
        <div className="placeAddress">
            {place.address}
        </div>
        <div className="placeRating">
            <span id="rating">{place.rating}</span>
            <StarRatings
                rating={place.rating}
                starDimension="20px"
                starSpacing="2px"
                starRatedColor='rgb(250, 75, 12)'
            />
            <span id="ratingCount">
                ({place.rating_count})
            </span>
            <span className="placePrice">
                ·  {new Array(place.price_level + 1).join("$")}
            </span>
        </div>
        <a href={place.url} target='_blank'>
            <img id="arrow" src={arrow}/>
        </a>
    </div>);
}

export default PlaceCard;