import React, { useEffect, useState } from "react"; 
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  Card,
  CardMedia,
  CardContent,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Snackbar,
  Alert,
  TextField,
} from "@mui/material";
import api from "../api/axios";

export default function ProductoDetalle({ addToCart }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [producto, setProducto] = useState(null);
  const [colorSeleccionado, setColorSeleccionado] = useState("");
  const [tallaSeleccionada, setTallaSeleccionada] = useState("");
  const [cantidad, setCantidad] = useState(1);
  const [stockDisponible, setStockDisponible] = useState(0);
  const [openSnack, setOpenSnack] = useState(false);
  const [mensajeSnack, setMensajeSnack] = useState("");
  const [tipoSnack, setTipoSnack] = useState("success");

  const cargarProducto = async () => {
    try {
      const res = await api.get(`/catalogo/${id}`);
      setProducto(res.data.data);
    } catch (error) {
      console.error("❌ Error al cargar producto:", error);
      alert("No se pudo obtener el producto.");
    }
  };

  useEffect(() => {
    cargarProducto();
  }, [id]);

  useEffect(() => {
    if (producto && producto.inventarios.length > 0) {
      const primerColor = producto.inventarios[0]?.color?.nombre ?? "";
      const primeraTalla = producto.inventarios[0]?.talla?.talla ?? "";
      setColorSeleccionado(primerColor);
      setTallaSeleccionada(primeraTalla);
    }
  }, [producto]);

  useEffect(() => {
    if (!producto || !colorSeleccionado || !tallaSeleccionada) return;

    const inv = producto.inventarios.find(
      (i) =>
        i.color?.nombre === colorSeleccionado &&
        i.talla?.talla === tallaSeleccionada
    );

    setStockDisponible(inv?.cantidad ?? 0);
  }, [colorSeleccionado, tallaSeleccionada, producto]);

  if (!producto) return <Typography>Cargando producto...</Typography>;

  const coloresDisponibles = [
    ...new Set(producto.inventarios.map((inv) => inv.color?.nombre).filter(Boolean))
  ];

  const tallasDisponibles = [
    ...new Set(producto.inventarios.map((inv) => inv.talla?.talla).filter(Boolean))
  ];

  const handleAgregarCarrito = () => {
    if (!colorSeleccionado || !tallaSeleccionada) {
      setMensajeSnack("Selecciona color y talla antes de continuar.");
      setTipoSnack("warning");
      setOpenSnack(true);
      return;
    }

    if (stockDisponible <= 0) {
      setMensajeSnack("Producto sin stock disponible.");
      setTipoSnack("error");
      setOpenSnack(true);
      return;
    }

    const inventario = producto.inventarios.find(
      (i) =>
        i.color?.nombre === colorSeleccionado &&
        i.talla?.talla === tallaSeleccionada
    );

    if (!inventario) {
      setMensajeSnack("Inventario no encontrado para esa combinación 😕");
      setTipoSnack("error");
      setOpenSnack(true);
      return;
    }

    const carritoIdStr = localStorage.getItem("carritoId");
    if (!carritoIdStr) {
      setMensajeSnack("No se encontró el carrito del usuario. Inicia sesión nuevamente.");
      setTipoSnack("error");
      setOpenSnack(true);
      return;
    }

    const carritoId = parseInt(carritoIdStr, 10);
    const item = {
      carritoId,
      inventarioId: inventario.id,
      cantidad: parseInt(cantidad, 10),
    };

    api.post("/carritodetalles/create", item)
      .then(() => {
        setMensajeSnack("Producto agregado al carrito 🛒");
        setTipoSnack("success");
        setOpenSnack(true);

        addToCart({
          id: producto.id,
          inventarioId: inventario.id,
          nombre: producto.nombre,
          precio: producto.precio,
          talla: tallaSeleccionada,
          color: colorSeleccionado,
          quantity: cantidad,
          imagenUrl: producto.imagenUrl || "/no-image.jpg",
        });
      })
      .catch((err) => {
        console.error("Error al agregar al carrito:", err.response?.data || err.message);
        setMensajeSnack("Error al agregar al carrito ❌");
        setTipoSnack("error");
        setOpenSnack(true);
      });
  };

  return (
    <Box sx={{ p: 4, backgroundColor: "#F5E1D9", minHeight: "100vh" }}>
      <Button
        variant="outlined"
        sx={{ mb: 3, color: "#8b3e5e", borderColor: "#8b3e5e", "&:hover": { borderColor: "#6b2d47" } }}
        onClick={() => navigate(-1)}
      >
        ← Volver
      </Button>

      <Card
        sx={{
          mt: 1,
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          borderRadius: 3,
          boxShadow: 3,
        }}
      >
        <CardMedia
          component="img"
          sx={{ width: { xs: "100%", md: 400 }, objectFit: "cover" }}
          image={producto.imagenUrl || "/no-image.jpg"}
          alt={producto.nombre}
        />

        <CardContent sx={{ flex: 1 }}>
          <Typography variant="h4" gutterBottom sx={{ color: "#8b3e5e", fontWeight: 700 }}>
            {producto.nombre}
          </Typography>
          <Typography variant="body1" color="#333" gutterBottom>
            {producto.descripcion}
          </Typography>
          <Typography variant="h6" sx={{ fontWeight: 600, color: "#1a1a1a" }}>
            Q{producto.precio}
          </Typography>

          <FormControl fullWidth sx={{ mt: 3 }}>
            <InputLabel sx={{ color: "#8b3e5e" }}>Color</InputLabel>
            <Select
              value={colorSeleccionado ?? ""}
              label="Color"
              onChange={(e) => setColorSeleccionado(e.target.value)}
            >
              {coloresDisponibles.map((color, i) => (
                <MenuItem key={i} value={color}>{color}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth sx={{ mt: 3 }}>
            <InputLabel sx={{ color: "#8b3e5e" }}>Talla</InputLabel>
            <Select
              value={tallaSeleccionada ?? ""}
              label="Talla"
              onChange={(e) => setTallaSeleccionada(e.target.value)}
            >
              {tallasDisponibles.map((talla, i) => (
                <MenuItem key={i} value={talla}>{talla}</MenuItem>
              ))}
            </Select>
          </FormControl>

          {colorSeleccionado && tallaSeleccionada && (
            <Typography sx={{ mt: 3, color: "#333" }}>
              Stock disponible: {stockDisponible !== null ? stockDisponible : "No disponible"}
            </Typography>
          )}

          <TextField
            label="Cantidad"
            type="number"
            value={cantidad}
            onChange={(e) => setCantidad(Math.max(1, parseInt(e.target.value)))}
            sx={{ mt: 3, width: "100px", "& label": { color: "#8b3e5e" } }}
            inputProps={{ min: 1 }}
          />

          <Box sx={{ mt: 3, display: "flex", gap: 2 }}>
            <Button
              variant="contained"
              fullWidth
              sx={{ backgroundColor: "#8b3e5e", "&:hover": { backgroundColor: "#6b2d47" } }}
              onClick={handleAgregarCarrito}
            >
              Agregar al carrito 🛒
            </Button>
          </Box>
        </CardContent>
      </Card>

      <Snackbar
        open={openSnack}
        autoHideDuration={4000}
        onClose={() => setOpenSnack(false)}
      >
        <Alert severity={tipoSnack}>{mensajeSnack}</Alert>
      </Snackbar>
    </Box>
  );
}
