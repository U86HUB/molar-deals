
import React, { createContext, useState, useContext } from "react";
import { CookieSettingsModal } from "@/components/common/CookieSettingsModal";

interface CookieSettingsContextType {
  openCookieSettings: () => void;
}

const CookieSettingsContext = createContext<CookieSettingsContextType>({
  openCookieSettings: () => {},
});

export const useCookieSettings = () => useContext(CookieSettingsContext);

export const CookieSettingsProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openCookieSettings = () => {
    setIsModalOpen(true);
  };

  const closeCookieSettings = () => {
    setIsModalOpen(false);
  };

  return (
    <CookieSettingsContext.Provider value={{ openCookieSettings }}>
      {children}
      <CookieSettingsModal isOpen={isModalOpen} onClose={closeCookieSettings} />
    </CookieSettingsContext.Provider>
  );
};
