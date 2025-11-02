import React, { useEffect, useState } from "react";
import api from "../api/axios";
import { Box, Typography, Paper, Divider, Grid } from "@mui/material";

export default function Facturas() {
  const [facturas, setFacturas] = useState([]);
  const [loading, setLoading] = useState(true);
  const usuario = JSON.parse(localStorage.getItem("user"));
  const IVA = 0.12; // 12%

  useEffect(() => {
    const fetchFacturas = async () => {
      try {
        const res = await api.get(`/facturas/usuario/${usuario.id}`);
        setFacturas(res.data);
      } catch (err) {
        console.error("Error al obtener facturas:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchFacturas();
  }, [usuario.id]);

  if (loading) return <p style={{ textAlign: "center" }}>Cargando facturas...</p>;

  if (!facturas.length)
    return <p style={{ textAlign: "center" }}>No tienes facturas registradas.</p>;

  return (
    <Box sx={{ maxWidth: 900, mx: "auto", mt: 5, px: 2 }}>
      <Typography variant="h4" gutterBottom textAlign="center" sx={{ mb: 4 }}>
        Mis Facturas
      </Typography>

      <Grid container spacing={3}>
        {facturas.map((f) => {
          const subtotal = f.detalles?.reduce(
            (acc, d) => acc + (d.precioUnitario || 0) * (d.cantidad || 0),
            0
          ) || 0;
          const iva = subtotal * IVA;
          const total = subtotal + iva;

          return (
            <Grid item xs={12} key={f.id}>
              <Paper sx={{ p: 3, borderRadius: 3, boxShadow: 3 }}>
                <Typography variant="h6" sx={{ color: "#8b3e5e" }}>
                  Factura #{f.id}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Fecha: {new Date(f.fecha).toLocaleString()}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Dirección de envío: {f.envio?.direccionEnvio || "No especificada"}
                </Typography>

                <Divider sx={{ my: 2 }} />

                <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                  Detalles:
                </Typography>

                {f.detalles?.map((d) => (
                  <Box
                    key={d.id}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      py: 0.5,
                      borderBottom: "1px solid #eee",
                    }}
                  >
                    <Typography>
                      {d.inventario?.producto?.nombre || "Producto desconocido"} × {d.cantidad}
                    </Typography>
                    <Typography>
                      Q{((d.precioUnitario || 0) * (d.cantidad || 0)).toFixed(2)}
                    </Typography>
                  </Box>
                ))}

                <Divider sx={{ my: 2 }} />

                <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                  <Typography>Subtotal:</Typography>
                  <Typography>Q{subtotal.toFixed(2)}</Typography>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                  <Typography>IVA:</Typography>
                  <Typography>Q{iva.toFixed(2)}</Typography>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "space-between", fontWeight: 600 }}>
                  <Typography>Total:</Typography>
                  <Typography>Q{total.toFixed(2)}</Typography>
                </Box>
              </Paper>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}
