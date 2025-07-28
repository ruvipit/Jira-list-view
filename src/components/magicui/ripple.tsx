import React, { useEffect, useRef } from "react";

export interface RippleProps {
  color?: string;
  duration?: number;
  className?: string;
}

export const Ripple: React.FC<RippleProps> = ({ color = "#3b82f6", duration = 400, className }) => {
  const rippleRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (rippleRef.current) {
      rippleRef.current.classList.add("magicui-ripple-animate");
      const timeout = setTimeout(() => {
        rippleRef.current?.classList.remove("magicui-ripple-animate");
      }, duration);
      return () => clearTimeout(timeout);
    }
  }, [duration]);

  return (
    <span
      ref={rippleRef}
      className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none magicui-ripple ${className || ""}`}
      style={{
        width: "180%",
        height: "180%",
        background: color,
        opacity: 0.3,
        borderRadius: "9999px",
      }}
    />
  );
};

// Add this to your global CSS (e.g. src/index.css):
/*
.magicui-ripple {
  transform: scale(0);
  transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.4s cubic-bezier(0.22, 1, 0.36, 1);
  opacity: 0.3;
}
.magicui-ripple-animate {
  transform: scale(1.2);
  opacity: 0;
}
*/
