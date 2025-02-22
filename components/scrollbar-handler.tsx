"use client"

import { useEffect } from "react";

export default function ScrollbarHandler() {
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const isNearRight = window.innerWidth - event.clientX < 40;
      document.body.classList.toggle("show-scrollbar", isNearRight);
    };

    document.addEventListener("mousemove", handleMouseMove);
    return () => document.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return null;
}