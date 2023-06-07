import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuthStatus = async () => {
      const token = localStorage.getItem("token");

      if (token) {
        setAuthenticated(true);
        // Atualize outras informações do usuário, se necessário
        // setCurrentUser(user);
      } else {
        setAuthenticated(false);
        setCurrentUser(null);
      }

      setLoading(false);
    };

    checkAuthStatus();
  }, []);

  const login = async (username, password) => {
    try {
      const response = await axios.post("http://127.0.0.1:8080/api/token/", {
        username,
        password,
      });

      const { status, data } = response;

      if (status === 200) {
        const token = data.access;

        // Armazena o token no local storage
        localStorage.setItem("token", token);

        // Define o cabeçalho personalizado no Axios
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

        setAuthenticated(true);
        // Atualize outras informações do usuário, se necessário
        // setCurrentUser(user);

        // Redireciona para a página após o login bem-sucedido
        // navigate("/");
      } else {
        // Ocorreu um erro durante o login
      }
    } catch (error) {
      // Ocorreu um erro durante o login
    }
  };

  const logout = () => {
    // Remova o token do local storage
    localStorage.removeItem("token");

    // Limpe o cabeçalho personalizado no Axios
    delete axios.defaults.headers.common["Authorization"];

    setAuthenticated(false);
    setCurrentUser(null);

    // Redirecione para a página de login ou página inicial
    //navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{ currentUser, authenticated, loading, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
