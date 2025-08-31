"use client";

import { useSmooothy } from "@/hooks/useSmooothy";
import { SanityImage } from "@/components/sanity-image";

import type { Slider as SliderType } from "@/sanity/sanity.types";

export function Slider(data: SliderType) {
  const { ref } = useSmooothy({
    infinite: true,
    snap: true,
  });

  if (!data) return null;

  const { images } = data;

  return (
    <section className="slider">
      <h2 className="text-xs uppercase">Slider</h2>
      <div className="slider__wrapper">
        <div className="slider__inner" ref={ref}>
          {images &&
            images.map((item, index) => (
              <div className="slider__item" key={index}>
                <figure>
                  {item.image?.asset && (
                    <SanityImage
                      image={item.image}
                      alt={item.alt || ""}
                      sizes="33vw"
                    />
                  )}
                </figure>
                <p className="text-xs uppercase">Lorem.</p>
                <p className="text-s">
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Culpa iure voluptatibus iusto? Vitae, asperiores.
                </p>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}
