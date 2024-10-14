import React, { Fragment, useContext, useEffect } from "react";
import Loader from "@/components/UI/Loader";
import { useRouter } from "next/router";
import AuthenticationContext from "@/store/AuthenticationContext";
import Head from "next/head";
import Customer from "@/components/Customer/Customer";

function CustomerPage() {
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
          <title>SAPPCON Clientes</title>
          <meta
            name="description"
            content="List of all the customers you have. Add, modify, delete as needed."
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
          <title>SAPPCON Clientes</title>
          <meta
            name="description"
            content="List of all the customers you have. Add, modify, delete as needed."
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
        <title>SAPPCON Clientes</title>
        <meta
          name="description"
          content="List of all the customers you have. Add, modify, delete as needed."
        />
      </Head>
      <Customer />
    </Fragment>
  );
}

export default CustomerPage;
