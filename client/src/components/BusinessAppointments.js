import React, { useState, useEffect } from "react";
import { Button, Icon, Table, Message, Loader } from "semantic-ui-react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAppointments,
  fetchTodaysAppointments,
  reset,
} from "../features/appointments/appointmentSlice";
import AppointmentFilters from "./AppointmentFilters";
import TodaysAppointmentStats from "./TodaysAppointmentStats";
import AppointmentTableActions from "./AppointmentTableActions";

const BusinessAppointments = ({ todays }) => {
  const dispatch = useDispatch();
  const [state, setState] = useState([]);
  const [filtered, setFiltered] = useState(null);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({
    completed: 0,
    pending: 0,
    cancelled: 0,
  });
  const { isLoading, isError, message, isSuccess } = useSelector(
    (state) => state.appointments
  );

  const handleChange = (value) => {
    setFiltered(state);
    if (value === "Completed") {
      setFiltered(state.filter((item) => item.status === "completed"));
    } else if (value === "Cancelled") {
      setFiltered(state.filter((item) => item.status === "cancelled"));
    } else if (value === "Pending") {
      setFiltered(state.filter((item) => item.status === "pending"));
    }
  };

  const handleSearch = (e, { name, value }) => {
    setFiltered(state);
    if (name === "name") {
      setFiltered(
        state.filter((item) => item.clientId.name.toLowerCase().includes(value))
      );
    } else if (name === "phone") {
      setFiltered(
        state.filter((item) =>
          item.clientId.phone.toLowerCase().includes(value)
        )
      );
    } else if (name === "date") {
      setFiltered(
        state.filter((item) =>
          item.date.includes(new Date(value).toDateString())
        )
      );
    }
  };

  useEffect(() => {
    if (todays) {
      dispatch(fetchTodaysAppointments());
      return;
    }
    dispatch(fetchAppointments("business"));
  }, [todays]);

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

  useEffect(() => {
    if (state.length > 0) {
      let completed = state.filter(
        (item) => item.status === "completed"
      ).length;
      let pending = state.filter((item) => item.status === "pending").length;
      let cancelled = state.filter(
        (item) => item.status === "cancelled"
      ).length;
      setStats({ completed, pending, cancelled });
    }
  }, [state]);

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
          <AppointmentTableActions
            status={s.status}
            id={s._id}
            todays={todays}
          />
        </Table.Cell>
      </Table.Row>
    );
  };

  return (
    <>
      <AppointmentFilters
        todays={todays}
        handleChange={handleChange}
        handleSearch={handleSearch}
      />
      {!state ||
        (state.length === 0 && !error && (
          <Message negative>
            <Message.Header>Hmmm</Message.Header>
            <p>Could not find any appointments</p>
          </Message>
        ))}
      {isLoading && !error && <Loader size="massive" />}

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

            {!todays && (
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
          {todays && <TodaysAppointmentStats stats={stats} state={state} />}
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
