import React, { useEffect, useState } from "react";
import {
  Box, Button, TextField, Typography, Paper,
  Snackbar, Alert, Grid, MenuItem, IconButton
} from "@mui/material";
import { AddCircle, Delete } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function ProductoCrear() {
  const navigate = useNavigate();

  const [producto, setProducto] = useState({
    nombre: "",
    descripcion: "",
    precio: "",
    marca: "",
    estilo: "",
    imagenUrl: ""
  });

  const [inventarios, setInventarios] = useState([
    { colorId: "", tallaId: "", sucursalId: "", cantidad: "" }
  ]);

  const [colores, setColores] = useState([]);
  const [tallas, setTallas] = useState([]);
  const [sucursales, setSucursales] = useState([]);

  const [openSnack, setOpenSnack] = useState(false);
  const [mensajeSnack, setMensajeSnack] = useState("");
  const [tipoSnack, setTipoSnack] = useState("success");

  // 🔹 Cargar opciones de color, talla y sucursal
  useEffect(() => {
    const cargarOpciones = async () => {
      try {
        const [coloresRes, tallasRes, sucursalesRes] = await Promise.all([
          api.get("/colores"),
          api.get("/tallas"),
          api.get("/sucursales")
        ]);
        setColores(coloresRes.data);
        setTallas(tallasRes.data);
        setSucursales(sucursalesRes.data);
      } catch (error) {
        console.error("Error al cargar opciones:", error);
      }
    };
    cargarOpciones();
  }, []);

  const handleProductoChange = (e) => {
    const { name, value } = e.target;
    setProducto({ ...producto, [name]: value });
  };

  const handleInventarioChange = (index, e) => {
    const { name, value } = e.target;
    const nuevos = [...inventarios];
    nuevos[index][name] = value;
    setInventarios(nuevos);
  };

  const agregarInventario = () => {
    setInventarios([...inventarios, { colorId: "", tallaId: "", sucursalId: "", cantidad: "" }]);
  };

  const eliminarInventario = (index) => {
    const nuevos = inventarios.filter((_, i) => i !== index);
    setInventarios(nuevos);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!producto.nombre || !producto.precio) {
        throw new Error("El nombre y precio del producto son obligatorios");
      }

      await api.post("/productos/create", {
        ...producto,
        precio: parseFloat(producto.precio),
        inventarios: inventarios.map(inv => ({
          colorId: inv.colorId,
          tallaId: inv.tallaId,
          sucursalId: inv.sucursalId,
          cantidad: parseInt(inv.cantidad) || 0
        }))
      });

      setMensajeSnack("✅ Producto e inventarios creados correctamente");
      setTipoSnack("success");
      setOpenSnack(true);

      setTimeout(() => navigate("/"), 2000);

    } catch (error) {
      console.error("Error al crear producto:", error);
      setMensajeSnack(
        error.response?.data?.detalle ||
        error.response?.data?.message ||
        error.message ||
        "Error al crear producto"
      );
      setTipoSnack("error");
      setOpenSnack(true);
    }
  };

  return (
    <Box sx={{ maxWidth: 900, mx: "auto", mt: 4, backgroundColor: "#F5E1D9", minHeight: "100vh", pb: 4 }}>
      <Paper sx={{ p: 4, borderRadius: 3, boxShadow: 3 }}>
        <Typography
          variant="h5"
          gutterBottom
          textAlign="center"
          sx={{ color: "#8b3e5e", fontWeight: 700 }}
        >
          Crear Nuevo Producto
        </Typography>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Nombre"
                name="nombre"
                value={producto.nombre}
                onChange={handleProductoChange}
                fullWidth
                required
                sx={{ "& label": { color: "#8b3e5e" } }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Descripción"
                name="descripcion"
                value={producto.descripcion}
                onChange={handleProductoChange}
                fullWidth
                multiline
                rows={3}
                sx={{ "& label": { color: "#8b3e5e" } }}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                label="Precio"
                name="precio"
                type="number"
                value={producto.precio}
                onChange={handleProductoChange}
                fullWidth
                required
                sx={{ "& label": { color: "#8b3e5e" } }}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                label="Marca"
                name="marca"
                value={producto.marca}
                onChange={handleProductoChange}
                fullWidth
                sx={{ "& label": { color: "#8b3e5e" } }}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                label="Estilo"
                name="estilo"
                value={producto.estilo}
                onChange={handleProductoChange}
                fullWidth
                sx={{ "& label": { color: "#8b3e5e" } }}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                label="URL de Imagen"
                name="imagenUrl"
                value={producto.imagenUrl}
                onChange={handleProductoChange}
                fullWidth
                sx={{ "& label": { color: "#8b3e5e" } }}
              />
            </Grid>
          </Grid>

          <Typography variant="h6" sx={{ mt: 4, mb: 2, color: "#8b3e5e" }}>
            Inventario del producto
          </Typography>

          {inventarios.map((inv, index) => (
            <Grid container spacing={2} key={index} sx={{ mb: 2, borderBottom: "1px solid #ddd", pb: 2 }}>
              <Grid item xs={3}>
                <TextField
                  select
                  label="Color"
                  name="colorId"
                  value={inv.colorId}
                  onChange={(e) => handleInventarioChange(index, e)}
                  fullWidth
                  sx={{ "& label": { color: "#8b3e5e" } }}
                >
                  {colores.map(color => (
                    <MenuItem key={color.id} value={color.id}>{color.nombre}</MenuItem>
                  ))}
                </TextField>
              </Grid>

              <Grid item xs={3}>
                <TextField
                  select
                  label="Talla"
                  name="tallaId"
                  value={inv.tallaId}
                  onChange={(e) => handleInventarioChange(index, e)}
                  fullWidth
                  sx={{ "& label": { color: "#8b3e5e" } }}
                >
                  {tallas.map(talla => (
                    <MenuItem key={talla.id} value={talla.id}>{talla.talla}</MenuItem>
                  ))}
                </TextField>
              </Grid>

              <Grid item xs={3}>
                <TextField
                  select
                  label="Sucursal"
                  name="sucursalId"
                  value={inv.sucursalId}
                  onChange={(e) => handleInventarioChange(index, e)}
                  fullWidth
                  sx={{ "& label": { color: "#8b3e5e" } }}
                >
                  {sucursales.map(s => (
                    <MenuItem key={s.id} value={s.id}>{s.nombre}</MenuItem>
                  ))}
                </TextField>
              </Grid>

              <Grid item xs={2}>
                <TextField
                  label="Cantidad"
                  name="cantidad"
                  type="number"
                  value={inv.cantidad}
                  onChange={(e) => handleInventarioChange(index, e)}
                  fullWidth
                  sx={{ "& label": { color: "#8b3e5e" } }}
                />
              </Grid>

              <Grid item xs={1} sx={{ display: "flex", alignItems: "center" }}>
                <IconButton color="error" onClick={() => eliminarInventario(index)}>
                  <Delete />
                </IconButton>
              </Grid>
            </Grid>
          ))}

          <Button
            startIcon={<AddCircle />}
            onClick={agregarInventario}
            variant="outlined"
            sx={{ mb: 3, borderColor: "#8b3e5e", color: "#8b3e5e", "&:hover": { borderColor: "#6b2d47", color: "#6b2d47" } }}
          >
            Agregar línea de inventario
          </Button>

          <Button
            variant="contained"
            type="submit"
            fullWidth
            sx={{ mb: 2, backgroundColor: "#8b3e5e", "&:hover": { backgroundColor: "#6b2d47" } }}
          >
            Guardar Producto
          </Button>

          <Button
            variant="outlined"
            fullWidth
            onClick={() => navigate("/")}
            sx={{ borderColor: "#8b3e5e", color: "#8b3e5e", "&:hover": { borderColor: "#6b2d47", color: "#6b2d47" } }}
          >
            ← Volver al catálogo
          </Button>
        </form>
      </Paper>

      <Snackbar open={openSnack} autoHideDuration={4000} onClose={() => setOpenSnack(false)}>
        <Alert severity={tipoSnack}>{mensajeSnack}</Alert>
      </Snackbar>
    </Box>
  );
}
