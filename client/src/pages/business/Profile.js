import React, { useState, useEffect, createRef } from "react";
import { useLocation } from "react-router-dom";
import {
  Grid,
  Segment,
  Sticky,
  Rail,
  Ref,
  Loader,
  Message,
} from "semantic-ui-react";
import BusinessCard from "../../components/BusinessCard";
import AppointmentCard from "../../components/AppointmentCard";
import News from "../../components/News";
import Comments from "../../components/Comments";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchBusiness, reset } from "../../features/businesses/businessSlice";

const Profile = () => {
  const contextRef = createRef();
  const location = useLocation();
  const dispatch = useDispatch();
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const { isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.business
  );

  useEffect(() => {
    if (location.state) {
      setData(location.state.data);
      return;
    }
    dispatch(fetchBusiness(id));
  }, [location.state, id]);

  useEffect(() => {
    if (isError) {
      console.log(message);
      setError(message);
    }
    if (isSuccess) {
      setData(message);
    }
    dispatch(reset());
  }, [isError, isSuccess, message, dispatch]);

  return (
    <Grid stackable centered columns={2}>
      <Grid.Column>
        <Ref innerRef={contextRef}>
          <Segment>
            <Rail position="right">
              <Sticky context={contextRef}>
                <News />
              </Sticky>
            </Rail>
            {data && (
              <>
                <BusinessCard profile data={data}>
                  <Comments id={id} />
                </BusinessCard>
                <Rail position="left">
                  <Sticky context={contextRef}>
                    <AppointmentCard
                      name={data.name}
                      id={data._id}
                      hours={data.hours}
                    />
                  </Sticky>
                </Rail>
              </>
            )}
            {error && (
              <Message negative>
                <Message.Header>An Error Occured</Message.Header>
                <p>{error}</p>
              </Message>
            )}
            {isLoading && <Loader active inline="centered" />}
          </Segment>
        </Ref>
      </Grid.Column>
    </Grid>
  );
};

export default Profile;
