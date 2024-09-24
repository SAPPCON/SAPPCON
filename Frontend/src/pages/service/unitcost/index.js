import React, { Fragment } from "react";
import Head from "next/head";
import UnitCost from "@/components/Service/ServiceUpdate/UnitCost";

function UnitCostPage() {
  return (
    <Fragment>
      <Head>
        <title>SAPPCON Cambiar Costo Unitario del Servicio</title>
        <meta name="description" content="Edit your service's unit cost" />
      </Head>
      <UnitCost></UnitCost>
    </Fragment>
  );
}

export default UnitCostPage;
