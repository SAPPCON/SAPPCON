import React, { Fragment, useContext, useEffect } from "react";
import AuthenticationContext from "@/store/AuthenticationContext";
import Loader from "@/components/UI/Loader";
import { useRouter } from "next/router";
import Head from "next/head";
import Address from "@/components/Building/BuildingUpdate/Address";

function AddressPage() {
  const router = useRouter();
  const authenticationContext = useContext(AuthenticationContext);
  const { token } = router.query;

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
          <title>SAPPCON Cambiar Dirección de la Obra</title>
          <meta name="description" content="Edit your building's address" />
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
          <title>SAPPCON Cambiar Dirección de la Obra</title>
          <meta name="description" content="Edit your building's address" />
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
        <title>SAPPCON Cambiar Dirección de la Obra</title>
        <meta name="description" content="Edit your building's address" />
      </Head>
      <Address token={token}></Address>
    </Fragment>
  );
}

export default AddressPage;
