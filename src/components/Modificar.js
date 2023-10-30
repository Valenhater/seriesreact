import React, { Component } from 'react';
import axios from 'axios';
import Global from '../Global';

export default class Modificar extends Component {
  state = {
    status: false,
    series: [],
    personajes: [],
    selectedSerie: null,
    selectedPersonaje: null,
  };

  cajaSerie = React.createRef();
  cajaPer = React.createRef();

  loadSeries = () => {
    var request = 'api/series';
    var url = Global.urlSeries + request;

    axios.get(url).then((response) => {
      this.setState({
        series: response.data,
        status: true,
      });
    });
  };

  loadPersonajes = () => {
    var request = 'api/personajes';
    var url = Global.urlSeries + request;

    axios.get(url).then((response) => {
      this.setState({
        personajes: response.data,
        status: true,
      });
    });
  };

  handleSerieChange = (event) => {
    const selectedSerieId = parseInt(event.target.value);
    const selectedSerie = this.state.series.find(
      (serie) => serie.idSerie === selectedSerieId
    );
    this.setState({ selectedSerie });
  };

  handlePersonajeChange = (event) => {
    const selectedPersonajeId = parseInt(event.target.value);
    const selectedPersonaje = this.state.personajes.find(
      (personaje) => personaje.idPersonaje === selectedPersonajeId
    );
    this.setState({ selectedPersonaje });
  };

  modificarPersonaje = (e) => {
    e.preventDefault();


    var idserie = parseInt(this.cajaSerie.current.value);
    var idperso = parseInt(this.cajaPer.current.value);
    var request4 = "api/personajes/" +idperso + "/" + idserie;
    var url4 = Global.urlSeries + request4;

    var personajeSeleccionado = this.state.personajes.find(personaje => personaje.idPersonaje === idperso);
    var nombre = personajeSeleccionado.nombre;
    var imagen = personajeSeleccionado.imagen;

    var personaje = {
        idPersonaje: idperso,
        nombre: nombre,
        imagen: imagen,
        idSerie: idserie
      };

      console.log(url4)
      console.log(personaje)

      axios.post (url4, personaje).then (response => {
      });
  };

  componentDidMount = () => {
    this.loadSeries();
    this.loadPersonajes();
  };

  render() {
    return (
      <div>
        <h1>Modificar personaje</h1>
        <form>
          <label>Serie</label>
          <select
            type="text"
            className="form-control"
            ref={this.cajaSerie}
            onChange={this.handleSerieChange}
          >
            {this.state.status === true &&
              this.state.series.map((serie, index) => {
                return (
                  <option
                    key={index}
                    className="dropdown-item"
                    value={serie.idSerie}
                  >
                    {serie.nombre}
                  </option>
                );
              })}
          </select>

          <label>Personaje</label>
          <select
            type="text"
            className="form-control"
            ref={this.cajaPer}
            onChange={this.handlePersonajeChange}
          >
            {this.state.status === true &&
              this.state.personajes.map((personaje, index) => {
                return (
                  <option
                    key={index}
                    className="dropdown-item"
                    value={personaje.idPersonaje}
                  >
                    {personaje.nombre}
                  </option>
                );
              })}
          </select>

          {this.state.selectedSerie && (
            <div>
              <h2>Serie Seleccionada: {this.state.selectedSerie.nombre}</h2>
              <img
                width="350px"
                src={this.state.selectedSerie.imagen}
                alt={this.state.selectedSerie.nombre}
              />
            </div>
          )}

          {this.state.selectedPersonaje && (
            <div>
                <h2>Personaje Seleccionado: {this.state.selectedPersonaje.nombre}</h2>
              <img
                width="350px"
                src={this.state.selectedPersonaje.imagen}
                alt={this.state.selectedPersonaje.nombre}
              />
            </div>
          )}

          <button
            className="btn btn-success"
            onClick={this.modificarPersonaje}
          >
            Modificar
          </button>
        </form>
      </div>
    );
  }
}
