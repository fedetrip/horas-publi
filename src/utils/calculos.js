// Función para formatear números
const formatNumber = (num) => {
  if (Number.isInteger(num)) {
    return num; // Si es entero, devolver sin decimales
  }
  return parseFloat(num.toFixed(2)); // Si no, devolver con dos decimales
};

// Función para clasificar jornadas en base al tipo
export const clasificarJornadas = (jornadas) => {
  const jornadasDe8 = jornadas.filter((j) => j.tipoJornada === 8).length;
  const jornadasDe12 = jornadas.filter((j) => j.tipoJornada === 12);
  return { jornadasDe8, jornadasDe12 };
};

// Función para calcular las horas extras de jornadas de tipo 12
export const calcularHorasExtras = (jornadasDe12) => {
  let horasExtras100 = 0,
    horasExtras200 = 0,
    horasExtras300 = 0;

  jornadasDe12.forEach((j, i) => {
    const duracion =
      (j.timestampSalida - j.timestampEntrada) / (1000 * 60 * 60);
    const horasNormales = Math.min(duracion, 12);
    const horasExtras = duracion - horasNormales;

    // Calcular horas extras por duración de la jornada
    if (horasExtras > 0) {
      if (horasExtras <= 4) {
        horasExtras100 += horasExtras;
      } else if (horasExtras <= 6) {
        horasExtras100 += 4;
        horasExtras200 += horasExtras - 4;
      } else {
        horasExtras100 += 4;
        horasExtras200 += 2;
        horasExtras300 += horasExtras - 6;
      }
    }

    // Calcular enganche si no es la primera jornada
    if (i > 0) {
      const jornadaAnterior = jornadasDe12[i - 1];
      const horasDeDescanso =
        (j.timestampEntrada - jornadaAnterior.timestampSalida) /
        (1000 * 60 * 60);

      if (horasDeDescanso < 12) {
        const horasFaltantes = 12 - horasDeDescanso;
        horasExtras100 += horasFaltantes; // Sumar las horas faltantes como extras al 100%
      }
    }

    // Sumar el penalty si aplica
    if (j.penalidad) {
      horasExtras100 += j.minutosPenalidad / 60; // Convertir minutos a horas
    }
  });

  return { horasExtras100, horasExtras200, horasExtras300 };
};

// Función para formatear los resultados finales
export const formatearResultados = ({
  jornadasDe8,
  jornadasDe12,
  horasExtras,
}) => {
  return [
    { concepto: "Jornada de 8hs", cantidad: jornadasDe8 },
    { concepto: "Jornada de 12hs", cantidad: jornadasDe12.length },
    {
      concepto: "Horas Extras",
      detalle: "100%",
      cantidad: formatNumber(horasExtras.horasExtras100) || 0,
    },
    {
      concepto: "Horas Extras",
      detalle: "200%",
      cantidad: formatNumber(horasExtras.horasExtras200) || 0,
    },
    {
      concepto: "Horas Extras",
      detalle: "300%",
      cantidad: formatNumber(horasExtras.horasExtras300) || 0,
    },
  ];
};
