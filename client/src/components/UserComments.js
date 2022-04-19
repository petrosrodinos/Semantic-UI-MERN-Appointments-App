import React, { useState, useEffect } from "react";
import {
  Button,
  Icon,
  Table,
  Rating,
  Message,
  Loader,
} from "semantic-ui-react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUserComments,
  deleteComment,
  reset,
} from "../features/businesses/comments/commentSlice.js";

const UserComments = () => {
  const dispatch = useDispatch();
  const [comments, setComments] = useState([]);
  const [error, setError] = useState(null);
  const { user } = useSelector((state) => state.auth);
  const { isLoading, isError, message, isSuccess } = useSelector(
    (state) => state.comments
  );

  useEffect(() => {
    dispatch(fetchUserComments(user.userId));
  }, []);

  useEffect(() => {
    if (isError) {
      setError(message);
    }

    if (isSuccess) {
      if (Array.isArray(message)) {
        setComments(message);
      } else {
        setComments((prev) => prev.filter((c) => c._id !== message));
      }
    }

    return () => {
      dispatch(reset());
    };
  }, [isError, isSuccess, message, dispatch]);

  const deleteHandler = (id) => {
    dispatch(deleteComment(id));
  };

  return (
    <>
      {!comments ||
        (comments.length === 0 && !error && (
          <Message negative>
            <Message.Header>Hmmm</Message.Header>
            <p>You have not made any comments yet</p>
          </Message>
        ))}
      {error && (
        <Message negative>
          <Message.Header>Error</Message.Header>
          <p>{error}</p>
        </Message>
      )}
      {isLoading && !error && <Loader size="big" />}
      {!isLoading && !error && comments.length > 0 && (
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Comment</Table.HeaderCell>
              <Table.HeaderCell>Rating</Table.HeaderCell>
              <Table.HeaderCell>Date</Table.HeaderCell>
              <Table.HeaderCell>Actions</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {comments &&
              comments.length > 0 &&
              comments.map((c) => (
                <Table.Row key={c._id}>
                  <Table.Cell>{c.businessId.name}</Table.Cell>
                  <Table.Cell>{c.comment}</Table.Cell>
                  <Table.Cell>
                    <Rating
                      icon="star"
                      defaultRating={c.rating}
                      maxRating={5}
                    />
                  </Table.Cell>
                  <Table.Cell>{c.created}</Table.Cell>
                  <Table.Cell>
                    <Button
                      onClick={() => deleteHandler(c._id)}
                      basic
                      color="red"
                      fluid
                      icon
                    >
                      <Icon name="delete" />
                    </Button>
                  </Table.Cell>
                </Table.Row>
              ))}
          </Table.Body>
        </Table>
      )}
    </>
  );
};

export default UserComments;
