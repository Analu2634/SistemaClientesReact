function ClienteCard({ cliente, editar, eliminar }) {

    import {
  FaUser,
  FaPhone,
  FaMapMarkerAlt,
  FaEdit,
  FaTrash
} from "react-icons/fa";
  return (

    <div className="tarjeta-cliente">

      <h3>
  <FaUser /> {cliente.nombre}
</h3>
      <p>
  <FaPhone /> {cliente.telefono}
</p>

      <p>
  <FaMapMarkerAlt /> {cliente.direccion}
</p>

      <div className="botones">

        <button
          className="editar"
          onClick={editar}
        >
          <>
  <FaEdit /> Editar
</>
        </button>

        <button
  className="eliminar"
  onClick={eliminar}
>
  <>
  <FaTrash /> Eliminar
</>
</button>

      </div>

    </div>

  );

}

export default ClienteCard;