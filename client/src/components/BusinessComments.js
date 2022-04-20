import React, { useState, useEffect, useRef } from "react";
import {
  Button,
  Icon,
  Table,
  Rating,
  Message,
  Loader,
  TextArea,
  Form,
  Confirm,
} from "semantic-ui-react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchBusinessComments,
  replyComment,
  reset,
} from "../features/businesses/comments/commentSlice.js";

const BusinessComments = () => {
  const dispatch = useDispatch();
  const [comments, setComments] = useState([]);
  const [open, setOpen] = useState(false);
  const [reply, setReply] = useState({ id: "", reply: "" });
  const [error, setError] = useState(null);
  const { user } = useSelector((state) => state.auth);
  const { isLoading, isError, message, isSuccess } = useSelector(
    (state) => state.comments
  );

  useEffect(() => {
    dispatch(fetchBusinessComments(user.businessId));
  }, []);

  useEffect(() => {
    if (isError) {
      setError(message);
    }

    if (isSuccess) {
      if (Array.isArray(message)) {
        setComments(message);
      } else {
        let comment = comments.find((c) => c._id === reply.id);
        let filtered = comments.filter((c) => c._id !== reply.id);
        comment = { ...comment, reply: reply.reply };
        setComments((prev) => [comment, ...filtered]);
        setOpen(false);
      }
    }

    return () => {
      dispatch(reset());
    };
  }, [isError, isSuccess, message, dispatch]);

  //   const deleteHandler = (id) => {
  //     dispatch(deleteComment(id));
  //   };

  const handleReply = (id) => {
    const comment = comments.find((c) => c._id === id);
    setReply({ id: id, reply: comment.reply });
    setOpen(true);
  };

  const ReplyModal = () => {
    return (
      <Confirm
        open={open}
        content={() => {
          return (
            <Form style={{ padding: 10 }}>
              <TextArea
                onChange={(e) => {
                  setReply({ ...reply, reply: e.target.value });
                }}
                style={{ resize: "none", padding: 10 }}
                value={reply.reply}
                placeholder="Reply..."
              />
            </Form>
          );
        }}
        header="Reply"
        onCancel={() => setOpen(false)}
        confirmButton={() => (
          <Button
            onClick={() => {
              dispatch(replyComment(reply));
            }}
            loading={isLoading}
            color="teal"
          >
            Reply
          </Button>
        )}
      />
    );
  };

  return (
    <>
      {!comments ||
        (comments.length === 0 && !error && (
          <Message negative>
            <Message.Header>Hmmm</Message.Header>
            <p>You dont have any comments yet</p>
          </Message>
        ))}
      {error && (
        <Message negative>
          <Message.Header>Error</Message.Header>
          <p>{error}</p>
        </Message>
      )}
      {isLoading && !error && <Loader size="big" />}
      {ReplyModal()}
      {!isLoading && !error && comments.length > 0 && (
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Comment</Table.HeaderCell>
              <Table.HeaderCell>Rating</Table.HeaderCell>
              <Table.HeaderCell>Date</Table.HeaderCell>
              <Table.HeaderCell>Reply</Table.HeaderCell>
              <Table.HeaderCell>Actions</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {comments &&
              comments.length > 0 &&
              comments.map((c) => (
                <Table.Row key={c._id}>
                  <Table.Cell>{c.clientId.name}</Table.Cell>
                  <Table.Cell>{c.comment}</Table.Cell>
                  <Table.Cell>
                    <Rating
                      icon="star"
                      defaultRating={c.rating}
                      maxRating={5}
                    />
                  </Table.Cell>
                  <Table.Cell>{c.created}</Table.Cell>
                  <Table.Cell>{c.reply}</Table.Cell>
                  <Table.Cell>
                    <Button onClick={() => {}} basic color="red" fluid icon>
                      <Icon name="delete" />
                    </Button>
                    <br />
                    <Button
                      onClick={() => handleReply(c._id)}
                      basic
                      color="green"
                      fluid
                      icon
                    >
                      <Icon name="reply" />
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

export default BusinessComments;
