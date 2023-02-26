/* eslint-disable react/jsx-no-target-blank */
import { useState, useEffect } from "react";
import Matchday from "./components/Matchday";
import "./App.css";

function App() {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    fetch("/.netlify/functions/api")
      //fetch("/matches.json")
      .then((res) => res.json())
      .then((data) => setMatches(data.matches));
  }, []);

  return (
    <div className="App">
      <h1>unoXdue</h1>
      {matches.length > 0 ? (
        <Matchday matches={matches} />
      ) : (
        <div>Loading...</div>
      )}
      <div>
        Data provided by the{" "}
        <a href="https://www.football-data.org">Football-Data.org</a> API
      </div>
    </div>
  );
}

export default App;
