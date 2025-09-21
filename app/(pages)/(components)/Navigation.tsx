"use client";

import { useStore } from "@/libs/store";
import { Link as TransitionLink } from "next-transition-router";

export function Navigation() {
  const { setIsMenuOpened } = useStore();

  return (
    <nav className="nav">
      <ul>
        <li>
          <TransitionLink href="/" scroll={false} className="text-xs uppercase">
            Home
          </TransitionLink>
        </li>
        <li>
          <TransitionLink
            href="/about"
            scroll={false}
            className="text-xs uppercase"
          >
            About
          </TransitionLink>
        </li>
        <li>
          <button
            className="text-xs uppercase"
            onClick={() => setIsMenuOpened(true)}
          >
            Menu
          </button>
        </li>
      </ul>
    </nav>
  );
}
