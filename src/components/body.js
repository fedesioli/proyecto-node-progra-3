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

    // agregarTarjetas(value, event){
    //     event.preventDefault();
    //     fetch("https://randomuser.me/api/?results=" + value)
    //         .then(resource => resource.json())
    //         .then(data => { 
    //             this.state.items.push(data.results)
    //             console.log(data.results)
    //         })
    // }
    
    render(){

        return(
            <>
            <button onClick={this.reset.bind(this)}>Reset Originales</button>


            {/* <form className="formAgregar" onSubmit={this.agregarTarjetas.bind(this, input.cantidad.value)}>
                <div>cuantas tarjetas desea agregar?</div>
                <input name="cantidad"/>
                <input type="submit" value="Agregar tarjetas"  />
            </form> */}
           

            <div className='personasPadre'>    
                {
                this.state.items.map((persona)=>(
                    <Tarjeta datospersona = {persona} key={persona.login.uuid} color="white" display="none" onDelete={this.borrarTarjeta}/> 
                ))
                }   
            
            </div>  
            </> 
        )
    }
}

export default Body; 