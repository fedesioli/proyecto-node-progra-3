import React, {Component} from 'react';

class Tarjeta extends Component{

    constructor(props){
        super(props);
        this.state = {
            colorOriginal: props.color,  
            displayDetalles: props.displayDetalle            
        }
    }

    cambiarColorHover(){
        if(this.state.color === "pink")
        this.setState({
            color: "pink",
        })
        else
        this.setState({
            color: "lightgray",
        })
    }
    cambiarColorHover2(){
        if(this.state.color === "pink")
        this.setState({
            color: "pink",
        })
        else
        this.setState({
            color: "white",
        })
    }
    cambiarColorBoton(){
        if(this.state.color === "white")
            this.setState({
                color: "pink",
            })
        else   
            this.setState({
                color: "white",
            }) 
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
        <div className="tarjetaPadre"  style = {{backgroundColor: this.state.color}}
        onMouseEnter={this.cambiarColorHover.bind(this)}
        onMouseOut={this.cambiarColorHover2.bind(this)}
        >
            <img src={this.props.datospersona.picture.large}  alt="" className='imagenTarjeta'></img>
            <div className='tarjetaHijo'>
            <h3>{this.props.datospersona.name.first} {this.props.datospersona.name.last}</h3>
            <h4>{this.props.datospersona.email}</h4>
            <h4>{this.props.datospersona.dob.date.substr(0,10)} ({this.props.datospersona.dob.age})</h4>
            
            <div className="detalles" style={{display:this.state.displayDetalles}}>
                <h4>{this.props.datospersona.location.street.number} {this.props.datospersona.location.street.name}</h4>
                <h4>{this.props.datospersona.location.city} - {this.props.datospersona.location.state}</h4>
                <h4>{this.props.datospersona.location.country}</h4>
                <h4>{this.props.datospersona.location.postcode}</h4>
                <h4>{this.props.datospersona.registered.date.substr(0,10)}</h4>
            </div>
            

            <button onClick={this.cambiarColorBoton.bind(this)}>Cambiar color</button>
            <button onClick={this.verDetalles.bind(this)}>Detalles</button>
            <button className='borrar' onClick={this.props.onDelete.bind(this, this.props.datospersona.login.uuid)}>X</button>
            </div>
        </div>
        );
    }

}

export default Tarjeta;
