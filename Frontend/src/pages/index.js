import React, { Fragment, useContext, useEffect } from "react";
import Head from "next/head";
import MainBar from "@/components/Navigation/MainBar";

import AuthenticationContext from "@/store/AuthenticationContext";
import Loader from "@/components/UI/Loader";
import { useRouter } from "next/router";

const Home = () => {
  const router = useRouter();
  const authenticationContext = useContext(AuthenticationContext);

  useEffect(() => {
    if (!authenticationContext.isLoading && !authenticationContext.isLoggedIn) {
      router.push("/auth");
    }
  }, [
    authenticationContext.isLoading,
    authenticationContext.isLoggedIn,
    router,
  ]);

  if (authenticationContext.isLoading) {
    return (
      <Fragment>
        <Head>
          <title>SAPPCON </title>
          <meta
            name="description"
            content="Make your work easier with sappcon."
          />
        </Head>
        <div className="flex h-screen items-center justify-center bg-white">
          <Loader></Loader>
        </div>
      </Fragment>
    );
  }

  if (!authenticationContext.isLoggedIn) {
    return (
      <Fragment>
        <Head>
          <title>SAPPCON </title>
          <meta
            name="description"
            content="Make your work easier with sappcon."
          />
        </Head>
        <div className="flex h-screen items-center justify-center bg-white">
          <Loader></Loader>
        </div>
      </Fragment>
    );
  }

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
