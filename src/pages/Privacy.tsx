import '../assets/styles/misc.scss';

function Privacy() {
    return (
        <div className="privacy">
            <div className="h1">Privacy Policy</div>
            <p>Location data is collected in order to enable use of this application. <br/>

            This data is retrieved on the users end via <a href="https://ip-api.com/">ip-api.com</a> using
            IP data retrieved from <a href="https://www.cloudflare.com/cdn-cgi/trace">Cloudflare</a> OR
            via browser location.<br/><br/>

            This location data is anonymous and is forwarded to
            the <a href="https://developers.google.com/maps/documentation/places/web-service/overview">Google Maps Places API</a> with
            it's accuracy reduced.<br/><br/>

            It is also stored by the endpoints for each request made in order to cache subsequent
            requests from nearby locations and improve the quality of the service. <br/><br/>

            For further information <a href="mailto:food@kevinle.com.au">food@kevinle.com.au</a>
            </p>
        </div>
    )
}

export default Privacy;