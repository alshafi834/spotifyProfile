import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

import { Provider } from "react-redux";
import { store } from "../app/store";
import Login from "../components/Login";

const MyApp = ({ Component, pageProps }: AppProps) => {
  const [isSSR, setIsSSR] = useState(true);
  

  useEffect(() => {
    setIsSSR(false);
  }, []);

  if (isSSR) return null;

  const code = new URLSearchParams(window.location.search).get('code');

  return (
    <Provider store={store}>
      {/* <div>
        {!code ? <Login /> : 
        <div className="flex">
        <Navbar />
        <Component {...pageProps} />
        </div>
        }
      </div> */}
      <Component {...pageProps} />
        
    </Provider>
  );
};

export default MyApp;
