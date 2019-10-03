import React,{useState,Fragment} from 'react'

function Formulario({crearCita}){
  let [cita, actualizarCita]=useState({
    mascota:'',
    propietario:'',
    fecha:'',
    hora:'',
    sintomas:'',
  });


let actualizarState=(e)=>{
actualizarCita({
  ...cita,
  [e.target.name]:e.target.value
})
}

let enviarCita=(e)=>{
  e.preventDefault();
  //lo siguiete es pasar la cita hacia el componente principal
  console.log(cita)
  //despues reiniciar el state y el form
  crearCita(cita)
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
                  />

                  <label>Nombre Dueño</label>
                  <input 
                    type="text" 
                    name="propietario"
                    className="u-full-width"  
                    placeholder="Nombre Dueño de la Mascota" 
                    onChange={actualizarState}
                  />

                  <label>Fecha</label>
                  <input 
                    type="date" 
                    className="u-full-width"
                    name="fecha"
                    onChange={actualizarState}
                  />               

                  <label>Hora</label>
                  <input 
                    type="time" 
                    className="u-full-width"
                    name="hora" 
                    onChange={actualizarState}
                  />

                  <label>Sintomas</label>
                  <textarea 
                    className="u-full-width"
                    name="sintomas"
                    onChange={actualizarState}
                  ></textarea>

                  <button type="submit" className="button-primary u-full-width">Agregar</button>
          </form>
  </Fragment>
  )
}

function App (){
//use state returona 2 piesas de funciones

//state es igual a tener el state actual
let [citas, guardarCitas]=useState([]);
//el segundo es la que actualiza el state

//necesitamos a continuacion un metodo para agregar las nuevas citas al state
let crearCita=cita=>{
  //tomar una copia del state y crear un nuevo cliente
  let nuevasCitas=[...citas, cita]
  console.log(nuevasCitas)
  guardarCitas(nuevasCitas)
}

return(<Fragment>
  <h1>Administrador de pacientes</h1>
  <div className='container'>
    <div className='row'>
      <div className='one-half column'>
        <Formulario crearCita={crearCita} />
      </div>
      <div className='one-half column'>
      
      </div>
    </div>
  </div>
</Fragment>
)

}
export default App