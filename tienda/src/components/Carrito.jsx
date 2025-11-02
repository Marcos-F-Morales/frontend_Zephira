import React from "react";
import {
  Box,
  Typography,
  Button,
  IconButton,
  TextField,
  Card,
  CardMedia,
  CardContent,
  Divider,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";

export default function Carrito({ cart, updateQuantity, removeFromCart, clearCart }) {
  const navigate = useNavigate();
  const total = cart.reduce((acc, item) => acc + item.precio * item.quantity, 0);

  return (
    <Box sx={{ p: 4, backgroundColor: "#F5E1D9", minHeight: "100vh" }}>
      <Typography variant="h4" gutterBottom sx={{ color: "#8b3e5e", fontWeight: 700 }}>
        🛒 Tu carrito
      </Typography>

      {cart.length === 0 ? (
        <Typography variant="h6" sx={{ color: "#333" }}>
          Tu carrito está vacío.
        </Typography>
      ) : (
        <>
          {cart.map((item) => (
            <Card
              key={`${item.id}-${item.talla}-${item.color}`}
              sx={{
                display: "flex",
                alignItems: "center",
                mb: 2,
                borderRadius: 3,
                boxShadow: 3,
                p: 2,
                backgroundColor: "#fff",
              }}
            >
              <CardMedia
                component="img"
                image={item.imagenUrl}
                alt={item.nombre}
                sx={{
                  width: 100,
                  height: 100,
                  objectFit: "cover",
                  borderRadius: 2,
                  mr: 2,
                }}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" sx={{ color: "#8b3e5e", fontWeight: 600 }}>
                  {item.nombre}
                </Typography>
                <Typography sx={{ color: "#555" }}>
                  Color: {item.color} | Talla: {item.talla}
                </Typography>
                <Typography sx={{ fontWeight: 600, color: "#1a1a1a" }}>
                  Q{item.precio}
                </Typography>

                <Box sx={{ display: "flex", alignItems: "center", mt: 1, gap: 2 }}>
                  <TextField
                    type="number"
                    size="small"
                    value={item.quantity}
                    onChange={(e) =>
                      updateQuantity(
                        item.id,
                        item.talla,
                        item.color,
                        parseInt(e.target.value)
                      )
                    }
                    inputProps={{ min: 1 }}
                    sx={{ width: "80px" }}
                  />
                  <Typography sx={{ color: "#333" }}>
                    Subtotal: Q{(item.precio * item.quantity).toFixed(2)}
                  </Typography>
                </Box>
              </CardContent>

              <IconButton
                color="error"
                onClick={() => removeFromCart(item.id, item.talla, item.color)}
              >
                <DeleteIcon />
              </IconButton>
            </Card>
          ))}

          <Divider sx={{ my: 3 }} />

          <Typography variant="h5" align="right" sx={{ color: "#8b3e5e", fontWeight: 600 }}>
            Total: Q{total.toFixed(2)}
          </Typography>

          <Box sx={{ mt: 3, display: "flex", justifyContent: "space-between", gap: 2, flexWrap: "wrap" }}>
            <Button
              variant="outlined"
              sx={{
                color: "#8b3e5e",
                borderColor: "#8b3e5e",
                "&:hover": { backgroundColor: "#f2dede", borderColor: "#6b2d47" },
              }}
              onClick={clearCart}
            >
              Vaciar carrito
            </Button>

            <Button
              variant="contained"
              sx={{
                backgroundColor: "#8b3e5e",
                "&:hover": { backgroundColor: "#6b2d47" },
              }}
              onClick={() =>
                navigate("/pago", {
                  state: {
                    cartItems: cart,
                    total,
                  },
                })
              }
            >
              Ir a pagar 💳
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
}
