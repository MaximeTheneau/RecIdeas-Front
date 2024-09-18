// CookiesContext.js
import React, {
  useMemo, useCallback, createContext, useState, useContext,
} from 'react';

const CookiesContext = createContext();

export function CookiesProvider({ children }) {
  const [cookies, setCookies] = useState({
    cookiesGoogle: null,
    cookiesAdsense: null,
    cookiesModal: null,
    cookiesWebmaster: null,
    cookiesChoice: null,
    cookiesAll: null,
  });

  const updateCookies = useCallback((cookieName, value) => {
    setCookies((prevCookies) => ({
      ...prevCookies,
      [cookieName]: value,
    }));
  }, []);

  const contextValue = useMemo(() => ({ cookies, updateCookies }), [cookies, updateCookies]);

  return (
    <CookiesContext.Provider value={contextValue}>
      {children}
    </CookiesContext.Provider>
  );
}

export const useCookies = () => useContext(CookiesContext);
