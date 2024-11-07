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

    // Combinar fecha y hora de entrada y salida ajustando al horario local
    const fechaHoraEntrada = new Date(
      `${form.fechaEntrada}T${form.horaEntrada}:00`
    );
    const fechaHoraSalida = new Date(
      `${form.fechaSalida}T${form.horaSalida}:00`
    );

    // Crear timestamp con ajuste de zona horaria local
    const timestampEntrada = fechaHoraEntrada.getTime();
    const timestampSalida = fechaHoraSalida.getTime();

    // Añadir el timestamp al objeto de jornada
    const jornadaConTimestamp = {
      ...form,
      timestampEntrada,
      timestampSalida,
    };

    const existingDays = JSON.parse(localStorage.getItem("days")) || [];
    const updatedDays = [...existingDays, jornadaConTimestamp];

    // Guardar en localStorage
    localStorage.setItem("days", JSON.stringify(updatedDays));
    navigate("/"); // Navegar de regreso a la lista de días
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      padding={2}
    >
      <Typography
        variant="h4"
        gutterBottom
        marginBottom={2}
      >
        Crear Día
      </Typography>

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
          label="Penalidad"
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
