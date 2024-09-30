import "@/styles/globals.css";
import { ServiceContextProvider } from "@/store/ServiceContext";
import { CategoryContextProvider } from "@/store/CategoryContext";
import { MeasureUnitContextProvider } from "@/store/MeasureUnitContext";
export default function App({ Component, pageProps }) {
  return (
    <MeasureUnitContextProvider>
      <CategoryContextProvider>
        <ServiceContextProvider>
          <Component {...pageProps} />
        </ServiceContextProvider>
      </CategoryContextProvider>
    </MeasureUnitContextProvider>
  );
}
