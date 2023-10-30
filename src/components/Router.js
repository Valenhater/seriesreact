import React, { Component } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import Home from './Home'
import MenuRutas from './MenuRutas'
import Serie from './Serie'
import Personajes from './Personajes'
import Nuevo from './Nuevo'
import Modificar from './Modificar'



export default class Router extends Component {

  render() {
    function RecuperarId() {
        //Recuperamos el id del hospital para pasarlo a los doctores posteriormente y a las rutas
        var { idserie } = useParams();
        return <Serie idserie={idserie} />
    }
    function RecuperarIdPersonajes() {
        //Recuperamos el id del hospital para pasarlo a los doctores posteriormente y a las rutas
        var { idserie } = useParams();
        return <Personajes idserie={idserie} />
    }
   
    return (
        <BrowserRouter>
        {/* aqui podemos poner dibujso estaticos para el menu de rutas */}
        <MenuRutas/>
           <Routes>
               <Route path='/' element={<Home />}/>
               <Route path='/serie/:idserie' element={<RecuperarId />}/>
               <Route path='/personajes/:idserie' element={<RecuperarIdPersonajes />}/>
               <Route path='/nuevo' element={<Nuevo />}/>
               <Route path='/modificar/' element={<Modificar />}/>
           </Routes>
        </BrowserRouter>
    )
  }
}
