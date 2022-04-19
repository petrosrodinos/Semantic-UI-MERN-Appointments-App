import React, { useState, useEffect } from "react";
import {
  Button,
  Comment,
  Form,
  Header,
  Rating,
  Message,
} from "semantic-ui-react";
import { useSelector, useDispatch } from "react-redux";
import {
  createComment,
  fetchComments,
  reset,
} from "../features/businesses/comments/commentSlice.js";
import { useNavigate } from "react-router-dom";

const Comments = ({ id }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [comment, setComment] = useState({ ucomment: "", rating: 5 });
  const [comments, setComments] = useState([]);
  const { isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.comments
  );
  const { user } = useSelector((state) => state.auth);

  const handleSubmit = () => {
    const { ucomment, rating } = comment;
    if (!ucomment || !rating) return;
    if (!user) navigate("/auth/login");
    dispatch(createComment({ ...comment, businessId: id }));
  };

  useEffect(() => {
    dispatch(fetchComments(id));
  }, []);

  useEffect(() => {
    if (isError) {
      console.log(message);
      setError(message);
    }

    if (isSuccess) {
      if (Array.isArray(message)) {
        setComments(message);
      } else if (typeof message === "object" && !Array.isArray(message)) {
        setComments([...comments, message]);
      }
      setComment({ ucomment: "", rating: 5 });
    }

    return () => {
      dispatch(reset());
    };
  }, [isError, isSuccess, message, dispatch]);

  return (
    <Comment.Group>
      <Header as="h3" dividing>
        Client's Feedback
      </Header>
      {!comments ||
        (comments.length <= 0 && (
          <Message positive>
            <Message.Header>There are no comments yet</Message.Header>
            <p>Maybe create one</p>
          </Message>
        ))}
      {comments &&
        comments.length > 0 &&
        comments.map((c) => (
          <Comment>
            <Comment.Avatar src="https://react.semantic-ui.com/images/avatar/small/matt.jpg" />
            <Comment.Content>
              <Comment.Author as="a">{c.clientId.name}</Comment.Author>
              <Rating
                disabled
                icon="star"
                defaultRating={c.rating}
                maxRating={5}
              />
              <Comment.Metadata>
                <div>{c.created}</div>
              </Comment.Metadata>
              <Comment.Text>{c.comment}</Comment.Text>
              <Comment.Actions>
                <Comment.Action>Reply</Comment.Action>
              </Comment.Actions>
            </Comment.Content>
          </Comment>
        ))}

      <Form reply>
        <Form.TextArea
          value={comment.ucomment}
          onChange={(e, { value }) =>
            setComment({ ...comment, ucomment: value })
          }
          placeholder="Tell us your opinion"
        />
        {error && (
          <Message negative>
            <Message.Header>An Error Occured</Message.Header>
            <p>{error}</p>
          </Message>
        )}
        <Button
          loading={isLoading}
          onClick={handleSubmit}
          content="Add Comment"
          labelPosition="left"
          icon="edit"
          color="teal"
        />
        <Rating
          onRate={(e, { rating, maxRating }) =>
            setComment({ ...comment, rating })
          }
          icon="star"
          defaultRating={comment.rating}
          maxRating={5}
        />
      </Form>
    </Comment.Group>
  );
};

export default Comments;
