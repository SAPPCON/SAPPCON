import React, { Fragment, useContext, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import NewPassword from "@/components/Authentication/NewPassword";

function NamePage() {
  const router = useRouter();
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
