"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Dashboard" },
  { href: "/new", label: "New Meeting" },
  { href: "/actions", label: "Actions" },
  { href: "/settings", label: "Settings" },
];

export default function Nav() {
  const pathname = usePathname();

  return (
    <header className="border-b border-zinc-200 bg-white">
      <div className="mx-auto flex min-h-16 w-full max-w-6xl items-center justify-between gap-6 px-6">
        <Link
          href="/"
          className="text-xl font-semibold tracking-tight text-zinc-950"
        >
          Briefly
        </Link>

        <nav className="flex items-center gap-1 overflow-x-auto">
          {links.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`whitespace-nowrap rounded-lg px-3 py-2 text-sm font-medium transition ${
                  isActive
                    ? "bg-zinc-100 text-zinc-950"
                    : "text-zinc-600 hover:bg-zinc-50 hover:text-zinc-950"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}