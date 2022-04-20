import React, { useEffect, useState } from "react";
import {
  Image,
  Card,
  Rating,
  Grid,
  Icon,
  Button,
  Divider,
} from "semantic-ui-react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { useNavigate } from "react-router-dom";
import "../style.css";

const BusinessCard = ({ data, profile, children }) => {
  const navigate = useNavigate();

  return (
    <Card
      style={{ width: "75%", paddingBottom: 20 }}
      fluid
      color="teal"
      centered
    >
      <Card.Content>
        <Card.Header style={{ color: "teal" }}>{data.name}</Card.Header>

        <Card.Meta>
          <p>{data.ownername}</p>
          <Rating disabled icon="star" defaultRating={5} maxRating={5} />
        </Card.Meta>
      </Card.Content>
      <Carousel showThumbs={false} infiniteLoop={true} showStatus={false}>
        {data.images &&
          data.images.map((image) => (
            <div>
              <Image
                key={Math.random()}
                size="big"
                src={image}
                wrapped
                ui={false}
              />
            </div>
          ))}
      </Carousel>
      <Card.Content>
        <Card.Description>{data.description}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Grid stackable>
          <Grid.Column mobile={16} tablet={8} computer={6}>
            <b style={style}>
              <Icon size="large" name="location arrow" color="teal" />
              {`${data.address} ${data.city} ${data.area}`}
            </b>
          </Grid.Column>
          <Grid.Column mobile={16} tablet={8} computer={5}>
            <b style={style}>
              <Icon size="large" name="phone" color="teal" />
              {data.phone}
            </b>
          </Grid.Column>

          <Grid.Column mobile={16} tablet={8} computer={5}>
            <b style={style}>
              <Icon size="large" name="mail" color="teal" />
              {data.email}
            </b>
          </Grid.Column>
        </Grid>
        {children && (
          <>
            <Divider />
            {children}
          </>
        )}
        {!profile && (
          <>
            <Divider />
            <Button
              fluid
              color="teal"
              onClick={() => {
                navigate(`/profile/business/${data._id}`, {
                  state: { data: data },
                });
              }}
            >
              MAKE YOUR APPOINTMENT
            </Button>
          </>
        )}
      </Card.Content>
    </Card>
  );
};

const style = {
  paddingRight: 10,
  color: "teal",
};

export default BusinessCard;
