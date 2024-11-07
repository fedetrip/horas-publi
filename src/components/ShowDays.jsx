import {
  Box,
  Button,
  Typography,
  List,
  ListItemText,
  Divider,
  ListItem,
  IconButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Swal from "sweetalert2";

import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

const ShowDays = () => {
  const [days, setDays] = useState([]);
  const navigate = useNavigate();

  const addDay = () => {
    navigate("/nuevo");
  };

  useEffect(() => {
    const storedDays = JSON.parse(localStorage.getItem("days")) || [];
    setDays(storedDays);
  }, []);

  const deleteAllDays = () => {
    Swal.fire({
      title: "Estas Seguro?",
      text: "Borraras todos los dias!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, Eliminar!",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("days"); // Eliminar los días del localStorage
        setDays([]); // Actualizar el estado para reflejar los cambios en la interfaz

        Swal.fire({
          title: "Borrado!",

          icon: "success",
        });
      }
    });
  };

  return (
    <Box
      padding={2}
      sx={{
        width: "100%",
      }}
    >
      <Typography
        variant="h4"
        gutterBottom
      >
        Lista
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={addDay}
      >
        Agregar un nuevo día
      </Button>

      <Box
        marginTop={2}
        display="flex"
        flexWrap="wrap"
        justifyContent="center"
        alignItems="center"
        gap={2}
      >
        <List sx={{ width: "100%" }}>
          {days.map((day, index) => (
            <div key={index}>
              <ListItem
                secondaryAction={
                  <IconButton
                    edge="end"
                    aria-label="menu"
                    onClick={() => navigate(`/editar/${day.timestampEntrada}`)}
                  >
                    <MoreVertIcon />
                  </IconButton>
                }
              >
                <ListItemText
                  primary={`Fecha: ${new Intl.DateTimeFormat("es-AR", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                  }).format(new Date(day.fechaEntrada))}`}
                  secondary={
                    <>
                      <Typography
                        component="span"
                        variant="body2"
                        sx={{ color: "text.primary", display: "inline" }}
                      >
                        {`Entrada: ${day.horaEntrada} - Salida: ${day.horaSalida}`}
                      </Typography>
                      {day.penalidad ? ` - P: ${day.minutosPenalidad}min` : ""}
                    </>
                  }
                />
              </ListItem>

              {index < days.length - 1 && <Divider />}
            </div>
          ))}
        </List>
      </Box>

      {days.length > 0 && (
        <Box
          sx={{
            padding: 2,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => {
              /* Add your logic for calculating closure here */
            }}
          >
            Calcular Cierre
          </Button>
          <Button onClick={deleteAllDays}>Borrar</Button>
        </Box>
      )}
    </Box>
  );
};

export default ShowDays;
