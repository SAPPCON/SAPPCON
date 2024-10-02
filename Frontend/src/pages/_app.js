import "@/styles/globals.css";
import { ServiceContextProvider } from "@/store/ServiceContext";
import { CategoryContextProvider } from "@/store/CategoryContext";
import { MeasureUnitContextProvider } from "@/store/MeasureUnitContext";
import { AuthenticationContextProvider } from "@/store/AuthenticationContext";

export default function App({ Component, pageProps }) {
  return (
    <AuthenticationContextProvider>
      <MeasureUnitContextProvider>
        <CategoryContextProvider>
          <ServiceContextProvider>
            <Component {...pageProps} />
          </ServiceContextProvider>
        </CategoryContextProvider>
      </MeasureUnitContextProvider>
    </AuthenticationContextProvider>
  );
}
