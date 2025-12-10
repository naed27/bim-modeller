import { useState, useCallback } from "react";

export default function useSmartMenuToggler(initialValue = false) {
  const [showMenu, setShowMenu] = useState<boolean>(initialValue);

  const toggleMenu = useCallback(() => setShowMenu((current) => !current), []);

  const openMenu = useCallback(() => setShowMenu(true), []);

  const closeMenu = useCallback(() => setShowMenu(false), []);

  return {
    showMenu,
    openMenu,
    closeMenu,
    toggleMenu,
    setShowMenu,
  };
}
