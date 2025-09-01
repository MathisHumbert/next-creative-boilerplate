import React from "react";

import type { Hero as HeroType } from "@/sanity/sanity.types";
import { TextReveal } from "../(animations)/TextReveal";

export function Hero(data: HeroType) {
  if (!data) return null;

  const { subtitle, titleLeft, titleRight } = data;

  return (
    <section className="hero">
      {subtitle && (
        <p className="text-xs">
          {subtitle.split("\n").map((line, index) => (
            <React.Fragment key={index}>
              {line}
              {index < subtitle.split("\n").length - 1 && <br />}
            </React.Fragment>
          ))}
          <br />
        </p>
      )}
      <header>
        <h1 className="heading-l bold uppercase">
          <TextReveal delay={0.1} rotate={15}>
            <span>{titleLeft}</span>
          </TextReveal>
          <TextReveal delay={0.2} rotate={15}>
            <span>{titleRight}</span>
          </TextReveal>
        </h1>
      </header>
    </section>
  );
}
