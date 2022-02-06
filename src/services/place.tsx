import axios from 'axios';

interface PlaceRequest {
    longitude: number,
    latitude: number,
    radius: number,
    min_price: number,
    max_price: number,
    rating: number
}

interface Place {
    address: string,
    location: {
        lat: number,
        lng: number
    },
    name: string,
    price_level: number,
    rating: number,
    rating_count: number,
    url: string
}

async function getPlaces(request: PlaceRequest) : Promise<[Place] | null> {
    // TODO: Build request payload
    let places = null;

    await axios.post("http://localhost:5000/api/places",
        request, {
            timeout: 10000,
        }).then((res) => {
            places = res.data;
    });

    return places;
}

function randomPlace(places: [Place]) : Place {
    let idx = Math.floor(Math.random() * places.length);
    return places[idx];
}

function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export { randomPlace };
export type { Place, PlaceRequest };
export default getPlaces;