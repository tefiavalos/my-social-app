"use client";

import { Provider } from "react-redux";
import { persistor, store } from "@/state/store";
import { PersistGate } from "redux-persist/integration/react";
import { useEffect, useState } from "react";

const Providers = ({ children }: { children: React.ReactNode }) => {
  const [isClient, setIsClient] = useState(false)
 
  //fix hydration error
  useEffect(() => {
    setIsClient(true)
  }, [])
 
  return (
    isClient ?
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider> : null 
  );
};

export default Providers;
