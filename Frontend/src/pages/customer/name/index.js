import React, { Fragment } from "react";
import Head from "next/head";
import Name from "@/components/Customer/CustomerUpdate/Name";

function NamePage() {
  return (
    <Fragment>
      <Head>
        <title>SAPPCON Cambiar Nombre del Cliente</title>
        <meta name="description" content="Edit your client's name" />
      </Head>
      <Name></Name>
    </Fragment>
  );
}

export default NamePage;
