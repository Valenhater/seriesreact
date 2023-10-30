import React, {Component} from 'react';
import axios from 'axios';
import Global from '../Global';
import {NavLink, Navigate} from 'react-router-dom';

export default class Nuevo extends Component {
  state = {
    status: false,
    series : []
  };

  cajaNom = React.createRef ();
  cajaImg = React.createRef ();
  cajaSerie = React.createRef ();


  insertSerie = e => {
    e.preventDefault ();
    var request = 'api/personajes';
    var url = Global.urlSeries + request;

    //Debemos respetar los tipos de datos respecto al servicio(Sobre todo de los numeros)
    var nombre = this.cajaNom.current.value;
    var imagen = this.cajaImg.current.value;
    var idserie = parseInt(this.cajaSerie.current.value);

    //Debemos declarar un objeto json dentro de react con el mismo nombre de propiedades de la api
    //A la izqda ira el de la api y a la derecha el creado por nosotros arriba

    var personaje = {
      idPersonaje: 0,
      nombre: nombre,
      imagen: imagen,
      idSerie: idserie
    };
    //El metodo post de axios puede recibir dos parametros
    //1) la url del metodo post del servicio
    //2) el objeto a enviar al servicio

    axios.post (url, personaje).then (response => {
      this.setState ({
        status: true,
      });
    });
  };
  loadSeries = () => {
    var request = "api/series";
    var url = Global.urlSeries + request;

    axios.get(url).then((response) => {
      this.setState({
        series: response.data,
        status: true,
      });
    });
  };
  componentDidMount = () => {
    this.loadSeries();
  };

  render () {
    return (
      <div>
        <h1>Nuevo personaje</h1>
        <form>
          <label>Nombre</label>
          <input type="text" className="form-control" ref={this.cajaNom} />
          <label>Imagen</label>
          <input type="text" className="form-control" ref={this.cajaImg} />
          <label>Serie</label>
          <select type="text" className="form-control" ref={this.cajaSerie} >
          {this.state.status == true &&
            this.state.series.map ((serie, index) => {
              return (
                <option key={index} className="dropdown-item" value={serie.idSerie}>

                  {serie.nombre}

                </option>
              );
            })}
            </select>
          <button className="btn btn-success" onClick={this.insertSerie}>
            Create
          </button>
        </form>

      </div>
    );
  }
}
