import PropTypes from "prop-types";
import { useState, Fragment } from "react";

function Matchday({ matches }) {
  const { currentMatchday } = matches[0].season;
  const [selectedMatchday, setSelectedMatchDay] = useState(currentMatchday);
  const matchday = matches.filter((m) => m.matchday === selectedMatchday);

  function changeMatchday(e) {
    setSelectedMatchDay(
      (selectedMatchday) =>
        selectedMatchday + Number(`${e.target.dataset.action}1`)
    );
  }

  return (
    <div>
      <div>
        <button onClick={changeMatchday} data-action="-">
          &lt;&lt;
        </button>
        <h2 style={{ display: "inline" }}>Matchday {selectedMatchday}</h2>
        <button onClick={changeMatchday} data-action="+">
          &gt;&gt;
        </button>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr auto 1fr",
          minHeight: "50vh",
          width: "95vw",
        }}
      >
        {matchday.map((m) => {
          return (
            <Fragment key={m.id}>
              <div style={{ textAlign: "end" }}>{m.homeTeam.shortName}</div>
              <div style={{ marginLeft: "1em", marginRight: "1em" }}>
                {m.score.fullTime.home !== null
                  ? `${m.score.fullTime.home} - ${m.score.fullTime.away}`
                  : new Date(m.utcDate).toLocaleDateString("it-IT", {
                      month: "numeric",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
              </div>
              <div style={{ textAlign: "start" }}>{m.awayTeam.shortName}</div>
            </Fragment>
          );
        })}
      </div>
    </div>
  );
}

export default Matchday;

Matchday.propTypes = {
  matches: PropTypes.array,
};
