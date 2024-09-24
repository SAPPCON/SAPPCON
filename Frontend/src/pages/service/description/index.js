import React, { Fragment } from "react";
import Head from "next/head";
import Description from "@/components/Service/ServiceUpdate/Description";

function DescriptionPage() {
  return (
    <Fragment>
      <Head>
        <title>SAPPCON Cambiar Descripción del Servicio</title>
        <meta name="description" content="Edit your service's description" />
      </Head>
      <Description></Description>
    </Fragment>
  );
}

export default DescriptionPage;
