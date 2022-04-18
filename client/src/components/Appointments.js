import React, { useState, useEffect } from "react";
import {
  Button,
  Icon,
  Table,
  Dropdown,
  Message,
  Loader,
} from "semantic-ui-react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAppointments,
  reset,
} from "../features/appointments/appointmentSlice";

const Appointments = ({ profile, business }) => {
  const [state, setState] = useState([]);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const { isLoading, isError, message, isSuccess } = useSelector(
    (state) => state.appointments
  );
  const [options, setOptions] = useState([
    { key: "edit", icon: "edit", text: "Edit", value: "edit" },
    { key: "cancel", icon: "delete", text: "Cancel", value: "cancel" },
  ]);

  const Actions = () => (
    <Button.Group color="teal">
      <Button>Action</Button>
      <Dropdown
        className="button icon"
        floating
        options={options}
        trigger={<></>}
      />
    </Button.Group>
  );

  useEffect(() => {
    if (profile) {
      dispatch(fetchAppointments("profile"));
    }
    if (business) {
      setOptions([
        ...options,
        {
          key: "checkin",
          icon: "check",
          text: "Check In",
          value: "checkin",
        },
      ]);
      dispatch(fetchAppointments("business"));
    }
  }, []);

  useEffect(() => {
    if (isError) {
      setError(message);
    }

    if (isSuccess) {
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
      {error && (
        <Message negative>
          <Message.Header>Error</Message.Header>
          <p>{error}</p>
        </Message>
      )}
      {isLoading && !error && <Loader size="big" />}
      {!isLoading && !error && state.length > 0 && (
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Phone</Table.HeaderCell>
              <Table.HeaderCell>Date</Table.HeaderCell>
              <Table.HeaderCell>Time</Table.HeaderCell>
              <Table.HeaderCell>Actions</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {state &&
              state.map((s) => (
                <Table.Row key={s._id}>
                  {business ? (
                    <>
                      <Table.Cell>{s.clientId.name}</Table.Cell>
                      <Table.Cell>{s.clientId.phone}</Table.Cell>
                    </>
                  ) : (
                    <>
                      <Table.Cell>{s.businessId.name}</Table.Cell>
                      <Table.Cell>{s.businessId.phone}</Table.Cell>
                    </>
                  )}
                  <Table.Cell>{s.date}</Table.Cell>
                  <Table.Cell>{s.time}</Table.Cell>
                  <Table.Cell>
                    <Actions />
                  </Table.Cell>
                </Table.Row>
              ))}
          </Table.Body>

          {!profile && (
            <Table.Footer fullWidth>
              <Table.Row>
                <Table.HeaderCell />
                <Table.HeaderCell colSpan="4">
                  <Button
                    floated="right"
                    icon
                    labelPosition="left"
                    color="teal"
                    size="small"
                  >
                    <Icon name="add" /> Add Appointment
                  </Button>
                </Table.HeaderCell>
              </Table.Row>
            </Table.Footer>
          )}
        </Table>
      )}
    </>
  );
};

export default Appointments;
