import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Classifica from './components/Classifica';
import Round from './components/Round';


function Header(props) {
    
    return (
      <React.Fragment>
        <h1>uno X due</h1>
        <div className="links">
          <Link to="/">Risultati</Link>
          <Link to="/classifica">Classifica</Link>
        </div>
      </React.Fragment>
    )
}

function App() {
  return (
      <Router>
        <Header />
        <Route exact path="/" component={Round} />
        <Route path="/classifica" component={Classifica} />
        <p className="footer">Football data provided by the <a href="https://football-Data.org">Football-Data.org</a> API</p>
      </Router>
    );
  }

export default App;
  