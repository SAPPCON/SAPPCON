import React, { Fragment } from "react";
import Head from "next/head";
import Email from "@/components/Profile/ProfileUpdate/Email";

function EmailPage() {
  return (
    <Fragment>
      <Head>
        <title>SAPPCON Cambiar Dirección de Correo</title>
        <meta name="description" content="Edit your email" />
      </Head>
      <Email></Email>
    </Fragment>
  );
}

export default EmailPage;
