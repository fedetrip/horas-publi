import { useLocation, useNavigate } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const getTitle = () => {
    const path = location.pathname;
    if (path.startsWith("/editar/")) {
      return "Editar Día";
    }
    switch (path) {
      case "/":
        return "Listado de Días";
      case "/nuevo":
        return "Agregar Día";
      case "/results":
        return "Resultados";
      default:
        return "Bolo Calculaste? beta";
    }
  };

  const showBack =
    location.pathname === "/nuevo" ||
    location.pathname.startsWith("/editar") ||
    location.pathname === "/results";

  return (
    <nav className="bg-red-600 text-white">
      <div className="flex items-center justify-between p-4 w-full">
        <div className="w-6">
          {showBack && (
            <button
              onClick={() => navigate("/")}
              aria-label="Volver"
              className="p-1 text-2xl"
            >
              &larr;
            </button>
          )}
        </div>
        <h1 className="text-lg font-semibold text-center flex-grow">
          {getTitle()}
        </h1>
        <div className="w-6 text-right">
          {location.pathname === "/" && (
            <button
              onClick={() => navigate("/nuevo")}
              aria-label="Agregar"
              className="p-1 text-2xl"
            >
              +
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
