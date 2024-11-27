// Valida una jornada según su tipo y horarios
export const validateDay = (day, existingDays) => {
  const errors = [];
  const {
    tipoJornada,
    timestampEntrada,
    timestampSalida,
    fechaEntrada,
    fechaSalida,
  } = day;

  // Validar que el timestamp de entrada sea menor al de salida
  if (timestampSalida <= timestampEntrada) {
    errors.push("La hora de salida debe ser posterior a la hora de entrada.");
  }

  // Calcular la duración en milisegundos y convertir a horas
  const durationHours = (timestampSalida - timestampEntrada) / (1000 * 60 * 60);

  if (tipoJornada === 8) {
    // Validar duración máxima para jornadas de 8 horas
    if (durationHours > 8) {
      errors.push(
        "La duración de la jornada de 8 horas no puede superar las 8 horas."
      );
    }
  } else if (tipoJornada === 12) {
    // Jornadas de 12 horas: no se aplica límite
    if (durationHours < 0) {
      errors.push("La duración de la jornada de 12 horas debe ser positiva.");
    }
  } else {
    errors.push("El tipo de jornada es inválido.");
  }

  // Validar duplicados
  const isDuplicate = existingDays.some(
    (existingDay) =>
      existingDay.fechaEntrada === fechaEntrada &&
      existingDay.fechaSalida === fechaSalida &&
      existingDay.horaEntrada === day.horaEntrada &&
      existingDay.horaSalida === day.horaSalida
  );

  if (isDuplicate) {
    errors.push("Ya existe una jornada con los mismos horarios y fechas.");
  }

  return errors;
};

// Función para verificar si un formulario es válido
export const isFormValid = (form) => {
  const { fechaEntrada, horaEntrada, fechaSalida, horaSalida, tipoJornada } =
    form;

  if (
    !fechaEntrada ||
    !horaEntrada ||
    !fechaSalida ||
    !horaSalida ||
    !tipoJornada
  ) {
    return false; // Todos los campos son obligatorios
  }

  return true;
};
