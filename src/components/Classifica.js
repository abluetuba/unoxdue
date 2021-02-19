import React, { Component } from 'react'
import * as constants from '../Constants'
import * as localforage from 'localforage'

const API_KEY = process.env.REACT_APP_API_KEY

export default class Classifica extends Component {
  constructor(props) {
    super(props)

    this.state = {
      standing: [],
      loading: true,
    }
  }

  saveInCache(data) {
    localforage.setItem('standing', data).then((value) => {
      //console.log(value + ' saved in cache')
    })
  }

  componentDidMount() {
    localforage.getItem('standing').then((data) => {
      if (data) {
        //console.log(data + ' loaded from cache')
        this.setState({ standing: data.standings[0].table, loading: false })
      }
    })

    fetch('https://api.football-data.org/v2/competitions/SA/standings', {
      method: 'GET',
      headers: { 'X-Auth-Token': API_KEY },
    })
      .then((res) => res.json())
      .then((data) => {
        //console.log(data);
        this.setState({ standing: data.standings[0].table, loading: false })
        this.saveInCache(data)
      })
  }

  render() {
    const { standing, loading } = this.state
    //console.log(standing);
    if (loading) return <p>Loading...</p>
    return (
      <div className="classifica">
        <p style={{ textAlign: 'end' }}>#</p>
        <p></p>
        <p style={{ fontWeight: 'normal' }}>Pt</p>
        <p>G</p>
        <p>V</p>
        <p>P</p>
        <p>S</p>
        <p>GF</p>
        <p>GS</p>
        <p>DR</p>
        {standing.map((el) => (
          <React.Fragment key={el.team.id}>
            <p className="position">{el.position}</p>
            <p>{constants.TEAMS[el.team.id]}</p>
            <p style={{ fontWeight: 'normal', textAlign: 'center' }}>
              {el.points}
            </p>
            <p style={{ textAlign: 'center' }}>{el.playedGames}</p>
            <p style={{ textAlign: 'center' }}>{el.won}</p>
            <p style={{ textAlign: 'center' }}>{el.draw}</p>
            <p style={{ textAlign: 'center' }}>{el.lost}</p>
            <p style={{ textAlign: 'center' }}>{el.goalsFor}</p>
            <p style={{ textAlign: 'center' }}>{el.goalsAgainst}</p>
            <p style={{ textAlign: 'center' }}>{el.goalDifference}</p>
          </React.Fragment>
        ))}
      </div>
    )
  }
}
