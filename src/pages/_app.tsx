import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { HydrationProvider, Client } from "react-hydration-provider";
import "../i18n";
import { Provider } from "react-redux";
import { persistor, store } from "../redux/store";
import { PersistGate } from "redux-persist/integration/react";
import 'dotenv/config'
import PrivateRoutes from "@/components/PrivateRoutes";


export default function App({ Component, pageProps }: AppProps) {

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <HydrationProvider>
          <Client>
            <PrivateRoutes>
            <Component {...pageProps} />
            </PrivateRoutes>
          </Client>
        </HydrationProvider>
      </PersistGate>
    </Provider>
  );
}
