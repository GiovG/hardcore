import React from 'react'
import ActividadesTable from '../components/Actividades';
import { NavLink } from "react-router-dom";

export default function Home() {
    console.log("inicio")
    return (
        //A colocar un elemento que mustre las actividades
        <div className='divBody'>
            <img class= "LogoCentro" src="../public/Logo Gimnasio Gym Entrenamiento Moderno Rosa Salmón Negro.png" alt="" />
            <div class="ActividadesTabla">
            <ActividadesTable  mode="inicio" /> </div>  
            <div>           <NavLink
              to="/login"
              className={({ isActive }) =>
                `bg-green-500 px-4 py-2 rounded hover:bg-green-700 ${
                  isActive ? "text-yellow-300" : ""
                }`
              }
            >
              Login
            </NavLink>
            <NavLink
              to="/register"
              className={({ isActive }) =>
                `bg-green-500 px-4 py-2 rounded hover:bg-green-700 ${
                  isActive ? "text-yellow-300" : ""
                }`
              }
            >
              Registrarse
            </NavLink></div> 
            </div>);
}