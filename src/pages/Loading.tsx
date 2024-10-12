// Use this component to display a loading screen if required
import "../assets/styles/loading.scss";

function Loading() {
  const hungryGifs = [
    "https://c.tenor.com/pC8XqizOXd0AAAAd/cat-cat-taking-bite.gif",
    "https://c.tenor.com/sXfJz6Ye0G0AAAAd/cat-hungry-cat.gif",
    "https://c.tenor.com/-_Pd1WDpy9gAAAAC/hungry-hunger.gif",
    "https://c.tenor.com/PhhN-3LjE3AAAAAM/gatto-cibo.gif",
    "https://c.tenor.com/dikBaIkZ0jQAAAAM/lazy-tired.gif",
    "https://c.tenor.com/1JS_wLUXrvUAAAAM/cat-please.gif",
    "https://c.tenor.com/6OORl24YViAAAAAM/hungry-dog-hungry.gif",
    "https://c.tenor.com/8eCnrOUoea0AAAAM/hungry-carrot.gif",
    "https://c.tenor.com/kJ2Zn-Tlyd4AAAAM/im-hungry-hungy.gif",
  ];

  return (
    <div className="landing">
      <div className="content">
        <div id="title" className="heading">
          I'm Hungry,
          <br /> Feed Me
        </div>
        <h1 id="emoji_loading">🍗</h1>
        <div id="credits">
          <div id="large">Made with hunger by Kevin</div>
          <div id="small">Thanks to Anurag, India, John, Jon & Kay</div>
        </div>
        <img
          alt="Hungry animal gif"
          id="hungry_gif"
          src={hungryGifs[Math.floor(Math.random() * hungryGifs.length)]}
        />
      </div>
    </div>
  );
}

export default Loading;
