import axios from "axios";

const register = async (userData) => {
  const { data } = await axios.post(
    `${process.env.REACT_APP_API_URL}users/register`,
    userData,
    { headers: { "Content-Type": "application/json" } }
  );

  if (data) {
    localStorage.setItem("user", JSON.stringify(data));
  }

  return data;
};

const login = async (userData) => {
  const { data } = await axios.post(
    `${process.env.REACT_APP_API_URL}users/login`,
    userData,
    { headers: { "Content-Type": "application/json" } }
  );

  if (data) {
    localStorage.setItem("user", JSON.stringify(data));
  }

  return data;
};

const logout = () => {
  localStorage.removeItem("user");
};

const authService = {
  register,
  logout,
  login,
};

export default authService;
