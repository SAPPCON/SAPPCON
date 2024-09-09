import AuthenticationForm from "@/components/Authentication/AuthenticationForm";
//import { useRouter } from "next/router";
//import AuthContext from "../../store/auth-context";
import React, { Fragment, useContext, useEffect } from "react";
//import Loader from "@/components/UI/Loader";
import Head from "next/head";

function AuthPage() {
  return (
    <Fragment>
      <Head>
        <title>SAPPCON Sign-In</title>
        <meta
          name="description"
          content="Access your account securely. Sign in to explore personalized features, manage your orders, and enjoy a seamless shopping experience. Enter your credentials and stay connected with the latest updates and promotions on our platform."
        />
      </Head>
      <AuthenticationForm />
    </Fragment>
  );
}

export default AuthPage;
