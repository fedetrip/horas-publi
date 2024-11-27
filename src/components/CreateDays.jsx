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
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { validateDay, isFormValid } from "../utils/validations";

const CreateDays = () => {
  const [form, setForm] = useState({
    tipoJornada: "",
    fechaEntrada: "",
    horaEntrada: "",
    fechaSalida: "",
    horaSalida: "",
    penalidad: false,
    minutosPenalidad: 0,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Crear timestamps como antes
    const fechaEntrada = new Date(form.fechaEntrada);
    const [horasEntrada, minutosEntrada] = form.horaEntrada
      .split(":")
      .map(Number);
    fechaEntrada.setHours(horasEntrada, minutosEntrada, 0, 0);
    const timestampEntrada = fechaEntrada.getTime();

    const fechaSalida = new Date(form.fechaSalida);
    const [horasSalida, minutosSalida] = form.horaSalida.split(":").map(Number);
    fechaSalida.setHours(horasSalida, minutosSalida, 0, 0);
    const timestampSalida = fechaSalida.getTime();

    const day = { ...form, timestampEntrada, timestampSalida };

    // Leer jornadas existentes
    const existingDays = JSON.parse(localStorage.getItem("days")) || [];

    // Validar el día
    const errors = validateDay(day, existingDays);

    if (errors.length > 0) {
      alert(`Errores de validación:\n- ${errors.join("\n- ")}`);
      return;
    }

    // Guardar datos si son válidos
    const updatedDays = [...existingDays, day];
    localStorage.setItem("days", JSON.stringify(updatedDays));
    navigate("/");
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      padding={2}
      sx={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
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

export default CreateDays;
