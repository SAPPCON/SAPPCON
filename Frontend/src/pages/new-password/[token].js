import React, { Fragment, useContext, useEffect } from "react";
import Head from "next/head";
import Loader from "@/components/UI/Loader";
import { useRouter } from "next/router";
import AuthenticationContext from "@/store/AuthenticationContext";
import NewPassword from "@/components/Authentication/newPassword";

function NamePage() {
  const router = useRouter();
  const authenticationContext = useContext(AuthenticationContext);
  const { token } = router.query;

  return (
    <Fragment>
      <Head>
        <title>SAPPCON Cambiar Contraseña</title>
        <meta name="description" content="Edit your password" />
      </Head>
      <NewPassword token={token}></NewPassword>
    </Fragment>
  );
}

export default NamePage;
