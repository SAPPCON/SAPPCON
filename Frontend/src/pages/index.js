import React, { Fragment } from "react";
import Head from "next/head";
import MainBar from "@/components/Navigation/MainBar";

const Home = () => {
  return (
    <Fragment>
      <Head>
        <title>SAPPCON </title>
        <meta
          name="description"
          content="Make your work easier with sappcon."
        />
      </Head>
      <MainBar />
    </Fragment>
  );
};

export default Home;
