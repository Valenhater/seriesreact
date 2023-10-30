import React, {Component} from 'react';
import axios from 'axios';
import Global from '../Global';
import {NavLink} from 'react-router-dom';

export default class Personajes extends Component {
  state = {
    personajes: [],
    status: false,
  };

  loadPersonajes = () => {
    var idserie = this.props.idserie;
    var request = 'api/series/personajesserie/' + idserie;
    var url = Global.urlSeries + request;

    axios.get (url).then (response => {
      this.setState ({
        personajes: response.data,
        status: true,
      });
    });
  };

  componentDidMount = () => {
    this.loadPersonajes ();
  };

  render () {
    return (
      <div>
        <h1>Personajes</h1>
        <NavLink
          className="btn btn-danger"
          aria-current="page"
          to={'/serie/' + this.props.idserie}
        >
          Volver
        </NavLink>
        <table className="table table-dark table-bordered" style={{textAlign:"center"}}>
          <thead>
            <tr>
              <th>Personaje</th>
              <th>Imagen</th>

            </tr>
          </thead>
          <tbody>
            {this.state.status &&
              this.state.personajes.map ((personaje, index) => (
                <tr key={index}>
                  <td>{personaje.nombre}</td>
                  <td><img src={personaje.imagen} alt={personaje.nombre} width="550px" /></td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    );
  }
}
