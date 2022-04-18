import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createBusiness, reset } from "../../features/businesses/businessSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { Container, Button, Message, Icon } from "semantic-ui-react";
import Acordion from "../../components/Accordion";

const Hours = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [hours, setHours] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const { isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.business
  );
  const { user } = useSelector((state) => state.auth);
  const days = [
    "Sunday",
    "Monday",
    "Thuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const newIndex = activeIndex === index ? -1 : index;
    setActiveIndex(newIndex);
  };

  const handleSubmit = () => {
    if (!location.state || !hours) return;
    dispatch(
      createBusiness({
        ...location.state.state,
        userId: user.userId,
        hours: hours,
      })
    );
  };

  const addRecord = (record, day) => {
    let temp = JSON.parse(localStorage.getItem("hours"));
    const dayIndex = temp.findIndex((r) => r.day === day);
    if (dayIndex != -1) {
      const newRecord = temp[dayIndex].hours.concat(record);
      temp[dayIndex].hours = newRecord;
      setHours(temp);
      localStorage.setItem("hours", JSON.stringify(temp));
    } else {
      let newRecord = {
        day: day,
        hours: [record],
      };
      let newR = hours.concat(newRecord);
      localStorage.setItem("hours", JSON.stringify(newR));
      setHours(newR);
    }
  };

  const deleteRecord = (id, day) => {
    let temp = JSON.parse(localStorage.getItem("hours"));
    const dayIndex = temp.findIndex((r) => r.day === day);
    if (dayIndex != -1) {
      const filteredHours = temp[dayIndex].hours.filter((h) => h.id !== id);
      temp[dayIndex].hours = filteredHours;
      setHours(temp);
      localStorage.setItem("hours", JSON.stringify(temp));
    }
  };

  useEffect(() => {
    localStorage.setItem("hours", JSON.stringify([]));
  }, []);

  useEffect(() => {
    if (isError) {
      console.log(message);
      setError(message);
    }
    if (isSuccess) {
      navigate("/profile");
    }
    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  return (
    <Container>
      {error && (
        <Message negative>
          <Message.Header>An Error Occured</Message.Header>
          <p>{error}</p>
        </Message>
      )}
      {days.map((day, index) => (
        <Acordion
          onAddRecord={addRecord}
          onDeleteRecord={deleteRecord}
          day={day}
          index={index}
          key={index}
          handleClick={handleClick}
          activeIndex={activeIndex}
        />
      ))}
      <br />
      <Button color="teal" onClick={handleSubmit} animated>
        <Button.Content visible>Save</Button.Content>
        <Button.Content hidden>
          <Icon name="save" />
        </Button.Content>
      </Button>
    </Container>
  );
};

export default Hours;
