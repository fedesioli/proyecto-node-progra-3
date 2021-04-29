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
                let dataNueva = this.state.items.concat(data.results)
                this.setState({items: dataNueva})
                console.log(dataNueva);         
            }) 
    }
    filtrarTarjetas(){
        let filterData = document.querySelector(".filterData").value
        let filtrarPor = document.querySelector(".filterBy").value
        console.log(filterData)
        console.log(filtrarPor)
       
        if(filterData != ""){

            if (filtrarPor === "edad"){
                let resultado = this.state.items.filter( (item)=> {
                    let edad = item.dob.age
                    let edad2 = edad.toString()
                     return edad2.includes(filterData);
                    console.log(edad2)
                })
                this.setState({items: resultado});
                console.log(this.state.items)
            }
            else if(filtrarPor === "nombre"){
                let filterDataMayus = filterData.toUpperCase()
                

                let resultado = this.state.items.filter( (item)=> {
                    let itemDataMayus = item.name.first.toUpperCase()
                    return itemDataMayus.includes(filterDataMayus);
                })
                this.setState({items: resultado});
            }
             else if(filtrarPor == "nacionalidad"){
                let filterDataMayus = filterData.toUpperCase()            
                let resultado = this.state.items.filter( (item)=> {
                    let itemDataMayus = item.location.country.toUpperCase()
                    return itemDataMayus.includes(filterDataMayus);
                })
                this.setState({items: resultado});
             }
        }
        else{
            this.setState({
                items: this.state.itemsOriginales
            })
        }}

        orderUp(){
            let orderBy = document.querySelector(".orderBy").value
            if(orderBy === "edad"){              
                let itemsOrdenados = this.state.items.sort()
                this.setState({items: itemsOrdenados})

            } else if( orderBy === "nombre"){
                let itemsOrdenados = this.state.items.name.first.sort()
                this.setState({items: itemsOrdenados})

            }else if(orderBy === "nacionalidad"){
                let itemsOrdenados = this.state.items.location.country.sort()
                this.setState({items: itemsOrdenados})
            }
        }
        orderDown(){

        }
    render(){

        return(
            <>
            <div className="filtrosPadre">
                <div>
                <h4>Filtrar por:</h4>
                <select className="filterBy" name="filterBy">
                    <option value="edad">Edad</option>
                    <option value="nombre">Nombre</option>
                    <option value="nacionalidad">Nacionalidad</option>
                </select>
                <input onInput={this.filtrarTarjetas.bind(this)} className="filterData" name="filterData" type= "text"/>
                </div>
                <div>
                    <h4>Order by:</h4> 
                    <select className="orderBy" name="orderBy">
                        <option value="edad">Edad</option>
                        <option value="nombre">Nombre</option>
                        <option value="nacionalidad">Nacionalidad</option>
                    </select>
                    <i class="fas fa-sort-up" onClick={this.orderUp.bind(this)} style={{width:"30px"}}></i>
                    <i class="fas fa-sort-down" onClick={this.orderDown.bind(this)} style={{width:"30px"}}></i>
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
                Cuantas tarjetas desea agregar?
                </h3>
                <input className="cantidadAgregar" name="cantidad"/>
                <button onClick={this.agregarTarjetas.bind(this)}>Agregar tarjetas</button>  
            </div>
           
            </> 
        )
    }
}

export default Body; 