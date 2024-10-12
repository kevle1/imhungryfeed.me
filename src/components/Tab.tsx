import "../assets/styles/panel.scss";
import filterIcon from "../assets/icons/filter.svg";

function Tab() {
  return (
    <div className="tab">
      <img alt="Filter icon" id="filter" src={filterIcon} />
    </div>
  );
}

export default Tab;
