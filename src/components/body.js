import React, {Component} from 'react';
import Tarjeta from './tarjetas';




class Body extends Component{
    constructor(props){
        super(props);
        this.state = {
            items: [],
            itemsOriginales: []
           
        }
    }

    componentDidMount(){
        fetch("https://randomuser.me/api/?results=20")
            .then(resource => resource.json())
            .then(data => { 
                this.setState({items: data.results, itemsOriginales: data.results})
                
            })
    }

    borrarTarjeta = (idTarjeta)=>{
        let resultado = this.state.items.filter( (item)=> {
            return item.login.uuid !== idTarjeta;
        })
        this.setState({items: resultado});
    }

    reset(){
        this.setState({items: this.state.itemsOriginales})
    }

    agregarTarjetas(){
        let cantidad = document.querySelector(".cantidadAgregar").value
        console.log(cantidad);
        
        fetch("https://randomuser.me/api/?results=" + cantidad)
            .then(resource => resource.json())
            .then(data => { 
                let dataNueva = this.state.items.push(data.results)
                this.setState({items: dataNueva})
                console.log(dataNueva);         
            }) 
    }
    
    render(){

        return(
            <>
            <div className="filtrosPadre">
            <div>
            <h4>Filtrar por nombre</h4>
            <input className="cantidadAgregar" name="cantidad"/>
            </div>
            <div>
            <h4>Filtrar por edad</h4>
            <input className="cantidadAgregar" name="cantidad"/>
            </div>
            <div>
            <h4>Filtrar por nacionalidad</h4>
            <input className="cantidadAgregar" name="cantidad"/>
            </div>
            </div>
            <div className='personasPadre'>    
                {
                this.state.items.map((persona)=>(
                    <Tarjeta datospersona = {persona} key={persona.login.uuid} color="white" displayDetalle="none" onDelete={this.borrarTarjeta}/> 
                ))
                }   
            
            </div>

            <div style={{textAlign: "center"}}>
            <button onClick={this.reset.bind(this)}>Reset Originales</button>
            </div>

            <div style={{textAlign: "center", padding: "20px"}}>
                <h3>
                cuantas tarjetas desea agregar?
                </h3>
                <button onClick={this.agregarTarjetas}>Agregar tarjetas</button>  
                <input className="cantidadAgregar" name="cantidad"/>
            </div>
            </> 
        )
    }
}

export default Body; 