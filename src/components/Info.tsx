import "../assets/styles/info.scss";

interface InfoMessage {
  message: string;
  visible: boolean;
}

function Info(info: InfoMessage) {
  return (
    <div id={info.visible ? "visible" : ""} className="info">
      {info.message}
    </div>
  );
}

export default Info;
