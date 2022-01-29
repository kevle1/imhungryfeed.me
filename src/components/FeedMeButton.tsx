import '../assets/styles/button.scss';

import emojiExplode from '../components/EmojisHandler';

function FeedMeButton() { // TODO: Add a prop for the message on button (str) + loading state (bool)
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
}

export default FeedMeButton;