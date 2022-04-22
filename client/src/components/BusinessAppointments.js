import React, { useState, useEffect } from "react";
import {
  Button,
  Icon,
  Table,
  Message,
  Loader,
  Popup,
  Dropdown,
} from "semantic-ui-react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAppointments,
  changeAppointmentStatus,
  reset,
} from "../features/appointments/appointmentSlice";

const BusinessAppointments = ({ day }) => {
  const [state, setState] = useState([]);
  const [filtered, setFiltered] = useState(null);
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
            content="Check-In"
            trigger={
              <Button
                onClick={() => {
                  dispatch(
                    changeAppointmentStatus({
                      id,
                      status: "completed",
                      role: "business",
                    })
                  );
                }}
                basic
                color="green"
                icon="check"
              />
            }
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
                      role: "business",
                    })
                  )
                }
                basic
                color="red"
                icon="cancel"
              />
            }
          />
          <Popup
            content="Edit"
            trigger={<Button basic color="yellow" icon="edit" />}
          />
        </Button.Group>
      );
    }
  };

  const handleChange = (value) => {
    setFiltered(state);
    if (value === "Checked In") {
      setFiltered(state.filter((item) => item.status === "completed"));
    } else if (value === "Cancelled") {
      setFiltered(state.filter((item) => item.status === "cancelled"));
    } else if (value === "Pending") {
      setFiltered(state.filter((item) => item.status === "created"));
    }
    // else {
    //   setFiltered(state);
    // }
  };
  useEffect(() => {
    dispatch(fetchAppointments("business"));
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

  const TableRow = ({ s }) => {
    return (
      <Table.Row
        positive={s.status === "completed"}
        error={s.status === "cancelled"}
        key={s._id}
      >
        <Table.Cell>{s.clientId.name}</Table.Cell>
        <Table.Cell>{s.clientId.phone}</Table.Cell>
        <Table.Cell>{s.date}</Table.Cell>
        <Table.Cell>{s.time}</Table.Cell>
        <Table.Cell>
          <Actions show={s.status === "created"} id={s._id} />
        </Table.Cell>
      </Table.Row>
    );
  };

  return (
    <>
      <Dropdown text="Filters" icon="filter" labeled button className="icon">
        <Dropdown.Menu>
          <Dropdown.Item onClick={(e) => handleChange(e.target.textContent)}>
            All
          </Dropdown.Item>
          <Dropdown.Item onClick={(e) => handleChange(e.target.textContent)}>
            Checked In
          </Dropdown.Item>
          <Dropdown.Item onClick={(e) => handleChange(e.target.textContent)}>
            Cancelled
          </Dropdown.Item>
          <Dropdown.Item onClick={(e) => handleChange(e.target.textContent)}>
            Pending
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      {!state ||
        (state.length === 0 && !error && (
          <Message negative>
            <Message.Header>Hmmm</Message.Header>
            <p>Could not find any appointments</p>
          </Message>
        ))}
      {isLoading && !error && <Loader size="big" />}

      {!isLoading && state.length > 0 && (
        <>
          <Table stackable celled>
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
              {!filtered && state.map((s) => <TableRow s={s} />)}
              {filtered && filtered.map((s) => <TableRow s={s} />)}
            </Table.Body>
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
          </Table>
        </>
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

export default BusinessAppointments;
