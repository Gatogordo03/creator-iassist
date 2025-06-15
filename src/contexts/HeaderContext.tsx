
import { createContext, useState, useContext, ReactNode, Dispatch, SetStateAction } from 'react';

interface HeaderContextType {
  isHeaderHidden: boolean;
  setIsHeaderHidden: Dispatch<SetStateAction<boolean>>;
}

const HeaderContext = createContext<HeaderContextType | undefined>(undefined);

export const HeaderProvider = ({ children }: { children: ReactNode }) => {
  const [isHeaderHidden, setIsHeaderHidden] = useState(false);

  return (
    <HeaderContext.Provider value={{ isHeaderHidden, setIsHeaderHidden }}>
      {children}
    </HeaderContext.Provider>
  );
};

export const useHeader = () => {
  const context = useContext(HeaderContext);
  if (context === undefined) {
    throw new Error('useHeader must be used within a HeaderProvider');
  }
  return context;
};
