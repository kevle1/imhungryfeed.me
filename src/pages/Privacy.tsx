import '../assets/styles/misc.scss';

function Privacy() {
    return (
        <div className="privacy">
            <div className="h1">Privacy Policy</div>
            <p>Location and IP data is collected in order to enable use of this application. <br/>

            This data is collected via requests made to the <a href="https://api.imhungryfeed.me">API endpoint</a>.<br/><br/>

            This location data is anonymous and is forwarded to
            the <a href="https://developers.google.com/maps/documentation/places/web-service/overview">Google Maps Places API</a> with
            it's accuracy reduced.<br/><br/>

            Location and IP data is stored securely by the API for each request made. <br/><br/>

            This data is used for caching subsequent requests from nearby locations and improve the quality of the service. <br/><br/>

            For further information <a href="mailto:privacy@kevinle.com.au">privacy@kevinle.com.au</a>
            </p>
        </div>
    )
}

export default Privacy;