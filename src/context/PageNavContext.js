import { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const PageNavContext = createContext();

export const PageTransitionProvider = ({ children }) => {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const navigate = useNavigate();

  const handlePageTransition = (path) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setIsTransitioning(false);
      navigate(path);
    }, 1000);
  };

  return (
    <PageNavContext.Provider value={{ isTransitioning, handlePageTransition }}>
      {children}
    </PageNavContext.Provider>
  );
};
