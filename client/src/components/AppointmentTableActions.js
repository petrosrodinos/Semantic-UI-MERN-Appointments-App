import React from "react";
import { Button, Popup } from "semantic-ui-react";
import { useDispatch } from "react-redux";
import { changeAppointmentStatus } from "../features/appointments/appointmentSlice";

const AppointmentTableActions = ({ id, todays, status }) => {
  const dispatch = useDispatch();

  return (
    <Button.Group fluid basic size="large">
      {status === "pending" && (
        <>
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
          <Popup
            content="Edit"
            trigger={<Button basic color="yellow" icon="edit" />}
          />
        </>
      )}
      {todays && status !== "pending" && (
        <Popup
          content="Back to Pending"
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
              basic
              color="green"
              icon="arrow circle left"
            />
          }
        />
      )}
    </Button.Group>
  );
};

export default AppointmentTableActions;
