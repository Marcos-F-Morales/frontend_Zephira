import "./Login.css";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

function Login() {
  const [email, setEmail] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/usuarios/login", { email, contrasena });
      if (res.status === 200 && res.data.usuario) {
        const loggedUser = res.data.usuario;
        localStorage.setItem("user", JSON.stringify(loggedUser));
        if (loggedUser.Rol === "cliente" && res.data.carrito) {
          localStorage.setItem("carritoId", res.data.carrito.id);
        }
        setUser(loggedUser);

        if (loggedUser.Rol === "admin") {
          alert("Bienvenido Administrador 🛠️");
          navigate("/admin/envios");
        } else {
          alert("Bienvenida a Zephira 🌸");
          navigate("/");
        }
      } else {
        alert("No se pudo obtener la información del usuario ❌");
      }
    } catch (err) {
      console.error("Error en login:", err);
      alert("Credenciales inválidas o servidor no disponible ❌");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("carritoId");
    setUser(null);
    alert("Sesión cerrada correctamente 👋");
    navigate("/login");
  };

  if (user) {
    return (
      <div className="login-container">
        <h2>Sesión activa</h2>
        <p>
          Has iniciado sesión como: <strong>{user.email}</strong> <br />
          Rol: <strong>{user.Rol}</strong>
        </p>
        <button className="btn-logout" onClick={handleLogout}>
          Cerrar sesión
        </button>
      </div>
    );
  }

  return (
    <div className="login-container">
      <div className="login-header">
        <h2>Iniciar sesión</h2>
        <p>Bienvenida a tu tienda de moda</p>
      </div>

      <form onSubmit={handleLogin} className="login-form">
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={contrasena}
          onChange={(e) => setContrasena(e.target.value)}
          required
        />
        <button type="submit" className="btn-login">
          Ingresar
        </button>
      </form>

      <button
        className="btn-register"
        onClick={() => navigate("/registro")}
      >
        Crear cuenta
      </button>
    </div>
  );
}

export default Login;
