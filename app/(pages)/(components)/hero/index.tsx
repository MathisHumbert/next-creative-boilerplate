import type { Hero as HeroType } from "@/sanity/sanity.types";
import React from "react";

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
        <h1 className="heading-l bold uppercase" aria-label="Home Page">
          <span>{titleLeft}</span>
          <span>{titleRight}</span>
        </h1>
      </header>
    </section>
  );
}
