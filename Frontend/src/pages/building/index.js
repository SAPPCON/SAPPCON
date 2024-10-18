import Head from "next/head";
import Building from "@/components/Building/Building";
import Loader from "@/components/UI/Loader";
import { useRouter } from "next/router";
import AuthenticationContext from "@/store/AuthenticationContext";
import React, { Fragment, useContext, useEffect } from "react";

function BuildingPage() {
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
          <title>SAPPCON Obras</title>
          <meta
            name="description"
            content="List of all the buildings you have. Add, modify, delete as needed."
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
          <title>SAPPCON Obras</title>
          <meta
            name="description"
            content="List of all the buildings you have. Add, modify, delete as needed."
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
        <title>SAPPCON Obras</title>
        <meta
          name="description"
          content="List of all the buildings you have. Add, modify, delete as needed."
        />
      </Head>
      <Building />
    </Fragment>
  );
}

export default BuildingPage;
