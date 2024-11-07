import { Card, CardContent, Typography } from "@mui/material";

export default function CardDay({ day }) {
  const {
    tipoJornada,
    fechaEntrada,
    horaEntrada,
    fechaSalida,
    horaSalida,
    penalidad,
    minutosPenalidad,
  } = day;

  return (
    <Card>
      <CardContent>
        <Typography variant="h6">Tipo de Jornada: {tipoJornada}</Typography>
        <Typography>Fecha de Entrada: {fechaEntrada}</Typography>
        <Typography>Hora de Entrada: {horaEntrada}</Typography>
        <Typography>Fecha de Salida: {fechaSalida}</Typography>
        <Typography>Hora de Salida: {horaSalida}</Typography>
        <Typography>Penalidad: {penalidad}</Typography>
        <Typography>Minutos de Penalidad: {minutosPenalidad}</Typography>
      </CardContent>
    </Card>
  );
}
