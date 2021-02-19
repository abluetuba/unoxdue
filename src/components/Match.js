import React, { Component } from 'react'
import Score from './Score'

export default class Match extends Component {
    render() {
      
        return (
          <React.Fragment>
          <p className="home">{this.props.home}</p> 
           
          {/*<p className="score">{this.props.homeScore} - {this.props.awayScore}</p> */}
          <Score homeScore={this.props.homeScore} awayScore={this.props.awayScore} status={this.props.status} date={this.props.date}/>
          
          <p className="away">{this.props.away}</p>
          </React.Fragment>
        )
      
    }
}
