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
        this.setState({items: []})
        // hay que hacer que resetee a los originales pero cuando ngo en vez de [] itemsOriginales me dice 
        // que items originales no esta definido, cuando arriba si le pusimos valor y hasta aparece en el log si lo pedis
    }
    
    render(){

        return(
            <>
            <button onClick={this.reset.bind(this)}>Reset Originales</button>
            <div className='personasPadre'>    
                {
                this.state.items.map((persona)=>(
                    <Tarjeta datospersona = {persona} key={persona.login.uuid} color="white" onDelete={this.borrarTarjeta}/> 
                ))
                }   
            
            </div>  
            </> 
        )
    }
}

export default Body; 