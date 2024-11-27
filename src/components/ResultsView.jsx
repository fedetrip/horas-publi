import React, { useEffect, useState } from "react";
import { Box, List, ListItem, ListItemText, Divider } from "@mui/material";
import {
  clasificarJornadas,
  calcularHorasExtras,
  formatearResultados,
} from "../utils/calculos";

const ResultsView = () => {
  const [resultados, setResultados] = useState([]);

  useEffect(() => {
    // Obtener datos del localStorage
    const jornadas = JSON.parse(localStorage.getItem("days")) || [];

    // Clasificar jornadas y calcular horas extras
    const { jornadasDe8, jornadasDe12 } = clasificarJornadas(jornadas);
    const horasExtras = calcularHorasExtras(jornadasDe12);

    // Formatear resultados para la vista
    const resultadosFormateados = formatearResultados({
      jornadasDe8,
      jornadasDe12,
      horasExtras,
    });

    setResultados(resultadosFormateados);
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "100vh",
        width: "100%",
      }}
    >
      <List
        sx={{
          width: "100%",
          bgcolor: "background.paper",
        }}
      >
        {resultados.map(({ concepto, detalle, cantidad }, index) => (
          <React.Fragment key={index}>
            <ListItem>
              <ListItemText
                primary={concepto}
                secondary={detalle || ""}
                sx={{ minWidth: 300, width: "50vw" }}
              />
              <ListItemText
                primary={cantidad}
                sx={{
                  width: "50vw",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              />
            </ListItem>
            <Divider />
          </React.Fragment>
        ))}
      </List>
    </Box>
  );
};

export default ResultsView;
