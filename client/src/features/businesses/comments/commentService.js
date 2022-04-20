import axios from "axios";

const createComment = async (userData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const { data } = await axios.post(
    `${process.env.REACT_APP_API_URL}business/comments`,
    userData,
    config
  );
  return data.comment;
};

const fetchBusinessComments = async (id) => {
  const { data } = await axios.get(
    `${process.env.REACT_APP_API_URL}business/comments/${id}`
  );

  return data.comments;
};

const fetchUserComments = async (id) => {
  const { data } = await axios.get(
    `${process.env.REACT_APP_API_URL}user/comments/${id}`
  );
  return data.comments;
};

const deleteComment = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const { data } = await axios.delete(
    `${process.env.REACT_APP_API_URL}user/comments/${id}`,
    config
  );

  return data.id;
};

const replyComment = async (reply, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const { data } = await axios.patch(
    `${process.env.REACT_APP_API_URL}business/comments/${reply.id}`,
    { reply: reply.reply },
    config
  );
  return data.message;
};

const commentService = {
  createComment,
  fetchBusinessComments,
  fetchUserComments,
  deleteComment,
  replyComment,
};

export default commentService;
