import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Select,
  MenuItem,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper
} from "@mui/material";
import api from "../api/axios";

export default function AdminEnvios() {
  const [envios, setEnvios] = useState([]);

  // 🔹 Cargar los envíos al montar el componente
  useEffect(() => {
    api
      .get("/Envios") // Ajusta según tu ruta real
      .then((res) => setEnvios(res.data))
      .catch((err) => console.error("❌ Error cargando envíos:", err));
  }, []);

  // 🔹 Cambiar estado del envío
  const actualizarEstado = async (envioId, nuevoEstadoId) => {
    try {
      let endpoint = "";

      if (nuevoEstadoId === 2) {
        endpoint = `/Envios/transito/${envioId}`;
      } else if (nuevoEstadoId === 3) {
        endpoint = `/Envios/entregado/${envioId}`;
      } else {
        console.warn("⚠️ Estado no válido:", nuevoEstadoId);
        return;
      }

      console.log("➡️ PUT", endpoint);

      const res = await api.put(endpoint);

      // ✅ Actualizamos el estado localmente
      setEnvios((prevEnvios) =>
        prevEnvios.map((e) =>
          e.id === envioId ? { ...e, estadoEnvioId: nuevoEstadoId } : e
        )
      );

      alert(`✅ ${res.data.mensaje || "Estado actualizado con éxito"}`);
    } catch (err) {
      console.error("❌ Error al actualizar envío:", err);
      alert("Error al actualizar el estado del envío.");
    }
  };

  return (
    <Box sx={{ p: 4, backgroundColor: "#F5E1D9", minHeight: "100vh" }}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{ color: "#8b3e5e", fontWeight: 700, mb: 4 }}
      >
        Gestión de Envíos
      </Typography>

      <Paper sx={{ overflowX: "auto", borderRadius: 2, boxShadow: 3 }}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#b86b7b" }}>
              <TableCell sx={{ color: "#fff", fontWeight: 600 }}>ID</TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: 600 }}>Factura</TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: 600 }}>Dirección</TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: 600 }}>Estado</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {envios.map((e) => (
              <TableRow
                key={e.id}
                sx={{
                  "&:hover": { backgroundColor: "rgba(139,62,94,0.1)" },
                  borderBottom: "1px solid #ccc"
                }}
              >
                <TableCell sx={{ color: "#1a1a1a" }}>{e.id}</TableCell>
                <TableCell sx={{ color: "#1a1a1a" }}>{e.facturaId}</TableCell>
                <TableCell sx={{ color: "#1a1a1a" }}>{e.direccionEnvio}</TableCell>
                <TableCell>
                  <Select
                    value={e.estadoEnvioId || ""}
                    onChange={(ev) => actualizarEstado(e.id, ev.target.value)}
                    displayEmpty
                    sx={{
                      backgroundColor: "#fff",
                      borderRadius: 1,
                      width: 150,
                      "& .MuiSelect-select": { color: "#1a1a1a" }
                    }}
                  >
                    <MenuItem value={1}>Pendiente</MenuItem>
                    <MenuItem value={2}>En tránsito</MenuItem>
                    <MenuItem value={3}>Entregado</MenuItem>
                  </Select>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
}
