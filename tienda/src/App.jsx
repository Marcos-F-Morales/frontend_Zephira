// src/App.jsx
import React, { useState, useEffect } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import Catalogo from "./components/Catalogo";
import ProductoDetalle from "./components/ProductoDetalle";
import Nosotros from "./components/Nosotros";
import Contacto from "./components/Contacto";
import Carrito from "./components/Carrito";
import RegistroCliente from "./components/RegistroCliente";
import Pago from "./components/Pago";
import Login from "./components/Login";
import ProductoCrear from "./components/ProductoCrear";
import SucursalCrear from "./components/CrearSucursal";
import ColorCrear from "./components/CrearColor";
import TallaCrear from "./components/CrearTalla";
import Facturas from "./components/Factura";
import EnviosUsuario from "./components/EnvioUsuario";
import EnviosAdmin from "./components/AdminEnvios";
import logo from "./assets/logo.png";
import "./App.css";
import { useAuth } from "./context/AuthContext";
import { Button } from "@mui/material";

function Home({ addToCart }) {
  return (
    <main className="main-content">
      <h2 className="titulo-bienvenida">Bienvenida a Tienda Zephira</h2>
      <p className="texto-bienvenida">
        Tu tienda en línea de ropa para dama. Explora nuestro catálogo y encuentra
        el estilo perfecto para ti.
      </p>
      <Catalogo addToCart={addToCart} />
    </main>
  );
}

function App() {
  const { user: authUser, logout } = useAuth();
  const navigate = useNavigate();

  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : authUser || null;
  });

  useEffect(() => {
    if (authUser) setUser(authUser);
  }, [authUser]);

  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    const exist = cart.find(
      (item) =>
        item.id === product.id &&
        item.talla === product.talla &&
        item.color === product.color
    );

    if (exist) {
      setCart(
        cart.map((item) =>
          item.id === product.id &&
          item.talla === product.talla &&
          item.color === product.color
            ? { ...item, quantity: item.quantity + product.quantity }
            : item
        )
      );
    } else {
      setCart([...cart, product]);
    }
  };

  const updateQuantity = (id, talla, color, quantity) => {
    setCart(
      cart.map((item) =>
        item.id === id && item.talla === talla && item.color === color
          ? { ...item, quantity: Math.max(quantity, 1) }
          : item
      )
    );
  };

  const removeFromCart = (id, talla, color) => {
    setCart(
      cart.filter(
        (item) =>
          !(item.id === id && item.talla === talla && item.color === color)
      )
    );
  };

  const clearCart = () => setCart([]);

  return (
    <div className="App">
      <header className="header">
        <Link to="/" className="logo-link">
          <img src={logo} alt="Logo Zephira" className="logo-image" />
        </Link>

        <nav className="nav-links">
          <Link className="nav-link" to="/">Catálogo</Link>
          <Link className="nav-link" to="/about">Nosotros</Link>
          <Link className="nav-link" to="/contact">Contacto</Link>
          <Link className="nav-link" to="/cart">
            Carrito ({cart.reduce((acc, item) => acc + item.quantity, 0)})
          </Link>

          {user && (
            <>
              <Link className="nav-link" to="/facturas">Mis Facturas</Link>
              <Link className="nav-link" to="/envios">Mis Envíos</Link>
            </>
          )}

          {user && user.rol === "admin" && (
            <Link className="nav-link" to="/admin/envios">Gestión de Envíos</Link>
          )}

          {!user ? (
            <Link className="btn-login-nav" to="/login">Login</Link>
          ) : (
            <Button
              variant="contained"
              sx={{
                ml: 2,
                backgroundColor: "#8b3e5e",
                color: "#fff",
                fontWeight: 600,
                padding: "0.5rem 1.2rem",
                "&:hover": { backgroundColor: "#6b2d47" },
              }}
              onClick={() => {
                logout();
                localStorage.removeItem("user");
                setUser(null);
                navigate("/login");
              }}
            >
              Logout
            </Button>
          )}
        </nav>
      </header>

      <Routes>
        <Route path="/" element={<Home addToCart={addToCart} />} />
        <Route path="/about" element={<Nosotros />} />
        <Route path="/contact" element={<Contacto />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<RegistroCliente />} />
        <Route path="/productos/create" element={<ProductoCrear />} />
        <Route path="/sucursales/create" element={<SucursalCrear />} />
        <Route path="/colores/create" element={<ColorCrear />} />
        <Route path="/tallas/create" element={<TallaCrear />} />
        <Route path="/admin/envios" element={<EnviosAdmin />} />
        <Route path="/facturas" element={<Facturas />} />
        <Route path="/envios" element={<EnviosUsuario />} />
        <Route path="/producto/:id" element={<ProductoDetalle addToCart={addToCart} />} />
        <Route
          path="/cart"
          element={
            <Carrito
              cart={cart}
              updateQuantity={updateQuantity}
              removeFromCart={removeFromCart}
              clearCart={clearCart}
            />
          }
        />
        <Route
          path="/pago"
          element={
            <Pago
              total={cart.reduce((acc, item) => acc + item.precio * item.quantity, 0)}
              clearCart={clearCart}
            />
          }
        />
      </Routes>

      <footer className="footer">
        <p>&copy; 2025 Tienda Zephira. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}

export default App;
