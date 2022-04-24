import React from "react";
import { Button, Popup } from "semantic-ui-react";
import { useDispatch } from "react-redux";
import { changeAppointmentStatus } from "../features/appointments/appointmentSlice";

export const BusinessAppointmentTableActions = ({
  id,
  todays,
  status,
  date,
}) => {
  const dispatch = useDispatch();

  if (status === "pending") {
    return (
      <Button.Group fluid basic size="large">
        <>
          {!todays && !checkDateAfter(date) && (
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
          )}
          {todays && (
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
          )}
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
          {!checkDateBefore(date) && !todays && (
            <Popup
              content="Edit"
              trigger={<Button basic color="yellow" icon="edit" />}
            />
          )}
          {todays && (
            <Popup
              content="Edit"
              trigger={<Button basic color="yellow" icon="edit" />}
            />
          )}
        </>
      </Button.Group>
    );
  } else {
    return (
      <Popup
        content="Change Status"
        trigger={
          <Button
            onClick={() =>
              dispatch(
                changeAppointmentStatus({
                  id,
                  status: "pending",
                  role: "business",
                })
              )
            }
            fluid
            basic
            color="yellow"
            icon="arrow circle left"
          />
        }
      />
    );
  }
};

export const UserAppointmentTableActions = ({ id, status, date }) => {
  const dispatch = useDispatch();
  if (status === "pending") {
    return (
      <>
        {checkDateTodayAfter(date) && (
          <Button.Group fluid basic size="large">
            <>
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
            </>
          </Button.Group>
        )}
      </>
    );
  } else {
    return <p>{status.toUpperCase()}</p>;
  }
};

function checkDateBefore(date) {
  var cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - 1);
  return new Date(date) < cutoff;
}

function checkDateAfter(date) {
  var cutoff = new Date();
  cutoff.setDate(cutoff.getDate());
  return new Date(date) > cutoff;
}

function checkDateTodayAfter(date) {
  var cutoff = new Date();
  cutoff.setDate(cutoff.getDate());
  return new Date(date) >= cutoff;
}
