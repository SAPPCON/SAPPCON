import Head from "next/head";
import Budget from "@/components/Budget/Budget";
import React, { Fragment, useContext, useEffect } from "react";
import AuthenticationContext from "@/store/AuthenticationContext";
import Loader from "@/components/UI/Loader";
import { useRouter } from "next/router";

function BudgetPage() {
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
          <title>SAPPCON Presupuestos</title>
          <meta
            name="description"
            content="List of all the budgets you have. Add, modify, delete as needed."
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
          <title>SAPPCON Presupuestos</title>
          <meta
            name="description"
            content="List of all the budgets you have. Add, modify, delete as needed."
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
        <title>SAPPCON Presupuestos</title>
        <meta
          name="description"
          content="List of all the budgets you have. Add, modify, delete as needed."
        />
      </Head>
      <Budget />
    </Fragment>
  );
}

export default BudgetPage;
