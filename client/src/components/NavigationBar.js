import React, { useState } from "react";
import { Button, Dropdown, Menu } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";
import { logout } from "../features/auth/authSlice";
import { useSelector, useDispatch } from "react-redux";

const NavigationBar = () => {
  const [active, setActive] = useState("home");
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const handleItemClick = (e, { name }) => setActive(name);
  const { user } = useSelector((state) => state.auth);

  return (
    <Menu size="large">
      {/* <Menu.Item
        name="business"
        active={active === "business"}
        onClick={(e, l) => {
          handleItemClick(e, l);
          navigate("/create/hours");
        }}
      /> */}
      <Menu.Item
        name="home"
        active={active === "home"}
        onClick={(e, l) => {
          handleItemClick(e, l);
          navigate("/");
        }}
      />

      {user && (
        <Menu.Item
          name="profile"
          active={active === "profile"}
          onClick={(e, l) => {
            handleItemClick(e, l);
            navigate(`/profile/user/${user.userId}`);
          }}
        />
      )}
      {user && <Menu.Item name="messages" active={active === "messages"} />}
      <Menu.Item name="about" active={active === "about"} />
      <Menu.Item name="contact" active={active === "contact"} />

      <Menu.Menu position="right">
        <Dropdown item text="Language">
          <Dropdown.Menu>
            <Dropdown.Item>English</Dropdown.Item>
            <Dropdown.Item>Russian</Dropdown.Item>
            <Dropdown.Item>Spanish</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <Menu.Item>
          {!user ? (
            <Button.Group>
              <Button
                onClick={() => navigate("/auth/login")}
                size="large"
                color="teal"
              >
                Login
              </Button>
              <Button.Or />
              <Button
                onClick={() => navigate("/auth/register")}
                size="large"
                color="instagram"
              >
                Register
              </Button>
            </Button.Group>
          ) : (
            <Button
              onClick={() => {
                dispatch(logout());
                navigate("/");
              }}
              size="large"
              color="teal"
            >
              Log out
            </Button>
          )}
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  );
};

export default NavigationBar;
