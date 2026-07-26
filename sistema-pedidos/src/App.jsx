// Importa los estilos generales de la aplicación
import "./App.css";

// Importa el componente del formulario de clientes
import ClienteForm from "./components/ClienteForm";

// Importa los iconos
import { FaIceCream, FaHeart } from "react-icons/fa";


// Componente principal
function App() {

  return (

    <div className="contenedor">

      {/* Encabezado */}
      <header className="encabezado">

        <div className="logo">

          <FaIceCream className="iconoLogo" />

        </div>

        <h1>Dushi Ice Cream</h1>

        <h3>Sistema de Gestión de Clientes</h3>

        <p>
          Endulzando cada momento
          <FaHeart className="corazon" />
        </p>

      </header>


      {/* Formulario */}

      <ClienteForm />


      {/* Pie de página */}

      <footer className="footer">

        <p>

          © 2026 Dushi Ice Cream

        </p>

      </footer>

    </div>

  );

}

export default App;