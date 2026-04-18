import React, { useState, useEffect } from "react";
import RetiroLocalMobile from "./retiroLocalMobile";

interface RetiroLocalProps {
  children?: React.ReactNode;
}

export default function RetiroLocal({ children }: RetiroLocalProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkBreakpoint = () => setIsMobile(window.innerWidth <= 768);
    checkBreakpoint();
    window.addEventListener("resize", checkBreakpoint);
    return () => window.removeEventListener("resize", checkBreakpoint);
  }, []);

  return (
    <>
      {isMobile ? (
        <RetiroLocalMobile>{children}</RetiroLocalMobile>
      ) : (
        <RetiroLocalMobile>{children}</RetiroLocalMobile>
      )}
    </>
  );
}
