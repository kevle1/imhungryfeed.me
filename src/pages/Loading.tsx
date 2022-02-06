// Use this component to display a loading screen if required

import React, { useEffect } from 'react';
import '../assets/styles/loading.scss'

function Loading() {
    return (
        <div className="landing">
            <div className="content">
                <div id="title" className="heading">I'm Hungry,<br/> Feed Me</div>
                    <h1 id="emoji_loading">🍗</h1>
                <div id="credits">
                <div id="large">Made with hunger by Kevin</div>
                <div id="small">Thanks to John, Jon & India</div>
                </div>
                <img id="cat_gif" src="https://c.tenor.com/pC8XqizOXd0AAAAd/cat-cat-taking-bite.gif"/>
            </div>
        </div>
    )
}

export default Loading;