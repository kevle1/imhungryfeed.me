import React, { useState, useEffect } from 'react';
import '../assets/styles/button.scss';
import { sleep, cooldownTime } from '../services/cooldown';

import emojiExplode from '../components/EmojisHandler';

interface ButtonState {
    message: string,
    loading: boolean
}

function FeedMeButton(state: ButtonState) {
    const [cooldown, setCooldown] = useState(false);
    const [width, setWidth] = useState<number>(window.innerWidth);

    function handleWindowSizeChange() {
        setWidth(window.innerWidth);
    }

    useEffect(() => {
        window.addEventListener('resize', handleWindowSizeChange);
        return () => {
            window.removeEventListener('resize', handleWindowSizeChange);
        }
    }, []);

    async function feedMeButtonClick() {
        if(!cooldown){
            emojiExplode("feedMeBtn", width);

            setCooldown(true);
            await sleep(cooldownTime);
            setCooldown(false);
        }
    }

    return (
        <div id="feedMeBtn"
            className={cooldown ? "cooldown" : "enabled"}
            onClick={(e) => {
                feedMeButtonClick()}}>
                <div className="text">
                    { state.loading ?
                        <div className="loadingEmoji">
                            🍔
                        </div> :
                        state.message}
                </div>
        </div>
    );
}

export default FeedMeButton;