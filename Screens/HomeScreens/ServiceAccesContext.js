import React, { createContext, useState, useContext } from "react";

const ServiceAccessContext = createContext();

export const ServiceAccessProvider = ({ children }) => {
  const [serviceUnlocked, setServiceUnlocked] = useState(false);

  return (
    <ServiceAccessContext.Provider value={{ serviceUnlocked, setServiceUnlocked }}>
      {children}
    </ServiceAccessContext.Provider>
  );
};

export const useServiceAccess = () => useContext(ServiceAccessContext);
