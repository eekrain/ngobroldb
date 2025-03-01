"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

type Props = {};

export const Header = (props: Props) => {
  const pathname = usePathname();

  return (
    <header className="border-b shadow-lg py-4">
      <nav className="container flex items-center justify-between">
        <Link href="/" className="flex gap-2 items-center">
          <img src="/logo.svg" alt="logo" className="size-8" />
          <h3 className="font-bold text-xl font-title text-primary">
            NgobrolDB
          </h3>
        </Link>

        <ul className="flex gap-4">
          <li>
            <Link
              href="/"
              className={`font-medium font-title hover:text-primary ${
                pathname === "/" ? "text-primary" : ""
              }`}
            >
              Chat
            </Link>
          </li>
          <li>
            <Link
              href="/browse"
              className={`font-medium font-title hover:text-primary ${
                pathname === "/browse" ? "text-primary" : ""
              }`}
            >
              Browse
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};
