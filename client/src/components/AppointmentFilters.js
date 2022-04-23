import React, { useState } from "react";
import { Dropdown, Input, Grid } from "semantic-ui-react";
import { DateInput } from "semantic-ui-calendar-react";

const AppointmentFilters = ({ handleChange, handleSearch, todays }) => {
  const [date, setDate] = useState(new Date());
  const [text, setText] = useState("All");

  const handleDropdownChange = (e) => {
    handleChange(e.target.textContent);
    setText(e.target.textContent);
  };
  return (
    <>
      <Grid stackable>
        <Grid.Column stretched mobile={16} tablet={16} computer={4}>
          <Dropdown
            text={text}
            icon="filter"
            labeled
            button
            selection
            className="icon"
          >
            <Dropdown.Menu>
              <Dropdown.Item onClick={handleDropdownChange}>All</Dropdown.Item>
              <Dropdown.Item onClick={handleDropdownChange}>
                Completed
              </Dropdown.Item>
              <Dropdown.Item onClick={handleDropdownChange}>
                Cancelled
              </Dropdown.Item>
              <Dropdown.Item onClick={handleDropdownChange}>
                Pending
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Grid.Column>
        <Grid.Column stretched mobile={16} tablet={16} computer={4}>
          <Input
            onChange={handleSearch}
            name="phone"
            style={{ paddingRight: 5 }}
            placeholder="Phone..."
            icon="phone"
            iconPosition="left"
          />
        </Grid.Column>
        <Grid.Column stretched mobile={16} tablet={16} computer={4}>
          <Input
            name="name"
            onChange={handleSearch}
            placeholder="Name..."
            icon="user"
            iconPosition="left"
          />
        </Grid.Column>
        <Grid.Column stretched mobile={16} tablet={16} computer={4}>
          {!todays && (
            <DateInput
              dateFormat="MM-DD-YYYY"
              closable
              fluid
              closeOnMouseLeave
              placeholder="Date"
              iconPosition="left"
              name="date"
              onChange={handleSearch}
              value={date.toDateString()}
            />
          )}
        </Grid.Column>
      </Grid>
    </>
  );
};

export default AppointmentFilters;
