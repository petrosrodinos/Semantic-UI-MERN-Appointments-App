import axios from "axios";

const createBusiness = async (userData) => {
  console.log(userData);

  const { data } = await axios.post(
    `${process.env.REACT_APP_API_URL}business`,
    userData,
    { headers: { "Content-Type": "application/json" } }
  );

  return data.comment;
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

const businessService = {
  createBusiness,
  fetchBusinesses,
  fetchBusiness,
};

export default businessService;
