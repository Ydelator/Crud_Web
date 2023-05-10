import React from 'react';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

const Formulario = () => {
    const [index, setIndex] = React.useState()
    const [abierto,setAbierto] = React.useState(false)
    const [nombre, setNombre] = React.useState('')
    const [apellido, setApellido] = React.useState('')
    const [lista, setLista] = React.useState([])
    const registrarDatos=(e)=>{
        nombre.split('').join('')
        e.preventDefault();
        if (!nombre.trim()) {
            alert('Ingrese nombre')
            return
        }
        if (!apellido.trim()) {
            alert('Ingrese apellido')
            return
        }
        setLista([
            ...lista,
            {nombre:nombre, apellido:apellido}
        ])
        e.target.reset()
        setNombre('')
        setApellido('')
    }
    
    const eliminar = (elemento) => {
        var opcion = window.confirm(`¿Desea eliminar el registro ${elemento.nombre}?`)
        if (opcion) {
          const nuevoArray = lista.slice()
          const index = nuevoArray.indexOf(elemento)
          if (index > -1) {
            nuevoArray.splice(index, 1)
            setLista(nuevoArray)
          }
        }
      }

    const AbrirEditar=(elemento)=>{
        setAbierto(!abierto)
        const nuevoArray = lista.slice()
        setIndex(nuevoArray.indexOf(elemento))
        setNombre(elemento.nombre)
        setApellido(elemento.apellido)
    }

    const editar = (e) =>{
        e.preventDefault();
        if (!nombre.trim()) {
            alert('Ingrese Nombre')
            return
        }
        if (!apellido.trim()) {
            alert('Ingrese apellido')
            return
        }
        const nuevoArray = lista.slice()
        const id = index 
        if (index > -1) {
            nuevoArray.splice(id, 1, {nombre: nombre, apellido: apellido})
            setLista(nuevoArray)
        }
        setAbierto(!abierto)
        setNombre('')
        setApellido('')
    }
    
  return (
    <div className='container'>
        <h2>Formulario</h2>
        <form onSubmit={registrarDatos}>
            <input type="text" 
            placeholder='Ingrese su nombre'
            className='form-control mb-3'
            onChange={(e)=>setNombre(e.target.value)}/>
            <input type="text" 
            placeholder='Ingrese su Apellido'
            className='form-control mb-3'
            onChange={(e)=>setApellido(e.target.value)}/>
            <div className='d-grip gap-2'>
                <button className='btn btn-outline-primary'
                type='submit'>Registrar</button>
            </div>
        </form>
        <hr />
        <h2>Listado de usuarios</h2>
        
        <hr />
        <table className='table'>
            <thead>
                <tr>
                    <th scope='col'>#</th>
                    <th scope='col' className='text-center'>Nombre</th>
                    <th scope='col' className='text-center'>Apellido</th>
                    <th scope='col' className='text-center'>Acciones</th>
                </tr>
            </thead>
            <tbody id='Body'>
                {
                    lista.map((elemento, index)=>(
                        <tr key={index}>
                            <td>{index+1}</td>
                            <td className='text-center'>{elemento.nombre}</td>
                            <td className='text-center'>{elemento.apellido}</td>
                            <td className='text-center'>
                                <button type='button' className='btn btn-warning ms-3 me-1' onClick={()=>AbrirEditar(elemento)}>Editar</button>
                                <button type='button' className='btn btn-danger ms-1 me-3' onClick={()=>eliminar(elemento, index)}>Eliminar</button>
                            </td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
        <Modal isOpen={abierto}>
            <ModalHeader>
                Editar usuario
            </ModalHeader>
            <ModalBody>
                <form onSubmit={editar}>
                <input type="text" 
                placeholder='Ingrese su nombre'
                className='form-control mb-3'
                onChange={(e)=>setNombre(e.target.value)}
                value={nombre}/>
                <input type="text" 
                placeholder='Ingrese su Apellido'
                className='form-control mb-3'
                onChange={(e)=>setApellido(e.target.value)} value={apellido}/>
                <div className='d-grip gap-2'>
                    <button className='btn btn-outline-primary ms-5'
                    type='submit'>Actualizar</button>
                    <button type='button' className='btn btn-outline-primary ms-5' onClick={()=>setAbierto(!abierto)}>Cancelar</button>
                </div>
                </form>
            </ModalBody>
        </Modal>
    </div>
  )
}

export default Formulario