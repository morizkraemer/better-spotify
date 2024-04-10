import React, { useEffect, useRef } from "react";
import useContextMenuStore from "../stores/contextMenuStore";

export default function ContextMenu() {
  const { isVisible, position, content, hideContextMenu } =
    useContextMenuStore();
  const menuRef = useRef();

  function handleClickOutside(e) {
    if (menuRef.current && !menuRef.current.contains(e.target))
      hideContextMenu();
  }

  function handleEscape(e) {
    if (e.key === "Escape") hideContextMenu();
  }

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("click", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div
      ref={menuRef}
      style={{
        position: "absolute",
        top: position.y,
        left: position.x,
        zIndex: 100,
      }}
      className="bg-black border-2 h-32 w-32"
    >
      {content}
    </div>
  );
}
