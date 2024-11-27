import { AppBar, Toolbar, Typography, IconButton, Box } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AddIcon from "@mui/icons-material/Add";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  // Función para obtener el título dependiendo de la ruta
  const getTitle = () => {
    const path = location.pathname;

    if (path.startsWith("/editar/")) {
      return "Editar Día";
    }

    switch (path) {
      case "/":
        return "Listado de Días"; // O cualquier nombre para la página principal
      case "/nuevo":
        return "Agregar Día";
      case "/results":
        return "Resultados";
      default:
        return "Bolo Calculaste? beta"; // Título por defecto si no coincide con ninguna ruta
    }
  };

  return (
    <AppBar position="static">
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        {/* Contenedor para los iconos */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          {/* Botón de retroceso (solo en /nuevo y /editar) */}
          {location.pathname === "/nuevo" ||
          location.pathname.startsWith("/editar") ||
          location.pathname === "/results" ? (
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => navigate("/")}
            >
              <ArrowBackIcon />
            </IconButton>
          ) : null}

          {/* Título del Navbar centrado */}
          <Typography
            variant="h6"
            component="div"
            sx={{
              textAlign: "center",
              flexGrow: 1, // Esto asegura que el título se mantenga centrado
            }}
          >
            {getTitle()}
          </Typography>

          {/* Botón de agregar (solo en /) */}
          {location.pathname === "/" && (
            <IconButton
              edge="end"
              color="inherit"
              onClick={() => navigate("/nuevo")}
            >
              <AddIcon />
            </IconButton>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
