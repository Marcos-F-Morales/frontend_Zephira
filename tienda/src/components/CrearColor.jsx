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

export default function Colores() {
  const [colores, setColores] = useState([]);
  const [nuevoColor, setNuevoColor] = useState("");

  const cargarColores = async () => {
    try {
      const res = await api.get("/colores");
      setColores(res.data);
    } catch (error) {
      console.error("Error al cargar colores:", error);
    }
  };

  useEffect(() => {
    cargarColores();
  }, []);

  const guardarColor = async () => {
    if (!nuevoColor) return;
    try {
      await api.post("/colores/create", { nombre: nuevoColor });
      alert("✅ Color agregado correctamente");
      setNuevoColor("");
      cargarColores();
    } catch (error) {
      console.error("Error al guardar color:", error);
    }
  };

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", mt: 5, backgroundColor: "#F5E1D9", minHeight: "100vh", pb: 4 }}>
      <Typography variant="h5" mb={3} sx={{ color: "#8b3e5e", fontWeight: 700 }}>
        Gestión de Colores
      </Typography>

      <Paper sx={{ p: 3, mb: 3, borderRadius: 3, boxShadow: 3 }}>
        <TextField
          label="Nombre del color"
          fullWidth
          value={nuevoColor}
          onChange={(e) => setNuevoColor(e.target.value)}
          sx={{ "& label": { color: "#8b3e5e" } }}
        />
        <Button
          variant="contained"
          fullWidth
          sx={{ mt: 2, backgroundColor: "#8b3e5e", "&:hover": { backgroundColor: "#6b2d47" } }}
          onClick={guardarColor}
        >
          Agregar
        </Button>
      </Paper>

      <Paper sx={{ p: 3, borderRadius: 3, boxShadow: 3 }}>
        <Typography variant="h6" mb={2} sx={{ color: "#8b3e5e" }}>
          Lista de Colores
        </Typography>
        <Grid container spacing={1}>
          {colores.map((c) => (
            <Grid
              item
              xs={12}
              key={c.id}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderBottom: "1px solid #ddd",
                py: 1,
              }}
            >
              <Typography>{c.nombre}</Typography>
            </Grid>
          ))}
        </Grid>
      </Paper>
    </Box>
  );
}
