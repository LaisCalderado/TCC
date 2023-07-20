import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080",
});

// Intercepta todas as solicitações antes de serem enviadas
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken"); // Obtém o token de acesso do armazenamento local (pode ser outro local seguro)

  if (token) {
    // Se o token estiver disponível, adiciona-o ao cabeçalho de autorização
    config.headers["Authorization"] = `Bearer ${token}`;
  }

  return config;
});

export default api;
