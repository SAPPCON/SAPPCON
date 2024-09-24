import React, { Fragment } from "react";
import Head from "next/head";
import UnitPrice from "@/components/Service/ServiceUpdate/UnitPrice";

function UnitPricePage() {
  return (
    <Fragment>
      <Head>
        <title>SAPPCON Cambiar Precio Unitario del Servicio</title>
        <meta name="description" content="Edit your service's unit price" />
      </Head>
      <UnitPrice></UnitPrice>
    </Fragment>
  );
}

export default UnitPricePage;
