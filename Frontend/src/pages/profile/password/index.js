import React, { Fragment } from "react";
import Head from "next/head";
import Password from "@/components/Profile/ProfileUpdate/Password";

function NamePage() {
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
