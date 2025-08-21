/* eslint-disable react/prop-types */
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
    <div className="border rounded shadow p-4">
      <p className="font-semibold">Tipo de Jornada: {tipoJornada}</p>
      <p>Fecha de Entrada: {fechaEntrada}</p>
      <p>Hora de Entrada: {horaEntrada}</p>
      <p>Fecha de Salida: {fechaSalida}</p>
      <p>Hora de Salida: {horaSalida}</p>
      <p>Penalidad: {penalidad ? "Sí" : "No"}</p>
      {penalidad && <p>Minutos de Penalidad: {minutosPenalidad}</p>}
    </div>
  );
}
