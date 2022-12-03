import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

import { Provider } from "react-redux";
import { store } from "../app/store";

const MyApp = ({ Component, pageProps }: AppProps) => {
  const [isSSR, setIsSSR] = useState(true);

  useEffect(() => {
    setIsSSR(false);
  }, []);

  if (isSSR) return null;

  return (
    <Provider store={store}>
        <Component {...pageProps} />
    </Provider>
  );
};

export default MyApp;
