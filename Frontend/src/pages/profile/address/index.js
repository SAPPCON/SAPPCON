import React, { Fragment, useContext, useEffect } from "react";
import Head from "next/head";
import Address from "@/components/Profile/ProfileUpdate/Address";
import Loader from "@/components/UI/Loader";
import { useRouter } from "next/router";
import AuthenticationContext from "@/store/AuthenticationContext";

function AddressPage() {
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
        <title>SAPPCON Cambiar Dirección</title>
        <meta name="description" content="Edit your address" />
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
        <title>SAPPCON Cambiar Dirección</title>
        <meta name="description" content="Edit your address" />
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
        <title>SAPPCON Cambiar Dirección</title>
        <meta name="description" content="Edit your address" />
      </Head>
      <Address></Address>
    </Fragment>
  );
}

export default AddressPage;
