import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { validateDay } from "../utils/validations";

const EditDay = () => {
  const { timestampEntrada } = useParams();
  const navigate = useNavigate();

  const existingDays = JSON.parse(localStorage.getItem("days")) || [];
  const dayToEdit = existingDays.find(
    (day) => day.timestampEntrada === Number(timestampEntrada)
  );

  const [form, setForm] = useState({
    tipoJornada: dayToEdit?.tipoJornada || "",
    fechaEntrada: dayToEdit?.fechaEntrada || "",
    horaEntrada: dayToEdit?.horaEntrada || "",
    fechaSalida: dayToEdit?.fechaSalida || "",
    horaSalida: dayToEdit?.horaSalida || "",
    penalidad: dayToEdit?.penalidad || false,
    minutosPenalidad: dayToEdit?.minutosPenalidad || 0,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const fechaEntrada = new Date(form.fechaEntrada);
    const [horasEntrada, minutosEntrada] = form.horaEntrada.split(":").map(Number);
    fechaEntrada.setHours(horasEntrada, minutosEntrada, 0, 0);
    const nuevoTimestampEntrada = fechaEntrada.getTime();

    const fechaSalida = new Date(form.fechaSalida);
    const [horasSalida, minutosSalida] = form.horaSalida.split(":").map(Number);
    fechaSalida.setHours(horasSalida, minutosSalida, 0, 0);
    const nuevoTimestampSalida = fechaSalida.getTime();

    const updatedDay = {
      ...form,
      timestampEntrada: nuevoTimestampEntrada,
      timestampSalida: nuevoTimestampSalida,
    };

    const filteredDays = existingDays.filter(
      (day) => day.timestampEntrada !== Number(timestampEntrada)
    );

    const errors = validateDay(updatedDay, filteredDays);

    if (errors.length > 0) {
      alert(`Errores de validación:\n- ${errors.join("\n- ")}`);
      return;
    }

    const updatedDays = existingDays.map((day) =>
      day.timestampEntrada === Number(timestampEntrada) ? updatedDay : day
    );

    localStorage.setItem("days", JSON.stringify(updatedDays));
    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 w-screen">
      <div className="mb-4">
        <label htmlFor="tipoJornada" className="block">Tipo de Jornada</label>
        <select
          id="tipoJornada"
          name="tipoJornada"
          value={form.tipoJornada}
          onChange={handleChange}
          required
          className="w-full border rounded p-2 mt-1"
        >
          <option value="">Seleccionar</option>
          <option value={8}>8 horas</option>
          <option value={12}>12 horas</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block">Fecha de Entrada</label>
        <input
          type="date"
          name="fechaEntrada"
          value={form.fechaEntrada}
          onChange={handleChange}
          required
          className="w-full border rounded p-2 mt-1"
        />
      </div>

      <div className="mb-4">
        <label className="block">Hora de Entrada</label>
        <input
          type="time"
          name="horaEntrada"
          value={form.horaEntrada}
          onChange={handleChange}
          required
          className="w-full border rounded p-2 mt-1"
        />
      </div>

      <div className="mb-4">
        <label className="block">Fecha de Salida</label>
        <input
          type="date"
          name="fechaSalida"
          value={form.fechaSalida}
          onChange={handleChange}
          required
          className="w-full border rounded p-2 mt-1"
        />
      </div>

      <div className="mb-4">
        <label className="block">Hora de Salida</label>
        <input
          type="time"
          name="horaSalida"
          value={form.horaSalida}
          onChange={handleChange}
          required
          className="w-full border rounded p-2 mt-1"
        />
      </div>

      <div className="flex items-center mb-4">
        <input
          type="checkbox"
          name="penalidad"
          checked={form.penalidad}
          onChange={handleChange}
          className="mr-2"
        />
        <label>Penalty</label>
        {form.penalidad && (
          <input
            type="number"
            name="minutosPenalidad"
            value={form.minutosPenalidad}
            onChange={handleChange}
            required
            className="ml-4 border rounded p-2 w-32"
          />
        )}
      </div>

      <div className="mt-4 flex justify-center">
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Guardar
        </button>
      </div>
    </form>
  );
};

export default EditDay;
