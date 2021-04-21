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
                console.log(data)
            })
    }

    borrarTarjeta = (idTarjeta)=>{
        let resultado = this.state.items.filter( (item)=> {
            return item.login.uuid !== idTarjeta;
        })
        this.setState({items: resultado});
        // this.props.onBorrar(this.props.id)
    }

    reset(){
        this.setState({items: this.state.itemsOriginales})
    }

    agregarTarjetas(){
        let cantidad = document.querySelector(".cantidadAgregar").value
        fetch("https://randomuser.me/api/?results=" + cantidad)
            .then(resource => resource.json())
            // .then(data => { 
            //     let dataNueva = this.state.items.push(data.results)
            //     this.setState({items: dataNueva})
            //     console.log(data.results)
                
            // }) 
            // nose porque no reconoce el "this"
    }
    
    render(){

        return(
            <>
            <button onClick={this.reset.bind(this)}>Reset Originales</button>


            <div>cuantas tarjetas desea agregar?</div>
                <input className="cantidadAgregar" name="cantidad"/>
                <button onClick={this.agregarTarjetas}>Agregar tarjetas</button>
           

            <div className='personasPadre'>    
                {
                this.state.items.map((persona)=>(
                    <Tarjeta datospersona = {persona} key={persona.login.uuid} color="white" displayDetalle="none" onDelete={this.borrarTarjeta}/> 
                ))
                }   
            
            </div>  
            </> 
        )
    }
}

export default Body; 