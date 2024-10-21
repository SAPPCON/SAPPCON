import Head from "next/head";
import StatsNav from "@/components/Navigation/StatsNav";
import React, { Fragment, useContext, useEffect } from "react";
import AuthenticationContext from "@/store/AuthenticationContext";
import Loader from "@/components/UI/Loader";
import { useRouter } from "next/router";
import Stats from "@/components/Stats/Stats";

function StatsPage() {
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
          <title>SAPPCON Estadísticas</title>
          <meta
            name="description"
            content="View statistics related to your budgets, buildings, clients and more"
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
          <title>SAPPCON Estadísticas</title>
          <meta
            name="description"
            content="View statistics related to your budgets, buildings, clients and more"
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
        <title>SAPPCON Estadísticas</title>
        <meta
          name="description"
          content="View statistics related to your budgets, buildings, clients and more"
        />
      </Head>
      <Stats />
    </Fragment>
  );
}

export default StatsPage;
