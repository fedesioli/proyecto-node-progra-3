import React, {Component} from 'react';

class Tarjeta extends Component{

    constructor(props){
        super(props);
        this.state = {
            colorOriginal: props.color,              
            
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
            <button onClick={this.cambiarColorBoton.bind(this)}>Cambiar color</button>
            <button onClick={this.props.onDelete.bind(this, this.props.datospersona.login.uuid)}>Borrar</button>
            </div>
        </div>
        );
    }

}

export default Tarjeta;
