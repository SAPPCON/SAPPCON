import React, { Fragment } from "react";
import Head from "next/head";
import BudgetNav from "@/components/Navigation/BudgetNav";

function BudgetPage() {
  return (
    <Fragment>
      <Head>
        <title>SAPPCON Presupuestos</title>
        <meta
          name="description"
          content="List of all the budgets you have. Add, modify, delete as needed."
        />
      </Head>
      <BudgetNav />
    </Fragment>
  );
}

export default BudgetPage;
