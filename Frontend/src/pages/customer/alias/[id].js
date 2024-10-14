import React, { Fragment, useContext, useEffect } from "react";
import Loader from "@/components/UI/Loader";
import { useRouter } from "next/router";
import AuthenticationContext from "@/store/AuthenticationContext";
import Head from "next/head";
import Alias from "@/components/Customer/CustomerUpdate/Alias";

function AliasPage() {
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
          <title>SAPPCON Cambiar Alias del Cliente</title>
          <meta name="description" content="Edit your client's alias" />
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
          <title>SAPPCON Cambiar Alias del Cliente</title>
          <meta name="description" content="Edit your client's alias" />
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
        <title>SAPPCON Cambiar Alias del Cliente</title>
        <meta name="description" content="Edit your client's alias" />
      </Head>
      <Alias customerId={id}></Alias>
    </Fragment>
  );
}

export default AliasPage;
