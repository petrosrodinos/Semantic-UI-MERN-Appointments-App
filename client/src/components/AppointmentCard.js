import React, { useEffect, useState } from "react";
import { Card, Table, Icon, Button, Message, Confirm } from "semantic-ui-react";
import { DateInput } from "semantic-ui-calendar-react";
import "../style.css";
import { useDispatch, useSelector } from "react-redux";
import {
  createAppointment,
  reset,
} from "../features/appointments/appointmentSlice";
import { useNavigate } from "react-router-dom";

const AppointmentCard = ({ hours, id, name }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [date, setDate] = useState(null);
  const [error, setError] = useState(null);
  const [confirm, setConfirm] = useState({
    open: false,
    time: {},
  });
  const [state, setState] = useState(new Date().toDateString());
  const { isLoading, isError, message, isSuccess } = useSelector(
    (state) => state.appointments
  );
  const { user } = useSelector((state) => state.auth);

  const handleChange = (e, { name, value }) => {
    try {
      if (!value || !hours) return;
      setState(value);
      const day = new Date(value).getDay();
      if (day >= hours.length) {
        setDate(null);
        return;
      }
      setDate(hours[day].hours);
    } catch (error) {
      console.log(error);
      setDate(null);
    }
  };

  useEffect(() => {
    if (isError) {
      setError(message);
    }

    if (isSuccess) {
      navigate("/");
    }
    setConfirm({ ...confirm, open: false });

    return () => {
      dispatch(reset());
    };
  }, [isError, isSuccess, message, navigate, dispatch]);

  useEffect(() => {
    if (!hours) return;
    const day = new Date().getDay();
    if (day >= hours.length) {
      setDate(null);
      return;
    }
    setDate(hours[day].hours);
  }, []);

  const handleConfirm = () => {
    const time = `${confirm.time.from}-${confirm.time.to}`;
    dispatch(
      createAppointment({
        date: state,
        timeId: confirm.time.id,
        businessId: id,
        time: time,
      })
    );
  };

  return (
    <>
      <Confirm
        open={confirm.open}
        content={() => {
          return (
            confirm && (
              <h3 style={{ padding: 10 }}>
                Confirm your appointment at <a>{name}</a> on <a>{state}</a> and
                time{" "}
                <a>
                  {confirm.time.from}-{confirm.time.to}
                </a>
              </h3>
            )
          );
        }}
        header="Confirm"
        onCancel={() => setConfirm({ ...confirm, open: false, time: {} })}
        confirmButton={() => (
          <Button
            onClick={handleConfirm}
            loading={isLoading}
            color="teal"
            type="submit"
          >
            Confirm
          </Button>
        )}
      />
      <Card centered fluid color="teal">
        <Card.Content>
          <Card.Header style={{ color: "teal" }}>
            MAKE YOUR APPOINTMENT
          </Card.Header>
        </Card.Content>
        <Card.Content>
          {error && <Message negative>{error}</Message>}
          {isLoading && <h3>loading...</h3>}
          <h3>Date</h3>
          <DateInput
            dateFormat="MM-DD-YYYY"
            closable
            closeOnMouseLeave
            minDate={new Date()}
            style={{ color: "teal", width: "100%" }}
            fluid
            placeholder="Date"
            value={state}
            iconPosition="left"
            name="date"
            onChange={handleChange}
          />
        </Card.Content>
        {!date && (
          <Message style={{ margin: 20 }} color="yellow">
            There are no available appointments for this day
          </Message>
        )}
        {date && (
          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>From</Table.HeaderCell>
                <Table.HeaderCell>To</Table.HeaderCell>
                <Table.HeaderCell>Spots</Table.HeaderCell>
                <Table.HeaderCell></Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {date &&
                date.map((d) => (
                  <Table.Row>
                    <Table.Cell>{d.from}</Table.Cell>
                    <Table.Cell>{d.to}</Table.Cell>
                    <Table.Cell>3/{d.people}</Table.Cell>

                    <Table.Cell>
                      <Button
                        onClick={() => {
                          if (!user) navigate("/auth/login");
                          setConfirm({ ...confirm, open: true, time: d });
                        }}
                        color="teal"
                        fluid
                        icon
                      >
                        <Icon name="add" />
                      </Button>
                    </Table.Cell>
                  </Table.Row>
                ))}
            </Table.Body>
          </Table>
        )}
      </Card>
    </>
  );
};

export default AppointmentCard;
