import React, { Fragment } from "react";
import Head from "next/head";
import Alias from "@/components/Customer/CustomerUpdate/Alias";

function AliasPage() {
  return (
    <Fragment>
      <Head>
        <title>SAPPCON Cambiar Alias del Cliente</title>
        <meta name="description" content="Edit your client's alias" />
      </Head>
      <Alias></Alias>
    </Fragment>
  );
}

export default AliasPage;
