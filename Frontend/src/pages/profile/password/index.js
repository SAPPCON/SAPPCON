import React, { Fragment, useContext, useEffect } from "react";
import Head from "next/head";
import Password from "@/components/Profile/ProfileUpdate/Password";
import Loader from "@/components/UI/Loader";
import { useRouter } from "next/router";
import AuthenticationContext from "@/store/AuthenticationContext";

function NamePage() {
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
        <title>SAPPCON Cambiar Contraseña</title>
        <meta name="description" content="Edit your password" />
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
        <title>SAPPCON Cambiar Contraseña</title>
        <meta name="description" content="Edit your password" />
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
        <title>SAPPCON Cambiar Contraseña</title>
        <meta name="description" content="Edit your password" />
      </Head>
      <Password></Password>
    </Fragment>
  );
}

export default NamePage;
