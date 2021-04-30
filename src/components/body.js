import React, {Component} from 'react';
import Tarjeta from './tarjetas';




class Body extends Component{
    constructor(props){
        super(props);
        this.state = {
            items: [],
            itemsOriginales: [],
            flex: "column",
            widthTarjeta: "100%", 
            heightTarjeta: "100%",
            widthPadre: "20%"
        


           
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
                let itemsOrdenados = this.state.items.sort( function(a,b){
                    return a.dob.age - b.dob.age
                })
                this.setState({items: itemsOrdenados})

            } else if( orderBy === "nombre"){
                  
                let itemsOrdenados = this.state.items.sort(function ( a, b ) {
                    if ( a.name.first.toLowerCase() < b.name.first.toLowerCase()){
                      return -1;
                    }
                    if ( a.name.first.toLowerCase() > b.name.first.toLowerCase() ){
                      return 1;
                    }
                    return 0;
                  })
                this.setState({items: itemsOrdenados})

            }else if(orderBy === "nacionalidad"){
                let itemsOrdenados = this.state.items.sort(function ( a, b ) {
                    if ( a.location.country.toLowerCase() < b.location.country.toLowerCase()){
                      return -1;
                    }
                    if ( a.location.country.toLowerCase() > b.location.country.toLowerCase() ){
                      return 1;
                    }
                    return 0;
                  })
                this.setState({items: itemsOrdenados})
            }
        }
        orderDown(){
            let orderBy = document.querySelector(".orderBy").value
            if(orderBy === "edad"){              
                let itemsOrdenados = this.state.items.sort( function(a,b){
                    return b.dob.age - a.dob.age
                })
                this.setState({items: itemsOrdenados})

            } else if( orderBy === "nombre"){
                  
                let itemsOrdenados = this.state.items.sort(function ( a, b ) {
                    if ( a.name.first.toLowerCase() < b.name.first.toLowerCase()){
                      return 1;
                    }
                    if ( a.name.first.toLowerCase() > b.name.first.toLowerCase() ){
                      return -1;
                    }
                    return 0;
                  })
                this.setState({items: itemsOrdenados})

            }else if(orderBy === "nacionalidad"){
                let itemsOrdenados = this.state.items.sort(function ( a, b ) {
                    if ( a.location.country.toLowerCase() < b.location.country.toLowerCase()){
                      return 1;
                    }
                    if ( a.location.country.toLowerCase() > b.location.country.toLowerCase() ){
                      return -1;
                    }
                    return 0;
                  })
                this.setState({items: itemsOrdenados})
            }
        }

        vista(){
            if(this.state.flex === "column"){
                this.setState({flex: "row", widthTarjeta:"50%", heightTarjeta: "100%", widthPadre:"40%"})
            } else {
                this.setState({flex: "column", widthTarjeta:"100%", heightTarjeta: "50%", widthPadre: "20%"})     
            }
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
                <button onClick={this.vista.bind(this)}>cambiar vista</button>
            </div>
            <div className='personasPadre'>    
                {
                this.state.items.map((persona)=>(
                    <Tarjeta datospersona = 
                        {persona} 
                        key={persona.login.uuid}
                        color="white" 
                        displayDetalle="none" 
                        flex={this.state.flex}
                        widthTarjeta={this.state.widthTarjeta}
                        heightTarjeta={this.state.heightTarjeta}
                        widthPadre={this.state.widthPadre}
                        onDelete={this.borrarTarjeta}/> 
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
                <button onClick={this.agregarTarjetas.bind(this)}>Agregar tarjetas</button>  
                <input className="cantidadAgregar" name="cantidad"/>
            </div>
            </> 
        )
    }
}

export default Body; 