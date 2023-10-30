import React, { Component } from "react";
import axios from "axios";
import Global from "../Global";
import { NavLink } from "react-router-dom";


export default class MenuRutas extends Component {
  state = {
    series: [],
    status: false,
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

  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
          <div className="container-fluid">
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <NavLink
                    className="nav-link active"
                    aria-current="page"
                    to="/"
                  >
                    Home
                  </NavLink>
                </li>
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Series
                  </a>
                  <ul className="dropdown-menu">
                    {this.state.status == true &&
                      this.state.series.map((serie, index) => {
                        return (
                          <li key={index} className="dropdown-item">
                            <NavLink className="dropdown-item" to={"/serie/"+serie.idSerie}>
                              {serie.nombre}
                            </NavLink>
                          </li>
                        );
                      })}
                  </ul>
                </li>
                <li className="nav-item">
                  <NavLink
                    className="nav-link active"
                    aria-current="page"
                    to="/nuevo"
                  >
                    Nuevo personaje
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className="nav-link active"
                    aria-current="page"
                    to="/modificar"
                  >
                    Modificar personaje
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}