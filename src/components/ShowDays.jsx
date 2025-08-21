import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const ShowDays = () => {
  const [days, setDays] = useState([]);
  const [menuDay, setMenuDay] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedDays = JSON.parse(localStorage.getItem("days")) || [];
    const sortedDays = storedDays.sort(
      (a, b) => a.timestampEntrada - b.timestampEntrada
    );
    setDays(sortedDays);
  }, []);

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
        setDays([]);
        Swal.fire({ title: "Borrado!", icon: "success" });
      }
    });
  };

  const deleteDay = (day) => {
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
          (d) => d.timestampEntrada !== day.timestampEntrada
        );
        localStorage.setItem("days", JSON.stringify(updatedDays));
        setDays(updatedDays);
        Swal.fire({ title: "Borrado!", icon: "success" });
      }
    });
  };

  return (
    <div className="w-[95vw] flex flex-col h-[90vh] justify-center">
      <div className="mt-1">
        {days.map((day) => (
          <div
            key={day.timestampEntrada}
            className="border-b py-2 flex justify-between"
          >
            <div>
              <p className="font-medium">
                Fecha: {(() => {
                  const fechaProcesada = new Date(day.fechaEntrada);
                  fechaProcesada.setDate(fechaProcesada.getDate() + 1);
                  return fechaProcesada.toLocaleDateString("es-AR", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                  });
                })()} - Jornada de {day.tipoJornada} horas
              </p>
              <p className="text-sm text-gray-600">
                Entrada: {day.horaEntrada} - Salida: {day.horaSalida} {" "}
                {day.penalidad ? `- Penalty: ${day.minutosPenalidad} min` : ""}
              </p>
            </div>
            <div className="relative">
              <button
                onClick={() => setMenuDay(day)}
                aria-label="menu"
                className="p-1 text-xl"
              >
                ⋮
              </button>
              {menuDay === day && (
                <div className="absolute right-0 mt-2 w-28 bg-white border rounded shadow">
                  <button
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                    onClick={() => {
                      setMenuDay(null);
                      navigate(`/editar/${day.timestampEntrada}`);
                    }}
                  >
                    Editar
                  </button>
                  <button
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                    onClick={() => {
                      setMenuDay(null);
                      deleteDay(day);
                    }}
                  >
                    Borrar
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {days.length > 0 && (
        <div className="mt-auto p-2 flex justify-center gap-4">
          <button
            className="bg-teal-500 text-white px-4 py-2 rounded"
            onClick={() => navigate("/results")}
          >
            Calcular Cierre
          </button>
          <button
            className="bg-red-600 text-white px-4 py-2 rounded"
            onClick={deleteAllDays}
          >
            Borrar todos
          </button>
        </div>
      )}
    </div>
  );
};

export default ShowDays;
