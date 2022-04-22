import React, { useState, useEffect } from "react";
import {
  Button,
  Checkbox,
  Form,
  Container,
  Message,
  Segment,
} from "semantic-ui-react";
import { useSelector, useDispatch } from "react-redux";
import { login, reset } from "../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [state, setState] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      setError(message);
    }

    if (isSuccess || user) {
      navigate("/");
    }

    return () => {
      dispatch(reset());
    };
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const handleChange = (e, { name, value }) => {
    setState({ ...state, [name]: value });
  };

  const handleSubmit = async () => {
    setError(null);
    let { email, password } = state;
    if (!email || !password) {
      setError("Please fill out all fields");
      return;
    }
    dispatch(login(state));
  };

  return (
    <Container
      style={{
        width: "50%",
        padding: 50,
      }}
    >
      <Segment color="teal">
        <h1 style={{ color: "teal" }}>Login</h1>
        <Form>
          <Form.Field>
            <Form.Input
              onChange={handleChange}
              name="email"
              size="large"
              fluid
              label="Email Or Phone"
              placeholder="Email Or Phone"
            />
          </Form.Field>
          <Form.Field>
            <Form.Input
              onChange={handleChange}
              name="password"
              size="large"
              type="password"
              fluid
              label="Password"
              placeholder="Password"
            />
          </Form.Field>
          <Form.Field>
            <Checkbox toggle label="Keep me logged in" />
          </Form.Field>
          <Button
            loading={isLoading}
            onClick={handleSubmit}
            color="teal"
            type="submit"
          >
            Login
          </Button>
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

export default Login;
