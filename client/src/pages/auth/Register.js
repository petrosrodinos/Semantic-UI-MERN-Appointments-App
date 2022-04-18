import React, { useState, useEffect } from "react";
import {
  Form,
  Container,
  Message,
  Loader,
  Segment,
  Checkbox,
} from "semantic-ui-react";
import { useSelector, useDispatch } from "react-redux";
import { register, reset } from "../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

const options = [
  { key: "m", text: "Rethymno", value: "Rethymno" },
  { key: "f", text: "Heraklio", value: "Heraklio" },
  { key: "o", text: "Chania", value: "Chania" },
];

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );
  const [state, setState] = useState({
    fullname: "",
    phone: "",
    email: "",
    password: "",
    area: "",
    city: "",
    business: false,
  });

  useEffect(() => {
    if (isError) {
      setError(message);
    }

    if ((isSuccess || user) && state.business) {
      navigate("/create/business/profile");
      dispatch(reset());
      return;
    }

    if (isSuccess || user) {
      navigate("/profile");
      dispatch(reset());
      return;
    }
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const handleChange = (e, { name, value }) => {
    setState({ ...state, [name]: value });
  };

  const handleSubmit = async () => {
    setError(null);
    let { fullname, password, area, city, email, phone } = state;
    if (!email || !password || !fullname || !phone || !area || !city) {
      setError("Please fill out all fields");
      return;
    }
    dispatch(register(state));
  };

  return (
    <Container
      style={{
        width: "60%",
        padding: 50,
      }}
    >
      <Segment color="teal">
        <h1 style={{ color: "teal" }}>Register</h1>
        <Form>
          <Form.Group widths="equal">
            <Form.Input
              size="large"
              fluid
              label="Full Name"
              placeholder="Full Name"
              name="fullname"
              onChange={handleChange}
            />
            <Form.Input
              type="number"
              name="phone"
              size="large"
              fluid
              label="Phone"
              placeholder="Phone Number"
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group widths="equal">
            <Form.Input
              name="email"
              size="large"
              fluid
              label="Email"
              placeholder="Email"
              onChange={handleChange}
            />
            <Form.Input
              name="password"
              size="large"
              type="password"
              fluid
              label="Password"
              placeholder="Password"
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group widths="equal">
            <Form.Select
              name="city"
              size="large"
              fluid
              label="City"
              options={options}
              placeholder="City"
              onChange={handleChange}
            />
            <Form.Select
              name="area"
              size="large"
              fluid
              label="Area"
              options={options}
              placeholder="Area"
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Field>
            <Checkbox
              label="I have a business"
              toggle
              onClick={(e, { checked }) =>
                setState({ ...state, business: checked })
              }
            />
          </Form.Field>
          <Form.Button
            loading={isLoading}
            onClick={handleSubmit}
            color="teal"
            type="submit"
          >
            Create Account
          </Form.Button>
          {error && (
            <Message negative>
              <Message.Header>An Error Occured</Message.Header>
              <p>{error}</p>
            </Message>
          )}
        </Form>
      </Segment>
    </Container>
  );
};

export default Register;
