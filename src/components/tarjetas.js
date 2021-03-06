import React, {Component} from 'react';
import Body from "./body";

class Tarjeta extends Component{

    constructor(props){
        super(props);
        this.state = {
            colorOriginal: props.color,  
            displayDetalles: props.displayDetalle            
        }
    }

    
    
    verDetalles(){
        if(this.state.displayDetalles === "none")
            this.setState({ 
                displayDetalles: "inline" 
            })
        else
            this.setState({
                displayDetalles: "none"
            })
    }  
    
    


    render(){
        return(
        <div className="tarjetaPadre"  style = {{backgroundColor: this.state.color, flexDirection: this.props.flex, width: this.props.widthPadre}}
        
        >
            <div className="tarjetaImagen" style = {{width: this.props.widthTarjeta, height: this.props.heightTarjeta}}>
                <img src={this.props.datospersona.picture.large}  alt="" className='imagenTarjeta'></img>
            </div>
           
            <div className='tarjetaHijo' style = {{width: this.props.widthTarjeta, height: this.props.heightTarjeta}}>
                <h3>{this.props.datospersona.name.first} {this.props.datospersona.name.last}</h3>
                <h4>{this.props.datospersona.email}</h4>
                <h4>{this.props.datospersona.dob.date.substr(0,10)} ({this.props.datospersona.dob.age})</h4>    
                <button onClick={this.verDetalles.bind(this)}>Detalles</button>
                <button className='borrar' onClick={this.props.onDelete.bind(this, this.props.datospersona.login.uuid)}>Borrar</button>
            </div>
            <div className="botonesMover">
                <i className="flechitas" onClick={this.props.moverIzq.bind(this, this.props.items, this.props.posicion)} class="fas fa-angle-double-left"></i>
                <i className="flechitas" onClick={this.props.moverDer.bind(this, this.props.items, this.props.posicion)} class="fas fa-angle-double-right"></i>

            </div>
            <div className="detalles" style={{display:this.state.displayDetalles}}>
                <h4>{this.props.datospersona.location.street.number} {this.props.datospersona.location.street.name}</h4>
                <h4>{this.props.datospersona.location.city} - {this.props.datospersona.location.state}</h4>
                <h4>{this.props.datospersona.location.country}</h4>
                <h4>{this.props.datospersona.location.postcode}</h4>
                <h4>{this.props.datospersona.registered.date.substr(0,10)}</h4>
            </div>
        </div>
        );
    }

}

export default Tarjeta;
