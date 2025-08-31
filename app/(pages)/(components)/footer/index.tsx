import Link from "next/link";
import type { PageSettings } from "@/sanity/sanity.types";

interface FooterProps {
  nextPage?: PageSettings["footerPage"];
}

export function Footer({ nextPage }: FooterProps) {
  const getHref = () => {
    if (!nextPage?._ref) return "/";
    return nextPage._ref === "home" ? "/" : `/${nextPage._ref}`;
  };

  const getLabel = () => {
    if (!nextPage?._ref) return "Home";
    return nextPage._ref === "home" ? "Home" : "About";
  };

  return (
    <footer className="footer">
      <p className="text-xs uppercase">Next Page</p>
      <Link href={getHref()} scroll={false} className="text-xs uppercase">
        {getLabel()}
      </Link>
    </footer>
  );
}
