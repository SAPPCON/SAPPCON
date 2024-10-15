import Head from "next/head";
import Name from "@/components/Building/BuildingUpdate/Name";
import React, { Fragment, useContext, useEffect } from "react";
import AuthenticationContext from "@/store/AuthenticationContext";
import Loader from "@/components/UI/Loader";
import { useRouter } from "next/router";

function NamePage() {
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
          <title>SAPPCON Cambiar Nombre de la Obra</title>
          <meta name="description" content="Edit your building's name" />
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
          <title>SAPPCON Cambiar Nombre de la Obra</title>
          <meta name="description" content="Edit your building's name" />
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
        <title>SAPPCON Cambiar Nombre de la Obra</title>
        <meta name="description" content="Edit your building's name" />
      </Head>
      <Name buildingId={id}></Name>
    </Fragment>
  );
}

export default NamePage;
