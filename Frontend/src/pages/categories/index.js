import Head from "next/head";
import Categories from "@/components/Categories/Categories";
import React, { Fragment, useContext, useEffect } from "react";
import AuthenticationContext from "@/store/AuthenticationContext";
import Loader from "@/components/UI/Loader";
import { useRouter } from "next/router";

function CategoriesPage() {
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
            name="categories"
            content="List of all the categories you have. Add, modify, delete as needed."
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
            name="categories"
            content="List of all the categories you have. Add, modify, delete as needed."
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
          name="categories"
          content="List of all the categories you have. Add, modify, delete as needed."
        />
      </Head>
      <Categories />
    </Fragment>
  );
}

export default CategoriesPage;
