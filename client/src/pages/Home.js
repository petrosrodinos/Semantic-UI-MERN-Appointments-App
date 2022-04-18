import {
  Grid,
  Segment,
  Sticky,
  Rail,
  Ref,
  Message,
  Loader,
  Container,
} from "semantic-ui-react";
import Filters from "../components/Filters";
import News from "../components/News";
import React, { useState, createRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import BusinessCard from "../components/BusinessCard";
import {
  fetchBusinesses,
  reset,
} from "../features/businesses/businessSlice.js";
import StickyContainer from "../components/StickyContainer";

const Home = () => {
  const dispatch = useDispatch();
  const contextRef = createRef();
  const [error, setError] = useState(null);
  const [businesses, setBusinesses] = useState(null);
  const { message, isLoading, isError, isSuccess } = useSelector(
    (state) => state.business
  );

  useEffect(() => {
    dispatch(fetchBusinesses());
  }, []);

  useEffect(() => {
    if (isError) {
      console.log(message);
      setError(message);
    }
    if (isSuccess) {
      setBusinesses(message.businesses);
      // alert(
      //   "There is a small bug when you are trying to press MAKE YOUR APPOINTMENT BUTTON"
      // );
    }
    dispatch(reset());
  }, [isError, isSuccess, message, dispatch]);

  return (
    <StickyContainer>
      {error && (
        <Message negative>
          <Message.Header>An Error Occured</Message.Header>
          <p>{error}</p>
        </Message>
      )}
      {isLoading && <Loader size="large" active inline="centered" />}
      {businesses &&
        !isLoading &&
        businesses.map((data) => <BusinessCard key={data._id} data={data} />)}
      {!businesses && !isLoading && (
        <Message negative>
          <Message.Header>Oups</Message.Header>
          <p>
            Could not find any business,maybe <kbd>Ctrl</kbd> + <kbd>R</kbd>
          </p>
        </Message>
      )}
    </StickyContainer>
  );
};

export default Home;
