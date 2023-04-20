
import React, { useState } from "react";


function useHistory(addItem: any) {
  const [history, setHistory] = useState([]);
  const [position, setPosition] = useState(-1);

  const addToHistory = () => {
    const newItem: any = addItem();
    const newHistory: any = history.slice(0, position + 1);
    newHistory.push(newItem);
    setHistory(newHistory);
    setPosition(newHistory.length - 1);
    console.log("History:", newHistory);
    return newItem;
  };

  const moveToPrevious = () => {
    if (position > 0) {
      setPosition(position - 1);
      return history[position - 1];
    }
    return null;
  };

  const moveToNext = () => {
    if (position < history.length - 1) {
      setPosition(position + 1);
      return history[position + 1];
    }
    return null;
  };

  const getCurrentItem = () => {
    return position >= 0 ? history[position] : null;
  };

  return {
    addToHistory,
    moveToPrevious,
    moveToNext,
    getCurrentItem,
  };
}


export default useHistory;
