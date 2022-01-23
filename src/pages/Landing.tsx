import React, { useEffect, useState } from 'react';
import '../assets/styles/landing.scss'
import getLocation, { getLocationTemp } from '../services/location';
import { useHistory } from "react-router-dom";

interface LandingProps {
  setLocation: ({}) => void
}

function Landing(props: LandingProps) {
  let location = null;
  const history = useHistory()

  useEffect(() => {
    getLocationTemp() // Switch to getLocation() - used to stop hitting API
    .then(res => {
      location = res;
      console.log(res);
      history.push('/food')
      props.setLocation(location)

    });
  })

  return (
    <div className="landing">
      <div className="content">
        <div id="title" className="heading">I'm Hungry,<br/> Feed Me</div>
        <h1 id="emoji_loading">🍗</h1>
        <div id="credits">
          <div id="large">Made with ❤ & hunger by Kevin</div>
          <div id="small">Thanks to John</div>
        </div>
        <img id="cat_gif" src="https://c.tenor.com/pC8XqizOXd0AAAAd/cat-cat-taking-bite.gif"/>
      </div>
    </div>
  )
}

export default Landing;