//WIP

import { createContext, useState } from "react";
const ContextMenuContext = createContext();

import React from "react";

function ContextMenu() {
  const { isVisible, position, content, hideMenu } =
    useContext(ContextMenuContext);

  if (!isVisible) return null;

  return (
    <div
      style={{
        position: "absolute",
        top: position.y,
        left: position.x,
        zIndex: 1000,
      }}
      onMouseLeave={hideMenu}
    >
      {content}
    </div>
  );
}

export default function ContextMenuProvider({ children }) {
  const [isVisible, setIsVisible] = useState();
  const [position, setPosition] = useState();
  const [content, setContent] = useState();

  function showMenu({ x, y, content }) {
    setPosition({ x, y });
    setContent(content);
    setIsVisible(true);
  }

  function hideMenu() {
    setIsVisible(false);
  }
  const value = { isVisible, position, content, showMenu, hideMenu };
  return (
    <ContextMenuContext.Provider value={value}>
      {children}
    </ContextMenuContext.Provider>
  );
}
