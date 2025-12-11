import { useState, useCallback } from "react";

export default function useSmartMenuToggler({
  initialValue = false,
  enableContextOnOpen = false,
}:{
  initialValue?: boolean,
  enableContextOnOpen?: boolean,
}) {

  const [contextValue, setContextValue] = useState<any>(null)

  const [showMenu, setShowMenu] = useState<boolean>(initialValue)

  const toggleMenu = useCallback(() => setShowMenu((current) => !current), [])

  const openMenu = useCallback((payload?: any) => {
    setShowMenu(true)
    enableContextOnOpen && setContextValue(payload)
  }, [enableContextOnOpen])

  const closeMenu = useCallback(() => {
    setShowMenu(false)
    setContextValue(null)
  }, [])

  return {
    showMenu,
    openMenu,
    closeMenu,
    toggleMenu,
    setShowMenu,
    contextValue, 
    setContextValue,
  };
}
