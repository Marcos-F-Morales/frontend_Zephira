import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Grid,
  Paper,
} from "@mui/material";
import api from "../api/axios";

export default function Sucursales() {
  const [sucursales, setSucursales] = useState([]);
  const [form, setForm] = useState({ nombre: "", direccion: "", telefono: "" });

  const cargarSucursales = async () => {
    try {
      const res = await api.get("/sucursales");
      setSucursales(res.data);
    } catch (error) {
      console.error("Error al cargar sucursales:", error);
    }
  };

  useEffect(() => {
    cargarSucursales();
  }, []);

  const guardarSucursal = async () => {
    if (!form.nombre) return;
    try {
      await api.post("/sucursales/create", form);
      alert("✅ Sucursal agregada correctamente");
      setForm({ nombre: "", direccion: "", telefono: "" });
      cargarSucursales();
    } catch (error) {
      console.error("Error al guardar sucursal:", error);
    }
  };

  return (
    <Box sx={{ maxWidth: 700, mx: "auto", mt: 5, backgroundColor: "#F5E1D9", minHeight: "100vh", pb: 4 }}>
      <Typography variant="h5" mb={3} sx={{ color: "#8b3e5e", fontWeight: 700 }}>
        Gestión de Sucursales
      </Typography>

      <Paper sx={{ p: 3, mb: 3, borderRadius: 3, boxShadow: 3 }}>
        <TextField
          label="Nombre de la sucursal"
          fullWidth
          sx={{ mb: 2, "& label": { color: "#8b3e5e" } }}
          value={form.nombre}
          onChange={(e) => setForm({ ...form, nombre: e.target.value })}
        />
        <TextField
          label="Dirección"
          fullWidth
          sx={{ mb: 2, "& label": { color: "#8b3e5e" } }}
          value={form.direccion}
          onChange={(e) => setForm({ ...form, direccion: e.target.value })}
        />
        <TextField
          label="Teléfono"
          fullWidth
          sx={{ "& label": { color: "#8b3e5e" } }}
          value={form.telefono}
          onChange={(e) => setForm({ ...form, telefono: e.target.value })}
        />
        <Button
          variant="contained"
          fullWidth
          sx={{ mt: 2, backgroundColor: "#8b3e5e", "&:hover": { backgroundColor: "#6b2d47" } }}
          onClick={guardarSucursal}
        >
          Agregar
        </Button>
      </Paper>

      <Paper sx={{ p: 3, borderRadius: 3, boxShadow: 3 }}>
        <Typography variant="h6" mb={2} sx={{ color: "#8b3e5e" }}>
          Lista de Sucursales
        </Typography>
        <Grid container spacing={1}>
          {sucursales.map((s) => (
            <Grid
              item
              xs={12}
              key={s.id}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderBottom: "1px solid #ddd",
                py: 1,
              }}
            >
              <Box>
                <Typography variant="subtitle1">{s.nombre}</Typography>
                <Typography variant="body2">{s.direccion}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {s.telefono}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Paper>
    </Box>
  );
}
