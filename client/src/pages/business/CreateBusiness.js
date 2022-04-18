import React, { useRef, useState } from "react";
import {
  Form,
  Container,
  Button,
  Message,
  Icon,
  Segment,
  Image,
} from "semantic-ui-react";
import { useNavigate } from "react-router-dom";

const options = [
  { key: "m", text: "Rethymno", value: "Rethymno" },
  { key: "f", text: "Heraklio", value: "Heraklio" },
  { key: "o", text: "Chania", value: "Chania" },
];

const boptions = [
  { key: "m", text: "Dentistry", value: "Dentistry" },
  { key: "f", text: "Hair Dresser", value: "Hair Dresser" },
  { key: "l", text: "Public Service", value: "Public Service" },
  { key: "n", text: "Medical Office", value: "Medical Office" },
];

const CreateBusiness = () => {
  const navigate = useNavigate();
  const ref = useRef();
  const [error, setError] = useState(null);
  const [state, setState] = useState({
    name: "",
    phone: "",
    ownername: "",
    email: "",
    area: "",
    city: "",
    address: "",
    type: "",
    description: "",
    images: [],
  });

  const handleChange = (e, { name, value }) => {
    setState({ ...state, [name]: value });
  };

  const handleSubmit = async () => {
    setError(null);
    let { phone, name, ownername, email, area, city, address, type, images } =
      state;
    if (
      !phone ||
      !name ||
      !ownername ||
      !email ||
      !address ||
      !area ||
      !city ||
      !type ||
      !images ||
      images.length == 0
    ) {
      setError("Please fill out all fields");
      return;
    }
    navigate("/create/business/hours", { state: { state } });
  };

  const fileChange = (e) => {
    setError("");
    let images = e.target.files;

    if (images.length > 5) {
      setError("Select under 5 photos");
      return;
    }
    let imagesArray = [];
    for (let i = 0; i < images.length; i++) {
      const reader = new FileReader();
      reader.readAsDataURL(images[i]);
      reader.onloadend = () => {
        imagesArray.push(reader.result);
        setState({ ...state, images: imagesArray });
      };
      reader.onerror = () => {
        setError("Choose a valid image");
      };
    }
  };

  return (
    <Container
      style={{
        width: "50%",
        padding: 50,
      }}
    >
      <Segment>
        <Form>
          <h1>Create Your Business</h1>
          <Form.Group widths="equal">
            <Form.Input
              size="large"
              fluid
              label="Name"
              placeholder="Business Name"
              name="name"
              onChange={handleChange}
            />
            <Form.Input
              size="large"
              fluid
              label="Owner Full Name"
              placeholder="Owner Full Name"
              name="ownername"
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group widths="equal">
            <Form.Input
              size="large"
              fluid
              label="Email"
              placeholder="Business Email"
              name="email"
              onChange={handleChange}
            />
            <Form.Input
              size="large"
              fluid
              label="Address"
              placeholder="Business Address"
              name="address"
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group widths="equal">
            <Form.Select
              size="large"
              fluid
              label="City"
              options={options}
              placeholder="Business City"
              name="city"
              onChange={handleChange}
            />
            <Form.Select
              size="large"
              fluid
              label="Area"
              options={options}
              placeholder="Business Area"
              name="area"
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group widths="equal">
            <Form.Input
              type="number"
              size="large"
              fluid
              label="Phone"
              placeholder="Business Phone"
              name="phone"
              onChange={handleChange}
            />
            <Form.Select
              size="large"
              fluid
              label="Type"
              options={boptions}
              placeholder="Business Type"
              name="type"
              onChange={handleChange}
            />
          </Form.Group>
          <Form.TextArea
            label="Description"
            onChange={handleChange}
            name="description"
            rows={2}
            placeholder="Short description..."
            style={{ minHeight: 100 }}
          />
          <Button
            content="Choose Photos"
            labelPosition="left"
            icon="file"
            onClick={() => ref.current.click()}
          />
          <input
            accept="image/*"
            multiple
            ref={ref}
            type="file"
            hidden
            onChange={fileChange}
          />
          <br />
          <br />
          {state.images && (
            <Image.Group size="small">
              {state.images.map((image) => (
                <Image key={image} src={image} />
              ))}
            </Image.Group>
          )}
          <Form.Checkbox
            toggle
            label="I accept the terms of use and conditions"
          />
          <Button animated color="teal" onClick={handleSubmit}>
            <Button.Content visible>Next</Button.Content>
            <Button.Content hidden>
              <Icon name="arrow right" />
            </Button.Content>
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

export default CreateBusiness;
