import axios from 'axios'
import { sleep } from '../services/cooldown';

const IP_REGEX = /(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})/g;

async function getLocation() : Promise<{ lat: number; lon: number; } | null> {
    let location = null;

    await axios.get("http://ip-api.com/json").then(async (ipi_response) => {
        let loc = ipi_response.data;

        location = {
            lat: loc.lat,
            lon: loc.lon
        }
    }).catch(async (ipa_error) => {
        console.log("Error: Could not get location via ip-api directly " + ipa_error);

        let ip = "";

        await axios.get("https://www.cloudflare.com/cdn-cgi/trace").then(async (cf_response) => {
            let cf_str = cf_response.data.replace(/(\r\n|\n|\r)/gm, ",")

            ip = cf_str.match(IP_REGEX)[0];
            // console.log(ip);
        }).then(async (cf_response) => {
            await axios.get(`http://ip-api.com/json/${ip}?fields=lat,lon`)
            .then((ip_response) => {
                location = ip_response.data;
            }).catch(async (ip_error) => {
                console.log("Error: Could not get location from ip-api " + ip_error);

                return null;
            });
        }).catch(async (cf_error) => {
            console.log("Error: Could not get IP from Cloudflare " + cf_error);

            return null;
        });
    });

    await sleep(500);

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