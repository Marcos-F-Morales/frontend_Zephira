import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
  Grid,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function Catalogo() {
  const navigate = useNavigate();
  const [catalogo, setCatalogo] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  // 🔹 Cargar catálogo
  const cargarCatalogo = async () => {
    try {
      const res = await api.get("/catalogo");
      setCatalogo(res.data.data);
    } catch (error) {
      console.error("❌ Error al cargar catálogo:", error);
    }
  };

  useEffect(() => {
    cargarCatalogo();
  }, []);

  // 🔹 Eliminar producto (solo admin)
  const eliminarProducto = async (productoId) => {
    const confirmar = window.confirm("¿Seguro que deseas eliminar este producto?");
    if (!confirmar) return;

    try {
      await api.delete(`/productos/delete/${productoId}`);
      alert("✅ Producto eliminado correctamente");
      cargarCatalogo();
    } catch (error) {
      console.error("❌ Error al eliminar producto:", error);
      alert("Error al eliminar el producto");
    }
  };

  return (
    <Box sx={{ padding: 3, backgroundColor: "#F5E1D9", minHeight: "100vh" }}>
      <Typography
        variant="h4"
        textAlign="center"
        mb={3}
        sx={{ color: "#8b3e5e", fontWeight: 700 }}
      >
        Catálogo de Productos
      </Typography>

      {/* 🔹 Botones administrativos */}
      {user?.Rol === "admin" && (
        <Box sx={{ textAlign: "center", mb: 3 }}>
          <Button
            variant="contained"
            sx={{ m: 1, backgroundColor: "#8b3e5e", "&:hover": { backgroundColor: "#6b2d47" } }}
            onClick={() => navigate("/productos/create")}
          >
            Agregar nuevo producto
          </Button>
          <Button
            variant="contained"
            sx={{ m: 1, backgroundColor: "#8b3e5e", "&:hover": { backgroundColor: "#6b2d47" } }}
            onClick={() => navigate("/colores/create")}
          >
            Agregar nuevo color
          </Button>
          <Button
            variant="contained"
            sx={{ m: 1, backgroundColor: "#8b3e5e", "&:hover": { backgroundColor: "#6b2d47" } }}
            onClick={() => navigate("/tallas/create")}
          >
            Agregar nueva talla
          </Button>
          <Button
            variant="contained"
            sx={{ m: 1, backgroundColor: "#8b3e5e", "&:hover": { backgroundColor: "#6b2d47" } }}
            onClick={() => navigate("/sucursales/create")}
          >
            Agregar nueva sucursal
          </Button>
         
          <Button
            variant="contained"
            sx={{ m: 1, backgroundColor: "#8b3e5e", "&:hover": { backgroundColor: "#6b2d47" } }}
            onClick={() => navigate("/admin/envios")}
          >
            Gestionar Envíos
          </Button>
        </Box>
      )}

      <Grid container spacing={3}>
        {catalogo.map((producto) => (
          <Grid item xs={12} sm={6} md={4} key={producto.id}>
            <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
              <CardMedia
                component="img"
                height="220"
                image={producto.imagenUrl || "/no-image.jpg"}
                alt={producto.nombre}
              />
              <CardContent>
                <Typography variant="h6" sx={{ color: "#8b3e5e", fontWeight: 600 }}>
                  {producto.nombre}
                </Typography>
                <Typography sx={{ color: "#333" }}>
                  {producto.marca} - {producto.modelo}
                </Typography>
                <Typography sx={{ mt: 1, fontWeight: 600, color: "#1a1a1a" }}>
                  Q{producto.precio}
                </Typography>

                {/* 🔹 Botones de acción */}
                {user?.Rol === "admin" ? (
                  <Box sx={{ display: "flex", gap: 1, mt: 2 }}>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => eliminarProducto(producto.id)}
                    >
                      Eliminar
                    </Button>
                  </Box>
                ) : (
                  <Button
                    variant="contained"
                    sx={{ mt: 2, backgroundColor: "#8b3e5e", "&:hover": { backgroundColor: "#6b2d47" } }}
                    fullWidth
                    onClick={() => navigate(`/producto/${producto.id}`)}
                  >
                    Ver Detalles
                  </Button>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
