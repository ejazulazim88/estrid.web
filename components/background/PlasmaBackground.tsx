"use client";

import dynamic from "next/dynamic";

// WebGL can't render on the server — load the canvas client-side only
const Plasma = dynamic(() => import("./Plasma"), { ssr: false });

/** Fixed plasma that lives behind the entire page */
export default function PlasmaBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Plasma
        color="#DC2626"
        speed={0.5}
        direction="forward"
        scale={1.1}
        opacity={0.85}
        mouseInteractive={false}
      />
    </div>
  );
}
