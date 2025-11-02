import React from "react";
import { Box, Typography, Paper, List, ListItem } from "@mui/material";

export default function SobreNosotros() {
  return (
    <Box sx={{ backgroundColor: "#F5E1D9", minHeight: "100vh", py: 6, px: 2 }}>
      <Paper sx={{ maxWidth: 800, mx: "auto", p: 4, borderRadius: 3, boxShadow: 3 }}>
        <Typography variant="h4" sx={{ color: "#8b3e5e", mb: 2, fontWeight: 700 }} textAlign="center">
          Sobre Nosotros
        </Typography>

        <Typography sx={{ mb: 2, color: "#333", lineHeight: 1.6 }}>
          En <strong>Tienda Zephira</strong>, nos apasiona vestir a la mujer moderna con estilo y comodidad. 
          Desde nuestros inicios, buscamos ofrecer prendas de alta calidad que reflejen elegancia, sofisticación y la 
          personalidad única de cada mujer.
        </Typography>

        <Typography sx={{ mb: 2, color: "#333", lineHeight: 1.6 }}>
          Nuestra misión es brindarte una experiencia de compra inigualable, con diseños que realzan 
          tu feminidad y se adaptan a cada ocasión, ya sea un evento especial o el día a día. Queremos que cada 
          prenda te haga sentir segura, bella y auténtica.
        </Typography>

        <Typography variant="h5" sx={{ color: "#8b3e5e", mb: 2, fontWeight: 600 }}>
          Nuestros Valores
        </Typography>

        <List>
          {[
            "Calidad y excelencia en cada prenda",
            "Atención personalizada y cercana",
            "Compromiso con tu estilo y bienestar"
          ].map((valor, index) => (
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
