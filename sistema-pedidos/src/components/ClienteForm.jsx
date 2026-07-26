import { useState } from "react";
import ClienteCard from "./ClienteCard";
import {
  FaUser,
  FaPhone,
  FaMapMarkerAlt,
  FaSearch,
  FaUsers,
  FaSave
} from "react-icons/fa";

function ClienteForm() {

  // Estados del formulario
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [direccion, setDireccion] = useState("");

  // Lista de clientes
  const [clientes, setClientes] = useState([]);

  // Estados para edición
  const [modoEdicion, setModoEdicion] = useState(false);
  const [indiceEditar, setIndiceEditar] = useState(null);
const [buscar, setBuscar] = useState("");

  // Registrar cliente
  function registrarCliente(e) {

    e.preventDefault();

    if (
      nombre.trim() === "" ||
      telefono.trim() === "" ||
      direccion.trim() === ""
    ) {
      alert("Por favor complete todos los campos.");
      return;
    }

    // Si estamos editando, por ahora solo mostramos un mensaje.
    // En el siguiente paso aquí irá la actualización.
    if (modoEdicion) {

  const copiaClientes = [...clientes];

  copiaClientes[indiceEditar] = {
    nombre,
    telefono,
    direccion
  };

  setClientes(copiaClientes);

  alert("Cliente actualizado correctamente.");

  limpiarFormulario();

  return;

}

    const nuevoCliente = {
      nombre,
      telefono,
      direccion
    };

    setClientes([...clientes, nuevoCliente]);

    alert("Cliente registrado correctamente.");

    limpiarFormulario();
  }

  // Cargar datos al formulario
  function editarCliente(cliente, index) {

    setNombre(cliente.nombre);
    setTelefono(cliente.telefono);
    setDireccion(cliente.direccion);

    setIndiceEditar(index);

    setModoEdicion(true);

  }

  // Limpiar formulario

  // Eliminar cliente
function eliminarCliente(index) {

  const confirmar = window.confirm(
    "¿Está seguro de eliminar este cliente?"
  );

  if (!confirmar) return;

  const copiaClientes = [...clientes];

  copiaClientes.splice(index, 1);

  setClientes(copiaClientes);

}
  function limpiarFormulario() {

    setNombre("");
    setTelefono("");
    setDireccion("");

    setModoEdicion(false);
    setIndiceEditar(null);

  }

  return (

    <div>

      <h2>
  <FaUser /> Registro de Clientes
</h2>

      <form onSubmit={registrarCliente}>

        <label>
  <FaUser /> Nombre
</label>

        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />

        <label>
  <FaPhone /> Teléfono
</label>

        <input
          type="text"
          value={telefono}
          onChange={(e) => setTelefono(e.target.value)}
        />

        <label>
  <FaMapMarkerAlt /> Dirección
</label>

        <input
          type="text"
          value={direccion}
          onChange={(e) => setDireccion(e.target.value)}
        />

        <button type="submit">
  {modoEdicion ? (
    <>
      <FaSave /> Actualizar Cliente
    </>
  ) : (
    <>
      <FaSave /> Registrar Cliente
    </>
  )}
</button>

      </form>

      <hr />
      <label>
  <FaSearch /> Buscar cliente
</label>

<input
  type="text"
  placeholder="Escriba el nombre del cliente..."
  value={buscar}
  onChange={(e) => setBuscar(e.target.value)}
/>
      <h2>
  <FaUsers /> Clientes registrados ({clientes.length})
</h2>

      <div className="lista-clientes">

        {
          clientes
  .filter((cliente) =>
    cliente.nombre
      .toLowerCase()
      .includes(buscar.toLowerCase())
  )
  .map((cliente, index) => (

            <ClienteCard
    key={index}
    cliente={cliente}
    editar={() => editarCliente(cliente, index)}
    eliminar={() => eliminarCliente(index)}
/>

          ))
        }

      </div>

    </div>

  );

}

export default ClienteForm;