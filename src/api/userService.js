// userService es donde simularemos hacer la llamada a la API y para esto usamos axios
// necesitamos pasarle un endpoint para que traiga los datos de la API.

import axiosInstance from "./axios";

// 🟢 Registrar nuevo usuario
const registerUserService = async (data) => {
  const response = await axiosInstance.post("/api/auth/register", data);
  return response;
};

// 🟡 Autenticación de usuario
const loginUserService = async (data) => {
  const response = await axiosInstance.post("/api/auth/login", data);
  return response;
};

// 🔵 Obtener información del usuario autenticado
const getMeUserService = async () => {
  const { data } = await axiosInstance.get("/api/auth/me");
  return data;
};

export { registerUserService, loginUserService, getMeUserService };
