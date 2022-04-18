import axios from "axios";

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

const fetchComments = async (id) => {
  const { data } = await axios.get(
    `${process.env.REACT_APP_API_URL}business/comment/${id}`
  );

  return data.comments;
};

const commentService = {
  createComment,
  fetchComments,
};

export default commentService;
