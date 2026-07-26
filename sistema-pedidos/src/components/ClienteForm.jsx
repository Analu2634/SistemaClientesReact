// Importa los Hooks de React
import { useState, useEffect } from "react";

// Importa el componente de la tarjeta del cliente
import ClienteCard from "./ClienteCard";

// Importa los iconos
import {
  FaUser,
  FaPhone,
  FaMapMarkerAlt,
  FaSearch,
  FaUsers,
  FaSave
} from "react-icons/fa";

// Componente principal
function ClienteForm() {

  // ============================
  // Estados del formulario
  // ============================

  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [direccion, setDireccion] = useState("");

  // Lista de clientes
  const [clientes, setClientes] = useState([]);

  // Edición
  const [modoEdicion, setModoEdicion] = useState(false);
  const [indiceEditar, setIndiceEditar] = useState(null);

  // Buscador
  const [buscar, setBuscar] = useState("");

  // Mensajes
  const [mensaje, setMensaje] = useState("");
  const [tipoMensaje, setTipoMensaje] = useState("");

  // ============================
  // LocalStorage
  // ============================

  useEffect(() => {
  const clientesGuardados = localStorage.getItem("clientes");

  console.log("Leídos del LocalStorage:", clientesGuardados);

  if (clientesGuardados) {
    setClientes(JSON.parse(clientesGuardados));
  }
}, []);

  useEffect(() => {
  console.log("Guardando:", clientes);

  localStorage.setItem(
    "clientes",
    JSON.stringify(clientes)
  );
}, [clientes]);
  // ============================
  // Registrar cliente
  // ============================

  function registrarCliente(e) {

    e.preventDefault();

    // Validar campos vacíos
    if (
      nombre.trim() === "" ||
      telefono.trim() === "" ||
      direccion.trim() === ""
    ) {

      setMensaje("Todos los campos son obligatorios.");
      setTipoMensaje("error");

      setTimeout(() => {
        setMensaje("");
      }, 3000);

      return;
    }

    // Validar teléfono
    if (telefono.length !== 10) {

      setMensaje("El teléfono debe tener exactamente 10 dígitos.");
      setTipoMensaje("error");

      setTimeout(() => {
        setMensaje("");
      }, 3000);

      return;
    }

    // Editar
    if (modoEdicion) {

      const copiaClientes = [...clientes];

      copiaClientes[indiceEditar] = {
        nombre,
        telefono,
        direccion
      };

      setClientes(copiaClientes);

      setMensaje("Cliente actualizado correctamente.");
      setTipoMensaje("exito");

      setTimeout(() => {
        setMensaje("");
      }, 3000);

      limpiarFormulario();

      return;
    }

    // Registrar nuevo cliente
    const nuevoCliente = {
      nombre,
      telefono,
      direccion
    };

    setClientes([...clientes, nuevoCliente]);

    setMensaje("Cliente registrado correctamente.");
    setTipoMensaje("exito");

    setTimeout(() => {
      setMensaje("");
    }, 3000);

    limpiarFormulario();
  }

  // ============================
  // Editar cliente
  // ============================

  function editarCliente(cliente, index) {

    setNombre(cliente.nombre);
    setTelefono(cliente.telefono);
    setDireccion(cliente.direccion);

    setIndiceEditar(index);
    setModoEdicion(true);

  }

  // ============================
  // Eliminar cliente
  // ============================

  function eliminarCliente(index) {

    const confirmar = window.confirm(
      "¿Está seguro de eliminar este cliente?"
    );

    if (!confirmar) return;

    const copiaClientes = [...clientes];

    copiaClientes.splice(index, 1);

    setClientes(copiaClientes);

    setMensaje("Cliente eliminado correctamente.");
    setTipoMensaje("exito");

    setTimeout(() => {
      setMensaje("");
    }, 3000);

  }

  // ============================
  // Limpiar formulario
  // ============================

  function limpiarFormulario() {

    setNombre("");
    setTelefono("");
    setDireccion("");

    setModoEdicion(false);
    setIndiceEditar(null);

  }

  // ============================
  // Buscar cliente
  // ============================

  const clientesFiltrados = clientes.filter((cliente) =>
    cliente.nombre.toLowerCase().includes(
      buscar.toLowerCase()
    )
  );
    return (

    <div>

      <h2>
        <FaUser /> Registro de Clientes
      </h2>

      {/* Mensajes */}
      {mensaje && (
        <div className={`mensaje ${tipoMensaje}`}>
          {mensaje}
        </div>
      )}

      {/* Formulario */}
      <form onSubmit={registrarCliente}>

        <label>
          <FaUser /> Nombre
        </label>

        <input
          type="text"
          placeholder="Ingrese el nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />

        <label>
          <FaPhone /> Teléfono
        </label>

        <input
          type="text"
          placeholder="Ingrese el teléfono"
          value={telefono}
          maxLength={10}
          onChange={(e) => {
            const soloNumeros = e.target.value.replace(/\D/g, "");
            setTelefono(soloNumeros);
          }}
        />

        <label>
          <FaMapMarkerAlt /> Dirección
        </label>

        <input
          type="text"
          placeholder="Ingrese la dirección"
          value={direccion}
          onChange={(e) => setDireccion(e.target.value)}
        />

        <button type="submit">
          <FaSave />
          {modoEdicion
            ? " Actualizar Cliente"
            : " Registrar Cliente"}
        </button>

      </form>

      <hr />

      {/* Buscador */}

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
        <FaUsers /> Clientes registrados ({clientesFiltrados.length})
      </h2>

      <div className="lista-clientes">

        {clientesFiltrados.length === 0 ? (

          <p>No hay clientes registrados.</p>

        ) : (

          clientesFiltrados.map((cliente, index) => (

            <ClienteCard
              key={index}
              cliente={cliente}
              editar={() => editarCliente(cliente, index)}
              eliminar={() => eliminarCliente(index)}
            />

          ))

        )}

      </div>

    </div>

  );

}

export default ClienteForm;