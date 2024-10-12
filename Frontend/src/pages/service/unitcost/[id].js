import React, { Fragment, useContext, useEffect } from "react";
import Head from "next/head";
import UnitCost from "@/components/Service/ServiceUpdate/UnitCost";
import AuthenticationContext from "@/store/AuthenticationContext";
import Loader from "@/components/UI/Loader";
import { useRouter } from "next/router";

function UnitCostPage() {
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
        <title>SAPPCON Cambiar Costo Unitario del Servicio</title>
        <meta name="description" content="Edit your service's unit cost" />
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
        <title>SAPPCON Cambiar Costo Unitario del Servicio</title>
        <meta name="description" content="Edit your service's unit cost" />
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
        <title>SAPPCON Cambiar Costo Unitario del Servicio</title>
        <meta name="description" content="Edit your service's unit cost" />
      </Head>
      <UnitCost serviceId={id}></UnitCost>
    </Fragment>
  );
}

export default UnitCostPage;
