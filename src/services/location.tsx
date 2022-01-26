import axios from 'axios'

const IP_REGEX = /(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})/g;

async function getLocation() {
    let location = null;

    await axios.get("https://www.cloudflare.com/cdn-cgi/trace").then(async (cf_response) => {
        let cf_str = cf_response.data.replace(/(\r\n|\n|\r)/gm, ",")

        let ip = cf_str.match(IP_REGEX)[0];
        //console.log(ip)

        await axios.get(`http://ip-api.com/json/${ip}?fields=lat,lon`)
            .then((ip_response) => {
                location = ip_response.data;
            }).catch((ip_error) => {
                console.log(ip_error);
                alert("Error: Could not get IP information.");
            });
    }).catch((cf_error) => {
        console.log(cf_error);
        alert("Error: Could not get IP.")
    });

    return location;
}

async function getLocationTemp() {
    await sleep(1000);
    return { lat: -31.9474, lon: 115.8648 };
}

function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export default getLocation;
export { getLocationTemp };