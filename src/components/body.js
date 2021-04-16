import React from 'react';
import Tarjeta from './tarjetas';
const arrayDePersonas = [1,2,43];
fetch('https://randomuser.me/api/')
  .then(response => response.json())
  .then(function(data){
      const arrayDePersonajes = data
  })
  

function Body(){
    return(
        <div className='personajesPadre'>    
            {
            arrayDePersonajes.map(function(personaje, idx){
              return(
            <div  key={idx} className="tarjetaPadre">
                <Tarjeta datosPersonaje = {personaje} />
            </div>    
              )  
                })
            }   
            
        </div>   
    )
}

export default Body; 