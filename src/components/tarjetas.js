import React from 'react'

function Tarjeta(props){
    return(
    <>
        <img src={props.datosPersonaje.image} className='imagenTarjeta'></img>
        <div className='tarjetaHijo'>
        <h3>{props.datosPersonaje.name}</h3>
        <p>{props.datosPersonaje.status} - {props.datosPersonaje.species}</p>
        <p>Origin: {props.datosPersonaje.origin.name}</p>
        </div>
    </>
    );

}

export default Tarjeta;
