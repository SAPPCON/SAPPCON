import React, { Fragment } from "react";
import Head from "next/head";
import Name from "@/components/Service/ServiceUpdate/Name";

function NamePage() {
  return (
    <Fragment>
      <Head>
        <title>SAPPCON Cambiar Nombre del Servicio</title>
        <meta name="description" content="Edit your service's name" />
      </Head>
      <Name></Name>
    </Fragment>
  );
}

export default NamePage;
