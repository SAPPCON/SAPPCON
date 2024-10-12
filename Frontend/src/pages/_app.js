import "@/styles/globals.css";
import { ServiceContextProvider } from "@/store/ServiceContext";
import { CategoryContextProvider } from "@/store/CategoryContext";
import { MeasureUnitContextProvider } from "@/store/MeasureUnitContext";
import { AuthenticationContextProvider } from "@/store/AuthenticationContext";
import { ProfileContextProvider } from "@/store/ProfileContext";

export default function App({ Component, pageProps }) {
  return (
    <AuthenticationContextProvider>
      <MeasureUnitContextProvider>
        <CategoryContextProvider>
          <ServiceContextProvider>
            <ProfileContextProvider>
            <Component {...pageProps} />
            </ProfileContextProvider>
          </ServiceContextProvider>
        </CategoryContextProvider>
      </MeasureUnitContextProvider>
    </AuthenticationContextProvider>
  );
}
