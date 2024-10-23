import React from "react";
import Banner from "../components/Banner";
import Categories from "../components/Categories";
import UserReview from "../components/UserReview";
import { Helmet } from "react-helmet-async";

const HomePage = () => {
  return (
    <>
      <Helmet>
        <title>NFS CarShop | Home</title>
      </Helmet>
      <Banner />
      <Categories />
      <UserReview />
    </>
  );
};

export default HomePage;
