import React, {Component} from 'react';
import axios from 'axios';
import Global from '../Global';
import {NavLink} from 'react-router-dom';

export default class Serie extends Component {
  state = {
    series: [],
    status: false,
  };

  loadSeries = () => {
    var idserie = this.props.idserie;
    var request = 'api/series/' + idserie;
    var url = Global.urlSeries + request;

    axios.get (url).then (response => {
      this.setState ({
        series: response.data,
        status: true,
      });
    });
  };

  componentDidMount = () => {
    this.loadSeries ();
  };

  componentDidUpdate = oldProps => {
    if (oldProps.idserie != this.props.idserie) {
      this.loadSeries ();
    }
  };

  render () {
    return (
      <div style={{textAlign:"center"}}>
        <h2> <img width="650px" src={this.state.series.imagen} /></h2>
        <h2>{this.state.series.nombre}</h2>
        <h2> Puntuacion: {this.state.series.puntuacion}</h2>
        <h2> Año: {this.state.series.anyo}</h2>
        <NavLink
          className="btn btn-success"
          aria-current="page"
          to={'/personajes/' + this.state.series.idSerie}
        >
          Personajes
        </NavLink>
      </div>
    );
  }
}
