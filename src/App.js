import React,{useState,Fragment,useEffect} from 'react'

function Cita({cita,index,eliminarCita}){
  return(
    <div className='cita'>
      <p>Mascota:<span>{cita.mascota}</span></p>
      <p>Dueño: <span>{cita.propietario}</span></p>
      <p>Fecha: <span>{cita.fecha}</span></p>
      <p>Hora: <span>{cita.hora}</span></p>
      <p>Sintomas: <span>{cita.sintomas}</span></p>
      <button 
        onClick={()=>eliminarCita(index)}
        type='button' className='button eliminar u-full_width'>Eliminar X</button>
    </div>
  )

}

function Formulario({crearCita}){
  let stateReiniciarInicial={
    mascota:'',
    propietario:'',
    fecha:'',
    hora:'',
    sintomas:'',
  }

  //cita = state Reiniciar Inicial
  let [cita, actualizarCita]=useState(stateReiniciarInicial);

//actualiza el state
let actualizarState=(e)=>{
actualizarCita({
  ...cita,
  [e.target.name]:e.target.value
})
}

//pasamos la cita al componente principal
let enviarCita=(e)=>{
  e.preventDefault();
  //lo siguiete es pasar la cita hacia el componente principal
  console.log(cita)
  crearCita(cita)
  //despues reiniciar el state y el form
  actualizarCita(stateReiniciarInicial)
}

  return (
    <Fragment>
      <h2>Crear Cita</h2>

      <form onSubmit={enviarCita}>
                  <label>Nombre Mascota</label>
                  <input 
                    type="text" 
                    name="mascota"
                    className="u-full-width" 
                    placeholder="Nombre Mascota" 
                    onChange={actualizarState}
                    value={cita.mascota}
                  />

                  <label>Nombre Dueño</label>
                  <input 
                    type="text" 
                    name="propietario"
                    className="u-full-width"  
                    placeholder="Nombre Dueño de la Mascota" 
                    onChange={actualizarState}
                    value={cita.propietario}
                  />

                  <label>Fecha</label>
                  <input 
                    type="date" 
                    className="u-full-width"
                    name="fecha"
                    onChange={actualizarState}
                    value={cita.fecha}
                  />               

                  <label>Hora</label>
                  <input 
                    type="time" 
                    className="u-full-width"
                    name="hora" 
                    onChange={actualizarState}
                    value={cita.hora}
                  />

                  <label>Sintomas</label>
                  <textarea 
                    className="u-full-width"
                    name="sintomas"
                    onChange={actualizarState}
                    value={cita.sintomas}
                  ></textarea>

                  <button type="submit" className="button-primary u-full-width">Agregar</button>
          </form>
  </Fragment>
  )
}

function App (){
  //cargaremos las citas del localstorage como state inicial
  let citasIniciales=JSON.parse(localStorage.getItem('citas'))
  if(!citasIniciales){
    citasIniciales=[]
  }
//use state returona 2 piesas de funciones

//state es igual a tener el state actual
let [citas, guardarCitas]=useState(citasIniciales);
//el segundo es la que actualiza el state

//necesitamos a continuacion un metodo para agregar las nuevas citas al state
let crearCita=cita=>{
  //tomar una copia del state y crear un nuevo cliente
  let nuevasCitas=[...citas, cita]
  console.log(nuevasCitas)
  guardarCitas(nuevasCitas)
}

//Elimina las citas del state

let eliminarCita=index=>{
  let nuevasCitas=[...citas]
  nuevasCitas.splice(index,1)
  guardarCitas(nuevasCitas)
}

//ya no se usa component dis mout y tampoco component willmount
useEffect(
  ()=>{
    // console.log('componente listo o algo cambio')
    let citasIniciales=JSON.parse(localStorage.getItem('citas'))
    //vamos a guardar todo en el local storage
    //iniciamos con leer si hay sitas
    if(citasIniciales){
      localStorage.setItem('citas', JSON.stringify(citas))
    }else {
      //el else funciona para crear el local storage
      localStorage.setItem('citas',JSON.stringify([]))
    }
  },[citas]
)


//cargar dinamicamente un titulo
let titulo=Object.keys(citas).length===0?'No hay citas':'administrar las citas aqui'

return(<Fragment>
  <h1>Administrador de pacientes</h1>
  <div className='container'>
    <div className='row'>
      <div className='one-half column'>
        <Formulario crearCita={crearCita} />
      </div>
      <div className='one-half column'>
        <h2>{titulo}</h2>
      {citas.map((cita, index)=>(
        <Cita
          key={index}
          index={index}
          cita={cita}
          eliminarCita={eliminarCita}
        />
      ))}
      </div>
    </div>
  </div>
</Fragment>
)

}
export default App