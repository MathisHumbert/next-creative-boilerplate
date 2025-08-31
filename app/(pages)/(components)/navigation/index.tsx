import Link from "next/link";

export function Navigation() {
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
      </ul>
    </nav>
  );
}
