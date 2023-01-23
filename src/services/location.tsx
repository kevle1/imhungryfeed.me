import axios from 'axios'
import { sleep } from '../services/cooldown';

async function getLocation() : Promise<{ lat: number; lon: number; } | null> {
    let location = null;

    await axios.get("https://imhungryfeed-me-api.vercel.app/ip").then(async (ip_response) => {
        let loc = ip_response.data;

        location = {
            lat: loc.lat,
            lon: loc.lon
        }
    }).catch(async (ip_error) => {
        console.log("Error: Could not get IP location " + ip_error);
        return null;
    });

    return location;
}

function getLocationViaBrowser() : Promise<GeolocationPosition> {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
            position => resolve(position),
            error => reject(error)
        );
    })
}

async function getLocationTemp() : Promise<{ lat: number; lon: number; }> {
    await sleep(1000); // Mock loading
    console.log("Using mock location");
    return { lat: -31.9474, lon: 115.8648 };
}

export default getLocation;
export { getLocationTemp, getLocationViaBrowser };