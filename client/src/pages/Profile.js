import React from "react";
import { Tab } from "semantic-ui-react";
import Appointments from "../components/Appointments";
import { useSelector } from "react-redux";

const Profile = () => {
  const { user } = useSelector((state) => state.auth);

  const panes = [
    {
      menuItem: "Profile Appointments",
      render: () => (
        <Tab.Pane attached={false}>
          <Appointments profile />
        </Tab.Pane>
      ),
    },
    {
      menuItem: "Statistics",
      render: () => (
        <Tab.Pane attached={false}>
          <Statistics />
        </Tab.Pane>
      ),
    },
    {
      menuItem: "Settings",
      render: () => (
        <Tab.Pane attached={false}>
          <Settings />
        </Tab.Pane>
      ),
    },
  ];

  if (user.hasBusiness) {
    panes.splice(1, 0, {
      menuItem: "Business Appointments",
      render: () => (
        <Tab.Pane attached={false}>
          <BusinessAppointments />
        </Tab.Pane>
      ),
    });
  }

  return (
    <Tab
      style={{ paddingLeft: 50, paddingRight: 50 }}
      menu={{ secondary: true, pointing: true }}
      panes={panes}
    />
  );
};

const BusinessAppointments = () => {
  const panes = [
    {
      menuItem: "Todays Appointments",
      render: () => (
        <Tab.Pane>
          {" "}
          <Appointments business />
        </Tab.Pane>
      ),
    },
    {
      menuItem: "All Appointments",
      render: () => (
        <Tab.Pane>
          {" "}
          <Appointments business />
        </Tab.Pane>
      ),
    },
  ];
  return (
    <Tab menu={{ fluid: true, vertical: true, tabular: true }} panes={panes} />
  );
};

const Settings = () => {
  const panes = [
    {
      menuItem: "Information",
      render: () => <Tab.Pane>Tab 1 Content</Tab.Pane>,
    },
    { menuItem: "Password", render: () => <Tab.Pane>Tab 2 Content</Tab.Pane> },
    { menuItem: "General", render: () => <Tab.Pane>Tab 3 Content</Tab.Pane> },
  ];
  return (
    <Tab menu={{ fluid: true, vertical: true, tabular: true }} panes={panes} />
  );
};

const Statistics = () => {
  const panes = [
    {
      menuItem: "Appointments",
      render: () => <Tab.Pane>Tab 1 Content</Tab.Pane>,
    },
    {
      menuItem: "Canceled Appointments",
      render: () => <Tab.Pane>Tab 2 Content</Tab.Pane>,
    },
    { menuItem: "No shows", render: () => <Tab.Pane>Tab 3 Content</Tab.Pane> },
  ];
  return (
    <Tab menu={{ fluid: true, vertical: true, tabular: true }} panes={panes} />
  );
};

export default Profile;
