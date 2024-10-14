import React, { Fragment, useContext, useEffect } from "react";
import Loader from "@/components/UI/Loader";
import { useRouter } from "next/router";
import AuthenticationContext from "@/store/AuthenticationContext";
import Head from "next/head";
import Lastname from "@/components/Customer/CustomerUpdate/Lastname";

function LastnamePage() {
  const router = useRouter();
  const authenticationContext = useContext(AuthenticationContext);
  const { id } = router.query;

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
          <title>SAPPCON Cambiar Apellido del Cliente</title>
          <meta name="description" content="Edit your client's lastname" />
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
          <title>SAPPCON Cambiar Apellido del Cliente</title>
          <meta name="description" content="Edit your client's lastname" />
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
        <title>SAPPCON Cambiar Apellido del Cliente</title>
        <meta name="description" content="Edit your client's lastname" />
      </Head>
      <Lastname customerId={id}></Lastname>
    </Fragment>
  );
}

export default LastnamePage;
