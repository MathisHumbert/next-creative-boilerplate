"use client";

import dynamic from "next/dynamic";

const GSAP = dynamic(() => import("./index").then((m) => m.GSAP), {
  ssr: false,
});

export function GSAPRuntime() {
  return (
    <>
      <GSAP />
    </>
  );
}
