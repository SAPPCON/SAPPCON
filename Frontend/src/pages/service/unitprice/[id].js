import React, { Fragment, useContext, useEffect } from "react";
import Head from "next/head";
import UnitPrice from "@/components/Service/ServiceUpdate/UnitPrice";
import AuthenticationContext from "@/store/AuthenticationContext";
import Loader from "@/components/UI/Loader";
import { useRouter } from "next/router";

function UnitPricePage() {
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
        <title>SAPPCON Cambiar Precio Unitario del Servicio</title>
        <meta name="description" content="Edit your service's unit price" />
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
        <title>SAPPCON Cambiar Precio Unitario del Servicio</title>
        <meta name="description" content="Edit your service's unit price" />
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
        <title>SAPPCON Cambiar Precio Unitario del Servicio</title>
        <meta name="description" content="Edit your service's unit price" />
      </Head>
      <UnitPrice serviceId={id}></UnitPrice>
    </Fragment>
  );
}

export default UnitPricePage;
