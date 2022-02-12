import axios from 'axios'
import { sleep } from '../services/cooldown';

const IP_REGEX = /(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})/g;

async function getLocation() : Promise<{ lat: number; lon: number; } | null> {
    let location = null;

    await axios.get("https://www.cloudflare.com/cdn-cgi/trace").then(async (cf_response) => {
        let cf_str = cf_response.data.replace(/(\r\n|\n|\r)/gm, ",")

        let ip = cf_str.match(IP_REGEX)[0];
        // console.log(ip);

        await axios.get(`http://ip-api.com/json/${ip}?fields=lat,lon`)
            .then((ip_response) => {
                location = ip_response.data;
            }).catch(async (ip_error) => {
                console.log("Error: Could not get IP information from ip-api- " + ip_error);

                // ipinfo.io fallback (heavily ratelimited)
                await axios.get("https://ipinfo.io/json").then(async (ipi_response) => {
                    let loc_str = ipi_response.data.loc.split(",");

                    location = {
                        lat: loc_str[0],
                        lon: loc_str[1]
                    }
                }).catch(async (ipi_error) => {
                    console.log("Error: Could not get IP via ipinfo.io - " + ipi_error);

                    return null;
                });
            });
    }).catch(async (cf_error) => {
        console.log("Error: Could not get IP" + cf_error);
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