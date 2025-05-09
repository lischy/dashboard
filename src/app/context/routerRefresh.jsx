"use client";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

const RouterRefreshContext = createContext(null);
const RouterRefreshProvider = (props) => {
  const [refresh, setRefresh] = useState(false);

  return (
    <RouterRefreshContext.Provider value={{ refresh, setRefresh }}>
      {props.children}
    </RouterRefreshContext.Provider>
  );
};

export const useRouterRefreshContext = () => useContext(RouterRefreshContext);

export default RouterRefreshProvider;
