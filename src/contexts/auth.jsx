import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const login = (username, password) => {
    // Simule o processo de login bem-sucedido
    // Por exemplo, pode ser verificado no servidor aqui
    // Em vez de chamar o endpoint usando axios, vamos simular o login
    if (username === "usuario" && password === "senha") {
      // Atualize outras informações do usuário, se necessário
      // setCurrentUser(user);

      // Redireciona para a página após o login bem-sucedido
      navigate("/home");
    } else {
      // Ocorreu um erro durante o login
    }
  };

  // Lógica para efetuar o logout do usuário
  const logout = async () => {
    // Implemente a lógica para limpar os dados de autenticação e deslogar o usuário
    // Exemplo: remover o token do armazenamento local ou da sessão
    setCurrentUser(null);
    navigate("/login");
  };


  return (
    <AuthContext.Provider
      value={{ currentUser, authenticated, loading, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
