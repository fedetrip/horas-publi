import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { validateDay, isFormValid } from "../utils/validations";

const EditDay = () => {
  const { timestampEntrada } = useParams();
  const navigate = useNavigate();

  // Cargar los días desde el localStorage y encontrar el día que corresponde al timestamp
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
    setForm((prevForm) => ({
      ...prevForm,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Crear timestamps temporales para validación
    const fechaEntrada = new Date(form.fechaEntrada);
    const [horasEntrada, minutosEntrada] = form.horaEntrada
      .split(":")
      .map(Number);
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

    // Leer jornadas existentes ignorando la actual jornada (usando el original)
    const filteredDays = existingDays.filter(
      (day) => day.timestampEntrada !== Number(timestampEntrada)
    );

    // Validar el día
    const errors = validateDay(updatedDay, filteredDays);

    if (errors.length > 0) {
      alert(`Errores de validación:\n- ${errors.join("\n- ")}`);
      return;
    }

    // Actualizar la jornada en el array existente
    const updatedDays = existingDays.map((day) =>
      day.timestampEntrada === Number(timestampEntrada) ? updatedDay : day
    );

    // Guardar jornadas actualizadas en localStorage
    localStorage.setItem("days", JSON.stringify(updatedDays));
    navigate("/");
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      padding={2}
    >
      <FormControl
        fullWidth
        margin="normal"
      >
        <InputLabel id="tipoJornada-label">Tipo de Jornada</InputLabel>
        <Select
          labelId="tipoJornada-label"
          id="tipoJornada"
          name="tipoJornada"
          value={form.tipoJornada}
          onChange={handleChange}
          label="Tipo de Jornada"
          required
        >
          <MenuItem value={8}>8 horas</MenuItem>
          <MenuItem value={12}>12 horas</MenuItem>
        </Select>
      </FormControl>

      <TextField
        label="Fecha de Entrada"
        type="date"
        name="fechaEntrada"
        value={form.fechaEntrada}
        onChange={handleChange}
        fullWidth
        InputLabelProps={{
          shrink: true,
        }}
        margin="normal"
        required
      />

      <TextField
        label="Hora de Entrada"
        type="time"
        name="horaEntrada"
        value={form.horaEntrada}
        onChange={handleChange}
        fullWidth
        InputLabelProps={{
          shrink: true,
        }}
        margin="normal"
        required
      />

      <TextField
        label="Fecha de Salida"
        type="date"
        name="fechaSalida"
        value={form.fechaSalida}
        onChange={handleChange}
        fullWidth
        InputLabelProps={{
          shrink: true,
        }}
        margin="normal"
        required
      />

      <TextField
        label="Hora de Salida"
        type="time"
        name="horaSalida"
        value={form.horaSalida}
        onChange={handleChange}
        fullWidth
        InputLabelProps={{
          shrink: true,
        }}
        margin="normal"
        required
      />

      <Box
        display="flex"
        sx={{
          flex: "0 0 300px",
        }}
      >
        <FormControlLabel
          control={
            <Checkbox
              name="penalidad"
              checked={form.penalidad}
              onChange={handleChange}
            />
          }
          label="Penalty"
          sx={{ margin: "normal" }}
        />
        {form.penalidad && (
          <TextField
            label="Minutos de Penalidad"
            type="number"
            name="minutosPenalidad"
            value={form.minutosPenalidad}
            onChange={handleChange}
            margin="normal"
            required
          />
        )}
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ marginTop: 2 }}
        >
          Guardar
        </Button>
      </Box>
    </Box>
  );
};

export default EditDay;
