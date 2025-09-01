"use client";

import { useStore } from "@/libs/store";
import Link from "next/link";

export function Navigation() {
  const { setIsMenuOpened } = useStore();

  return (
    <nav className="nav">
      <ul>
        <li>
          <Link href="/" scroll={false} className="text-xs uppercase">
            Home
          </Link>
        </li>
        <li>
          <Link href="/about" scroll={false} className="text-xs uppercase">
            About
          </Link>
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
