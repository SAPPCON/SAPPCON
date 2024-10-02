import AuthenticationForm from "@/components/Authentication/AuthenticationForm";
import { useRouter } from "next/router";
import AuthenticationContext from "@/store/AuthenticationContext";
import React, { Fragment, useContext, useEffect } from "react";
import Loader from "@/components/UI/Loader";
import Head from "next/head";

function AuthPage() {
  const router = useRouter();
  const authenticationContext = useContext(AuthenticationContext);
  const text =
    "Access your construction CRM securely. Sign in to manage your clients, estimates, and services, as well as oversee your projects and statistics. Enter your credentials and stay updated with the latest insights and analytics on our platform.";

  //Si esta logeado (se mando la request desde el auth component, obtuvimos el token y lo mandamos al contexto, que si hay token hacer el isLoggedIn true), mandamos el user a la pagina principal. Sino, siempre nos quedamos en esta pagina de auth.
  //Al igual que si estamos log y apretas "atras" te va a tirar a la pag inicial "/"
  useEffect(() => {
    if (!authenticationContext.isLoading && authenticationContext.isLoggedIn) {
      router.push("/");
    }
  }, [
    authenticationContext.isLoading,
    authenticationContext.isLoggedIn,
    router,
  ]);

  //Hasta que se termina de montar y revisar si hay token, esta cargando.
  if (authenticationContext.isLoading) {
    return (
      <Fragment>
        <Head>
          <title>SAPPCON Sign-In</title>
          <meta name="description" content={text} />
        </Head>
        <div className="flex h-screen items-center justify-center bg-white">
          <Loader></Loader>
        </div>
      </Fragment>
    );
  }

  //Esto es cuando se hace el login o detecta un token ya almacenado y se pone en true. O cuando apenas se hace true, mostramos cargando hasta que se hace el push de la pagina principal. Basicamente mostrar cargador antes de redirigir
  if (authenticationContext.isLoggedIn) {
    return (
      <Fragment>
        <Head>
          <title>SAPPCON Sign-In</title>
          <meta name="description" content={text} />
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
        <title>SAPPCON Sign-In</title>
        <meta name="description" content={text} />
      </Head>
      <AuthenticationForm />
    </Fragment>
  );
}

export default AuthPage;
