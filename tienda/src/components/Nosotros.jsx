import React from "react";
import { Box, Typography, Paper, List, ListItem } from "@mui/material";

export default function SobreNosotros() {
  return (
    <Box sx={{ backgroundColor: "#F5E1D9", minHeight: "100vh", py: 6, px: 2 }}>
      <Paper sx={{ maxWidth: 800, mx: "auto", p: 4, borderRadius: 3, boxShadow: 3 }}>
        <Typography variant="h4" sx={{ color: "#8b3e5e", mb: 2, fontWeight: 700 }} textAlign="center">
          Sobre Nosotras
        </Typography>

        <Typography sx={{ mb: 2, color: "#333", lineHeight: 1.6 }}>
          En <strong>Tienda Zephira</strong> nos apasiona ofrecer calzado elegante y cómodo para damas.
          Desde nuestros inicios, hemos buscado proporcionar zapatos de alta calidad
          que reflejen el estilo y la sofisticación de cada mujer en cada paso.
        </Typography>

        <Typography sx={{ mb: 2, color: "#333", lineHeight: 1.6 }}>
          Nuestra misión es brindarte una experiencia de compra excepcional,
          con modelos que se adapten a tu estilo personal, tu feminidad
          y tus necesidades, ya sea para ocasiones especiales o para el día a día.
        </Typography>

        <Typography variant="h5" sx={{ color: "#8b3e5e", mb: 2, fontWeight: 600 }}>
          Nuestros Valores
        </Typography>

        <List>
          {["Calidad en cada producto", "Atención personalizada", "Compromiso con nuestras clientas"].map((valor, index) => (
            <ListItem
              key={index}
              sx={{
                backgroundColor: "#f4f4f4",
                borderRadius: 2,
                py: 1,
                px: 2,
                mb: 1,
                color: "#333",
                justifyContent: "center",
              }}
            >
              {valor}
            </ListItem>
          ))}
        </List>
      </Paper>
    </Box>
  );
}
