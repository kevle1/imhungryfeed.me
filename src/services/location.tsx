import axios from 'axios'
import { sleep } from '../services/cooldown';

const IP_REGEX = /(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})/g;

async function getLocation() : Promise<{ lat: number; lon: number; } | null> {
    let location = null;

    await axios.get("https://www.cloudflare.com/cdn-cgi/trace").then(async (cf_response) => {
        let cf_str = cf_response.data.replace(/(\r\n|\n|\r)/gm, ",")

        let ip = cf_str.match(IP_REGEX)[0];
        console.log(ip)

        await axios.get(`http://ip-api.com/json/${ip}?fields=lat,lon`)
            .then((ip_response) => {
                location = ip_response.data;
            }).catch((ip_error) => {
                console.log("Error: Could not get IP information - " + ip_error);
                return null;
            });
    }).catch((cf_error) => {
        console.log("Error: Could not get IP - " + cf_error);
        return null;
    });

    return location;
}

function getLocationViaBrowser() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            console.log("Got loc");

            return [position.coords.latitude, position.coords.longitude];
        });
    }

    // TODO: Handle error
}

async function getLocationTemp() : Promise<{ lat: number; lon: number; }> {
    await sleep(1000); // Mock loading
    console.log("called");
    return { lat: -31.9474, lon: 115.8648 };
}

export default getLocation;
export { getLocationTemp, getLocationViaBrowser };