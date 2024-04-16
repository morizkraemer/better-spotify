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
      className="bg-black border w-64"
    >
      {content.map((e) => {
        return (
          <div className="flex items-center p-2 text-xl h-12 border border-neutral-700 hover:border-neutral-300">
            {e.name}
          </div>
        );
      })}
    </div>
  );
}
