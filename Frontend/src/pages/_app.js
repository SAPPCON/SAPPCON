import "@/styles/globals.css";
import { ServiceContextProvider } from "@/store/ServiceContext";
import { CategoryContextProvider } from "@/store/CategoryContext";
import { MeasureUnitContextProvider } from "@/store/MeasureUnitContext";
import { AuthenticationContextProvider } from "@/store/AuthenticationContext";
import { ProfileContextProvider } from "@/store/ProfileContext";
import { CustomerContextProvider } from "@/store/CustomerContext";

export default function App({ Component, pageProps }) {
  return (
    <AuthenticationContextProvider>
      <MeasureUnitContextProvider>
        <CategoryContextProvider>
          <ServiceContextProvider>
            <CustomerContextProvider>
            <ProfileContextProvider>
            <Component {...pageProps} />
            </ProfileContextProvider>
            </CustomerContextProvider>
          </ServiceContextProvider>
        </CategoryContextProvider>
      </MeasureUnitContextProvider>
    </AuthenticationContextProvider>
  );
}
