import React, { useState } from "react";
import { Box, Typography, TextField, Button, Paper, Snackbar, Alert } from "@mui/material";

export default function Contacto() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [openSnack, setOpenSnack] = useState(false);
  const [tipoSnack, setTipoSnack] = useState("success");
  const [mensajeSnack, setMensajeSnack] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí podrías enviar a backend o email
    setMensajeSnack("✅ Mensaje enviado correctamente");
    setTipoSnack("success");
    setOpenSnack(true);
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <Box sx={{ backgroundColor: "#F5E1D9", minHeight: "100vh", py: 6, px: 2 }}>
      <Paper sx={{ maxWidth: 600, mx: "auto", p: 4, borderRadius: 3, boxShadow: 3 }}>
        <Typography variant="h4" sx={{ mb: 2, color: "#8b3e5e", fontWeight: 700 }} textAlign="center">
          Contacto
        </Typography>
        <Typography sx={{ mb: 3, color: "#333", textAlign: "center" }}>
          Si tienes alguna pregunta o necesitas más información, no dudes en contactarnos.
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            label="Nombre"
            name="name"
            value={form.name}
            onChange={handleChange}
            fullWidth
            sx={{ mb: 2, "& label": { color: "#8b3e5e" } }}
            required
          />
          <TextField
            label="Correo Electrónico"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            fullWidth
            sx={{ mb: 2, "& label": { color: "#8b3e5e" } }}
            required
          />
          <TextField
            label="Mensaje"
            name="message"
            value={form.message}
            onChange={handleChange}
            fullWidth
            multiline
            rows={4}
            sx={{ mb: 2, "& label": { color: "#8b3e5e" } }}
            required
          />

          <Button
            variant="contained"
            type="submit"
            fullWidth
            sx={{ backgroundColor: "#8b3e5e", "&:hover": { backgroundColor: "#6b2d47" }, mt: 1 }}
          >
            Enviar
          </Button>
        </form>
      </Paper>

      <Snackbar open={openSnack} autoHideDuration={4000} onClose={() => setOpenSnack(false)}>
        <Alert severity={tipoSnack}>{mensajeSnack}</Alert>
      </Snackbar>
    </Box>
  );
}
