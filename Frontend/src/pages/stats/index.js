import React, { Fragment } from "react";
import Head from "next/head";
import StatsNav from "@/components/Navigation/StatsNav";

function StatsPage() {
  return (
    <Fragment>
      <Head>
        <title>SAPPCON Estadísticas</title>
        <meta
          name="description"
          content="View statistics related to your budgets, buildings, clients and more"
        />
      </Head>
      <StatsNav />
    </Fragment>
  );
}

export default StatsPage;
