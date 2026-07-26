import "./App.css";
import ClienteForm from "./components/ClienteForm";
import { FaShoppingCart } from "react-icons/fa";

function App() {
  return (
    <div className="contenedor">

      <header className="encabezado">

        <h1>
          <FaShoppingCart /> Sistema de Pedidos
        </h1>

        <p>
          Evidencia GA7-220501096-AA3-EV01
        </p>

        <small>
          Desarrollo Frontend con React
        </small>

      </header>

      <ClienteForm />
      <footer className="footer">

  <p>
    Sistema de Pedidos - React
  </p>

  <small>
    Evidencia GA7-220501096-AA3-EV01
  </small>

</footer>

    </div>
  );
}

export default App;