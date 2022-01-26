import '../assets/styles/button.scss';

import emojiExplode from '../components/EmojisHandler';

function FeedMeButton() {
    return (
        <div id="feedMeBtn"
            className="feedMeBtn"
            onClick={() => feedMeButtonClick()}>
                <div className="text">Feed Me!</div>
        </div>
    );
}

function feedMeButtonClick() {
    emojiExplode("feedMeBtn");

    // TODO: stuff...
}

export default FeedMeButton;