import Head from "next/head";
import React, { Fragment, useContext, useEffect } from "react";
import AuthenticationContext from "@/store/AuthenticationContext";
import Loader from "@/components/UI/Loader";
import { useRouter } from "next/router";
import MeasureUnit from "@/components/measureUnit/MeasureUnit";

function UnitMeasurePage() {
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
          <title>SAPPCON Unidades de Medida</title>
          <meta
            name="categories"
            content="List of all the unit measure you have. Add, modify, delete as needed."
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
          <title>SAPPCON Unidades de Medida</title>
          <meta
            name="categories"
            content="List of all the unit measure you have. Add, modify, delete as needed."
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
        <title>SAPPCON Unidades de Medida</title>
        <meta
          name="categories"
          content="List of all the unit measure you have. Add, modify, delete as needed."
        />
      </Head>
      <MeasureUnit />
    </Fragment>
  );
}

export default UnitMeasurePage;
