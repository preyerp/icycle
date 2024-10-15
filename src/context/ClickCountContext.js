import React, { createContext, useContext, useState } from 'react';

const ClickCountContext = createContext();

export const ClickCountProvider = ({ children }) => {
  const [clickCounts, setClickCounts] = useState({});

  const incrementClickCount = postId => {
    setClickCounts(prevCounts => ({
      ...prevCounts,
      [postId]: (prevCounts[postId] || 0) + 1
    }));
  };

  const getClickCount = postId => {
    return clickCounts[postId] || 0;
  };

  return (
    <ClickCountContext.Provider value={{ incrementClickCount, getClickCount }}>
      {children}
    </ClickCountContext.Provider>
  );
};

export const useClickCount = () => useContext(ClickCountContext);
