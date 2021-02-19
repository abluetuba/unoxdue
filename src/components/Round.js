import React, { Component } from 'react'
import * as localforage from 'localforage';
import Match from './Match';
import * as constants from '../Constants';

const API_KEY = process.env.REACT_APP_API_KEY;

export default class Round extends Component {
    constructor(props) {
        super(props);
  
        this.state = {
            currentMatchday: null,
            visibleMatchday: null,
            matches: [],
            teams: constants.TEAMS,
            loading: true
        };
      }
  
      saveInCache(data) {
        localforage.setItem('data', data)
        .then(value => {
          //console.log(value + ' saved in cache')
        });
      }
  
      componentDidMount() {
            
            localforage.getItem('data')
              .then(data => {
                if (data) {
                  //console.log(data + ' loaded from cache')
                  this.setState({ matches: data.matches, currentMatchday: data.matches[0].season.currentMatchday, visibleMatchday: data.matches[0].season.currentMatchday, loading: false })
                }
              });
            
            fetch('https://api.football-data.org/v2/competitions/SA/matches/', {
              //fetch('http://192.168.1.3/unoxdue/football-api.php', {
                method: 'GET',
                headers:{'X-Auth-Token': API_KEY}
              })
                .then(res => res.json())
                .then(data => {
                  //console.log(data);
                  this.setState({ matches: data.matches, currentMatchday: data.matches[0].season.currentMatchday, visibleMatchday: data.matches[0].season.currentMatchday, loading: false });
                  this.saveInCache(data);
                  });
                
      }
  
      render() {
        if(this.state.loading) return <p>Loading...</p>
        const matches = this.state.matches.filter(match => (match.matchday === this.state.visibleMatchday));
          return (
                <React.Fragment>
                  <div className="navigation">
                    
                    <button onClick={() => this.setState({ visibleMatchday: (this.state.visibleMatchday-1) })}>&lt;&lt;</button>
                    <p>GIORNATA {this.state.visibleMatchday}</p>
                    <button onClick={() => this.setState({ visibleMatchday: (this.state.visibleMatchday+1) })}>&gt;&gt;</button>
                  </div> 
                  <div className="round">
                    {matches.map(match => 
                      <Match
                        key={match.id}
                        home={this.state.teams[match.homeTeam.id]}
                        away={this.state.teams[match.awayTeam.id]}
                        homeScore={match.score.fullTime.homeTeam}
                        awayScore={match.score.fullTime.awayTeam}
                        status={match.status}
                        date={match.utcDate}
                      />
                    )}
                  </div>
                </React.Fragment>
          )
      } 
}
