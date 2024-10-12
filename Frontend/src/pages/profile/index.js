import React, { Fragment, useContext, useEffect } from "react";
import Head from "next/head";
import Profile from "@/components/Profile/Profile";
import Loader from "@/components/UI/Loader";
import { useRouter } from "next/router";
import AuthenticationContext from "@/store/AuthenticationContext";

function ProfilePage() {
  const router = useRouter();
  const authenticationContext = useContext(AuthenticationContext);

  useEffect(() => {
    if (!authenticationContext.isLoading && !authenticationContext.isLoggedIn) {
      router.push("/auth");
    }
  }, [
    authenticationContext.isLoading,
    authenticationContext.isLoggedIn,
    router,
  ]);


  if (authenticationContext.isLoading) {
    return (
      <Fragment>
      <Head>
        <title>SAPPCON Perfil</title>
        <meta
          name="description"
          content="Manage your account settings on our platform. Access and update your personal information, security settings, and preferences. Stay in control of your account details and customize your experience with ease"
        />
      </Head>
        <div className="flex h-screen items-center justify-center bg-white">
          <Loader></Loader>
        </div>
      </Fragment>
    );
  }


  if (!authenticationContext.isLoggedIn) {
    return (
      <Fragment>
      <Head>
        <title>SAPPCON Perfil</title>
        <meta
          name="description"
          content="Manage your account settings on our platform. Access and update your personal information, security settings, and preferences. Stay in control of your account details and customize your experience with ease"
        />
      </Head>
        <div className="flex h-screen items-center justify-center bg-white">
          <Loader></Loader>
        </div>
      </Fragment>
    );
  }


  return (
    <Fragment>
      <Head>
        <title>SAPPCON Perfil</title>
        <meta
          name="description"
          content="Manage your account settings on our platform. Access and update your personal information, security settings, and preferences. Stay in control of your account details and customize your experience with ease"
        />
      </Head>
      <Profile />
    </Fragment>
  );
}

export default ProfilePage;
