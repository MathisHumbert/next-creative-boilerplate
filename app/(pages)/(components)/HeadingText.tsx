import type { HeadingText as HeadingTextType } from "@/sanity/sanity.types";

export function HeadingText(data: HeadingTextType) {
  if (!data) return null;

  const { heading, subtitle, text } = data;

  return (
    <section className="heading__text">
      <h2 className="heading">{heading}</h2>
      <div>
        <h4 className="text-l">{subtitle}</h4>
        <p className="text-s">{text}</p>
      </div>
    </section>
  );
}
