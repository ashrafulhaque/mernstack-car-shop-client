import React from "react";
import Banner from "../components/Banner";
import Categories from "../components/Categories";
import UserReview from "../components/UserReview";
import { Helmet } from "react-helmet-async";
import BestSellers from "../components/BestSellers";

const HomePage = () => {
  return (
    <>
      <Helmet>
        <title>NFS CarShop | Home</title>
      </Helmet>
      <Banner />
      <Categories />
      <BestSellers />
      <UserReview />
    </>
  );
};

export default HomePage;
