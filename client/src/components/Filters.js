import {
  Sidebar,
  Menu,
  Icon,
  Container,
  Form,
  Divider,
  Search,
  Button,
} from "semantic-ui-react";
import React, { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import { Slider } from "react-semantic-ui-range";
import { DateInput, TimeInput } from "semantic-ui-calendar-react";
import "../style.css";

const Filters = () => {
  const [visible, setVisible] = useState(false);
  const [filters, setFilters] = useState({
    date: new Date().toDateString(),
    type: "",
    from: "",
    to: "",
    city: "",
    area: "",
    rating: "",
    price: "10",
  });
  const options = [
    { key: "m", text: "Rethymno", value: "Rethymno" },
    { key: "f", text: "Heraklio", value: "Heraklio" },
    { key: "o", text: "Chania", value: "Chania" },
  ];
  const boptions = [
    { key: "m", text: "Dental Office", value: "Dentistry" },
    { key: "f", text: "Hair Dresser", value: "Hair Dresser" },
    { key: "l", text: "Public Service", value: "Public Service" },
    { key: "n", text: "Medical Office", value: "Medical Office" },
  ];

  const settings = {
    start: 10,
    min: 10,
    max: 1000,
    step: 10,
    onChange: (value) => {
      setFilters({ ...filters, price: value });
    },
  };

  const handlePusher = () => {
    if (visible) {
      setVisible(false);
    }
  };

  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-device-width: 768px)",
  });

  const handleChange = (e, { name, value }) => {
    setFilters({ ...filters, [name]: value });
  };

  return (
    <Sidebar.Pushable>
      <Sidebar
        style={{ width: "30vh" }}
        size="massive"
        as={Menu}
        animation="overlay"
        vertical
        visible={isDesktopOrLaptop ? true : visible}
      >
        <Container style={{ paddingLeft: 10, paddingRight: 10 }}>
          <Search fluid style={{ paddingTop: 10 }} placeholder="Search..." />
          <h3 className="tealcolor">Type</h3>
          <Form.Select
            size="large"
            fluid
            options={boptions}
            placeholder="Type"
            name="type"
            onChange={handleChange}
          />
          <h3 className="tealcolor">Day</h3>
          <DateInput
            dateFormat="MM-DD-YYYY"
            closable
            closeOnMouseLeave
            minDate={new Date()}
            style={{ color: "teal" }}
            fluid
            placeholder="Date"
            value={filters.date}
            iconPosition="left"
            name="date"
            onChange={handleChange}
          />
          <h3 className="tealcolor">Time</h3>
          <TimeInput
            closable
            style={{ color: "teal" }}
            fluid
            name="from"
            placeholder="From"
            value={filters.from}
            iconPosition="left"
            onChange={handleChange}
          />
          <br />
          <TimeInput
            closable
            style={{ color: "teal" }}
            fluid
            name="to"
            placeholder="To"
            value={filters.to}
            iconPosition="left"
            onChange={handleChange}
          />
          <h3 className="tealcolor">Place</h3>
          <Form.Select
            size="large"
            fluid
            options={options}
            placeholder="City"
            name="city"
            onChange={handleChange}
          />
          <br />
          <Form.Select
            fluid
            options={options}
            placeholder="Area"
            name="area"
            onChange={handleChange}
          />
          <h3 className="tealcolor">Price: {filters.price} $</h3>
          <Slider value={filters.price} color="black" settings={settings} />
          <Divider />
          <Button
            color="teal"
            onClick={() => alert("I dont work yet")}
            animated
          >
            <Button.Content visible>Search</Button.Content>
            <Button.Content hidden>
              <Icon name="arrow right" />
            </Button.Content>
          </Button>
        </Container>
      </Sidebar>
      <Sidebar.Pusher
        dimmed={isDesktopOrLaptop ? false : visible}
        onClick={handlePusher}
        style={{ minHeight: "90vh" }}
      ></Sidebar.Pusher>
    </Sidebar.Pushable>
  );
};

export default Filters;
