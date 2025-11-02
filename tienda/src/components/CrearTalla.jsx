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

export default function Tallas() {
  const [tallas, setTallas] = useState([]);
  const [nuevaTalla, setNuevaTalla] = useState("");

  const cargarTallas = async () => {
    try {
      const res = await api.get("/tallas");
      setTallas(res.data);
    } catch (error) {
      console.error("Error al cargar tallas:", error);
    }
  };

  useEffect(() => {
    cargarTallas();
  }, []);

  const guardarTalla = async () => {
    if (!nuevaTalla) return;
    try {
      await api.post("/tallas/create", { talla: nuevaTalla });
      alert("✅ Talla agregada correctamente");
      setNuevaTalla("");
      cargarTallas();
    } catch (error) {
      console.error("Error al guardar talla:", error);
    }
  };

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", mt: 5, backgroundColor: "#F5E1D9", minHeight: "100vh", pb: 4 }}>
      <Typography variant="h5" mb={3} sx={{ color: "#8b3e5e", fontWeight: 700 }}>
        Gestión de Tallas
      </Typography>

      <Paper sx={{ p: 3, mb: 3, borderRadius: 3, boxShadow: 3 }}>
        <TextField
          label="Nombre o número de talla"
          fullWidth
          value={nuevaTalla}
          onChange={(e) => setNuevaTalla(e.target.value)}
          sx={{ "& label": { color: "#8b3e5e" } }}
        />
        <Button
          variant="contained"
          fullWidth
          sx={{ mt: 2, backgroundColor: "#8b3e5e", "&:hover": { backgroundColor: "#6b2d47" } }}
          onClick={guardarTalla}
        >
          Agregar
        </Button>
      </Paper>

      <Paper sx={{ p: 3, borderRadius: 3, boxShadow: 3 }}>
        <Typography variant="h6" mb={2} sx={{ color: "#8b3e5e" }}>
          Lista de Tallas
        </Typography>
        <Grid container spacing={1}>
          {tallas.map((t) => (
            <Grid
              item
              xs={12}
              key={t.id}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderBottom: "1px solid #ddd",
                py: 1,
              }}
            >
              <Typography>{t.talla}</Typography>
            </Grid>
          ))}
        </Grid>
      </Paper>
    </Box>
  );
}
