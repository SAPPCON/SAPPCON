import React, { Fragment } from "react";
import Head from "next/head";
import Email from "@/components/Customer/CustomerUpdate/Email";

function EmailPage() {
  return (
    <Fragment>
      <Head>
        <title>SAPPCON Cambiar el Correo del Cliente</title>
        <meta name="description" content="Edit your client's email" />
      </Head>
      <Email></Email>
    </Fragment>
  );
}

export default EmailPage;
