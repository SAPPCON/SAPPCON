import React, { Fragment } from "react";
import Head from "next/head";
import BudgetNav from "@/components/Navigation/BudgetNav";
import Budget from "@/components/Budget/Budget";

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
      <Budget />
    </Fragment>
  );
}

export default BudgetPage;
