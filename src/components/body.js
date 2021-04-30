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

    // Carga data de la api cuando se monta el componente
    componentDidMount(){
        fetch("https://randomuser.me/api/?results=20")
            .then(resource => resource.json())
            .then(data => { 
                this.setState({items: data.results, itemsOriginales: data.results})
                
            })
    }

    // aca borramos la tarjeta segun id con un evento en el componente tarjetas
    borrarTarjeta = (idTarjeta)=>{
        let resultado = this.state.items.filter( (item)=> {
    
            return item.login.uuid !== idTarjeta;
        })
        this.setState({items: resultado});
    }

    // aca volvemos al estado original para resetear las tarjetas
    reset(){
        this.setState({items: this.state.itemsOriginales})
    }

    // aca agregamos atarjetas segun la cantidad que el usuario ponga en el input
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

    // aca filtramos las tarjetas segun lo que el usuario ponga en el input y elija segun lo que quiera filtrar
    filtrarTarjetas(){
        let filterData = document.querySelector(".filterData").value
        let filtrarPor = document.querySelector(".filterBy").value
        console.log(filterData)
        console.log(filtrarPor)

    // primero nos fijamos si el input esta vacio para ver si filtramos o volvemos al estado original
        if(filterData != ""){

    // aca filtramos segun lo que eigio el usuario
            if (filtrarPor === "edad"){
                let resultado = this.state.items.filter( (item)=> {
                    let edad = item.dob.age
                    let edad2 = edad.toString()
                     return edad2.includes(filterData);
                    
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

        // ordenamos las tarjetas segun lo que quiera el usuario, descendiente
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

        // ordenamos las tarjetas segun lo que quiera el usuario, ascendiente
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
    
        // cambiamos la manera de visualizar las tarjetas a horizontal
        vista(){
            if(this.state.flex === "column"){
                this.setState({flex: "row", widthTarjeta:"50%", heightTarjeta: "100%", widthPadre:"40%"})
            } else {
                this.setState({flex: "column", widthTarjeta:"100%", heightTarjeta: "50%", widthPadre: "20%"})     
            }
        }
    // moverIzq(items, posicion){
        
    //     let array = items
    //     // let variable = array[posicion - 1]
    //     // array.splice(posicion-1,0,array[posicion])
       
    //         array[posicion] = array.splice(posicion-1, 1, array[posicion])[0];
      
    //     // array[posicion] = variable
    //     console.log(array)
    //     this.Body.setState({items: array})
    // }

    // movemos una tarjeta un lugar a la izquierda
    moverIzq = (items, posicion)=>{
        let array = items
        array[posicion] = array.splice(posicion-1, 1, array[posicion])[0];
        this.setState({items: array});
    }

    // movemos una tarjeta un lugar a la derecha
    moverDer = (items, posicion)=>{
        let array = items
        array[posicion] = array.splice(posicion+1, 1, array[posicion])[0];
        this.setState({items: array});
    }
    render(){

        return(
            <>
            <div className="filtrosPadre">
                <div className="filtosIzq">
                <h4>Filtrar por:</h4>
                <select className="filterBy" name="filterBy">
                    <option value="edad">Edad</option>
                    <option value="nombre">Nombre</option>
                    <option value="nacionalidad">Nacionalidad</option>
                </select>
                <input onInput={this.filtrarTarjetas.bind(this)} className="filterData" name="filterData" type= "text"/>
                </div>
               
                <button className="botonVista" onClick={this.vista.bind(this)}>cambiar vista</button>
               
                <div className="filtosDer">
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

                 // con un map imprimimos las tarjetas y pasamos las props que necesitamos en ese componente
                    <Tarjeta datospersona = 
                        {persona} 
                        key={persona.login.uuid}
                        color="white" 
                        displayDetalle="none" 
                        flex={this.state.flex}
                        widthTarjeta={this.state.widthTarjeta}
                        heightTarjeta={this.state.heightTarjeta}
                        widthPadre={this.state.widthPadre}
                        onDelete={this.borrarTarjeta}
                        posicion={this.state.items.indexOf(persona)}
                        moverIzq= {this.moverIzq}
                        moverDer= {this.moverDer}
                        items= {this.state.items}
                    /> 
                        
                    ))
                }   
                   

            
            </div>

            <div style={{textAlign: "center"}}>
            <button onClick={this.reset.bind(this)}>Reset Tarjetas</button>
            </div>

            <div style={{textAlign: "center", padding: "20px"}}>
                <h3>
                Cuantas tarjetas desea agregar?
                </h3>
                <input className="cantidadAgregar" name="cantidad"/>
                <button onClick={this.agregarTarjetas.bind(this)}>Agregar</button>  
            </div>
           
            </> 
        )
    }
}

export default Body; 