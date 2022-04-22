import React, { useState, useEffect } from "react";
import { Button, Table, Message, Loader, Popup } from "semantic-ui-react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAppointments,
  reset,
  changeAppointmentStatus,
} from "../features/appointments/appointmentSlice";

const UserAppointments = () => {
  const [state, setState] = useState([]);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const { isLoading, isError, message, isSuccess } = useSelector(
    (state) => state.appointments
  );

  const Actions = ({ id, show }) => {
    if (show) {
      return (
        <Button.Group fluid basic size="large">
          <Popup
            content="Edit"
            trigger={<Button basic color="yellow" icon="edit" />}
          />
          <Popup
            content="Cancel"
            trigger={
              <Button
                onClick={() =>
                  dispatch(
                    changeAppointmentStatus({
                      id,
                      status: "cancelled",
                      role: "user",
                    })
                  )
                }
                basic
                color="red"
                icon="cancel"
              />
            }
          />
        </Button.Group>
      );
    }
  };

  useEffect(() => {
    dispatch(fetchAppointments("user"));
  }, []);

  useEffect(() => {
    if (isError) {
      setError(message);
    }
    if (isSuccess) {
      if (!Array.isArray(message)) {
        const temp = state;
        let index = temp.findIndex(
          (appointment) => appointment._id === message._id
        );
        let filtered = temp.filter(
          (appointment) => appointment._id !== message._id
        );
        filtered.splice(index, 0, message);
        setState(filtered);
        return;
      }
      setState(message);
    }

    return () => {
      dispatch(reset());
    };
  }, [isError, isSuccess, message, dispatch]);

  return (
    <>
      {!state ||
        (state.length === 0 && !error && (
          <Message negative>
            <Message.Header>Hmmm</Message.Header>
            <p>You have not made any appointments yet</p>
          </Message>
        ))}
      {isLoading && !error && <Loader size="big" />}
      {!isLoading && state.length > 0 && (
        <Table celled stackable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Phone</Table.HeaderCell>
              <Table.HeaderCell>Date</Table.HeaderCell>
              <Table.HeaderCell>Time</Table.HeaderCell>
              <Table.HeaderCell>Created</Table.HeaderCell>
              <Table.HeaderCell>Actions</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {state.map((s) => (
              <Table.Row
                positive={s.status === "completed"}
                error={s.status === "cancelled"}
                key={s._id}
              >
                <Table.Cell>{s.businessId.name}</Table.Cell>
                <Table.Cell>{s.businessId.phone}</Table.Cell>
                <Table.Cell>{s.date}</Table.Cell>
                <Table.Cell>{s.time}</Table.Cell>
                <Table.Cell>{s.created}</Table.Cell>
                <Table.Cell>
                  <Actions show={s.status === "created"} id={s._id} />
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      )}
      {error && (
        <Message negative>
          <Message.Header>Error</Message.Header>
          <p>{error}</p>
        </Message>
      )}
    </>
  );
};

export default UserAppointments;
