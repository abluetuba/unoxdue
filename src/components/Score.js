import React, { Component } from 'react'

export default class Score extends Component {
    render() {
        if (this.props.status === "SCHEDULED") {
          const date = new Date(this.props.date); 
          var day = date.toLocaleDateString("it-IT", { weekday: 'short', month: 'numeric', day: 'numeric'});
          const hour = date.toLocaleString("it-IT", {hour: '2-digit', minute: '2-digit'});
  
          //Need do be refactored. There's no need to call Date.now() for every match
          var today = new Date(Date.now());
          today = today.toLocaleDateString("it-IT", { weekday: 'short', month: 'numeric', day: 'numeric'});
          if (today === day) {
            day = "Oggi";
          }
          return (
            <p className="score">{day}<br />{hour}</p>
            
          )
        }
  
        if(this.props.status === "IN_PLAY" || this.props.status === "PAUSED") {
          return (
            <p className="score playing">{this.props.homeScore} <span className="dash">-</span> {this.props.awayScore}</p>
          )
        }
        return (
          <p className="score">{this.props.homeScore} - {this.props.awayScore}</p>
        )
      }
}
