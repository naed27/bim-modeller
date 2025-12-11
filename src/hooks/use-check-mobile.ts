import { useEffect, useState } from "react";

const useCheckMobileScreen = (): boolean => {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const handleWindowSizeChange = (): void => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleWindowSizeChange();

    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  return isMobile;
};

export default useCheckMobileScreen;
