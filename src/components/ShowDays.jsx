import {
  Box,
  Button,
  Typography,
  List,
  ListItemText,
  Divider,
  ListItem,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const ShowDays = () => {
  const [days, setDays] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null); // Estado para el menú
  const [selectedDay, setSelectedDay] = useState(null); // Día seleccionado
  const navigate = useNavigate();

  const handleMenuClick = (event, day) => {
    setAnchorEl(event.currentTarget);
    setSelectedDay(day); // Guarda el día seleccionado
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedDay(null);
  };

  const addDay = () => {
    navigate("/nuevo");
  };

  const deleteAllDays = () => {
    Swal.fire({
      title: "Estas Seguro?",
      text: "Borraras todos los días!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, Eliminar!",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("days");
        setDays([]); // Actualizar el estado para reflejar los cambios en la interfaz

        Swal.fire({
          title: "Borrado!",
          icon: "success",
        });
      }
    });
  };

  const deleteDay = () => {
    Swal.fire({
      title: "Estas Seguro?",
      text: "Borraras este día!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, Eliminar!",
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedDays = days.filter(
          (day) => day.timestampEntrada !== selectedDay.timestampEntrada
        );
        localStorage.setItem("days", JSON.stringify(updatedDays));
        setDays(updatedDays);
        handleClose(); // Cerrar el menú

        Swal.fire({
          title: "Borrado!",
          icon: "success",
        });
      }
    });
  };

  useEffect(() => {
    const storedDays = JSON.parse(localStorage.getItem("days")) || [];
    const sortedDays = storedDays.sort(
      (a, b) => a.timestampEntrada - b.timestampEntrada
    );
    setDays(sortedDays);
  }, []);

  return (
    <Box
      sx={{
        width: "95vw",
        display: "flex",
        flexDirection: "column",
        minHeight: "90vh", // Asegura que el contenedor ocupe toda la altura de la página
        justifyContent: "center",
      }}
    >
      <Box marginTop={1}>
        <List sx={{ width: "100%" }}>
          {days.map((day, index) => (
            <div key={index}>
              <ListItem
                sx={{
                  borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
                }}
                secondaryAction={
                  <IconButton
                    edge="end"
                    aria-label="menu"
                    onClick={(event) => handleMenuClick(event, day)}
                  >
                    <MoreVertIcon />
                  </IconButton>
                }
              >
                <ListItemText
                  primary={`Fecha: ${(() => {
                    const fechaProcesada = new Date(day.fechaEntrada);
                    fechaProcesada.setDate(fechaProcesada.getDate() + 1);
                    return fechaProcesada.toLocaleDateString("es-AR", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                    });
                  })()} - Jornada de ${day.tipoJornada} horas`}
                  secondary={`Entrada: ${day.horaEntrada} - Salida: ${
                    day.horaSalida
                  } ${
                    day.penalidad
                      ? `- Penalty: ${day.minutosPenalidad} minutos`
                      : ""
                  }`}
                />
              </ListItem>

              {index < days.length - 1 && <Divider />}
            </div>
          ))}
        </List>
      </Box>

      {/* Menú de opciones */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem
          onClick={() => {
            handleClose();
            navigate(`/editar/${selectedDay.timestampEntrada}`);
          }}
        >
          Editar
        </MenuItem>
        <MenuItem onClick={deleteDay}>Borrar</MenuItem>
      </Menu>

      {/* Botones al pie de la página */}
      {days.length > 0 && (
        <Box
          sx={{
            marginTop: "auto", // Empuja los botones al fondo
            padding: 2,
            display: "flex",
            justifyContent: "center",
            gap: 2,
          }}
        >
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => {
              navigate("/results");
              /* Lógica para calcular cierre */
            }}
          >
            Calcular Cierre
          </Button>
          <Button onClick={deleteAllDays}>Borrar todos</Button>
        </Box>
      )}
    </Box>
  );
};

export default ShowDays;
