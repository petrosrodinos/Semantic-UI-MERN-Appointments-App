import axios from "axios";

const fetchAppointments = async (type, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(
    `${process.env.REACT_APP_API_URL}appointment?type=${type}`,
    config
  );

  return response.data.message;
};

const createAppointment = async (appointment, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(
    `${process.env.REACT_APP_API_URL}appointment`,
    appointment,
    config
  );
  return response.data.message;
};

const appointmentService = {
  fetchAppointments,
  createAppointment,
};

export default appointmentService;
