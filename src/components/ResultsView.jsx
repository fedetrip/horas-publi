import { useEffect, useState } from "react";
import {
  clasificarJornadas,
  calcularHorasExtras,
  formatearResultados,
} from "../utils/calculos";

const ResultsView = () => {
  const [resultados, setResultados] = useState([]);

  useEffect(() => {
    const jornadas = JSON.parse(localStorage.getItem("days")) || [];
    const { jornadasDe8, jornadasDe12 } = clasificarJornadas(jornadas);
    const horasExtras = calcularHorasExtras(jornadasDe12);
    const resultadosFormateados = formatearResultados({
      jornadasDe8,
      jornadasDe12,
      horasExtras,
    });
    setResultados(resultadosFormateados);
  }, []);

  return (
    <div className="flex flex-col items-center h-screen w-full">
      <ul className="w-full bg-white">
        {resultados.map(({ concepto, detalle, cantidad }, index) => (
          <li
            key={index}
            className="flex justify-between border-b p-2"
          >
            <div className="min-w-[300px] w-1/2">
              <p className="font-medium">{concepto}</p>
              {detalle && (
                <p className="text-sm text-gray-600">{detalle}</p>
              )}
            </div>
            <div className="w-1/2 flex justify-center items-center">
              {cantidad}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ResultsView;
