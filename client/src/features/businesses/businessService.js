import axios from "axios";

const createBusiness = async (userData) => {
  console.log(userData);

  const { data } = await axios.post(
    `${process.env.REACT_APP_API_URL}business`,
    userData,
    { headers: { "Content-Type": "application/json" } }
  );

  return data;
};

const fetchBusinesses = async () => {
  const { data } = await axios.get(`${process.env.REACT_APP_API_URL}business`);
  return data;
};

const fetchBusiness = async (id) => {
  const { data } = await axios.get(
    `${process.env.REACT_APP_API_URL}business/${id}`
  );
  return data.business;
};

const createComment = async (userData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const { data } = await axios.post(
    `${process.env.REACT_APP_API_URL}business/comment`,
    userData,
    config
  );

  return data;
};

const businessService = {
  createBusiness,
  fetchBusinesses,
  fetchBusiness,
  createComment,
};

export default businessService;
