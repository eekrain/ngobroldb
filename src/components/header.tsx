"use client";
import { usePathname } from "next/navigation";
import React from "react";

type Props = {};

export const Header = (props: Props) => {
  const pathname = usePathname();

  return (
    <header className="border-b shadow-lg py-4">
      <nav className="container flex items-center justify-between">
        <div className="flex gap-2 items-center">
          <img src="/logo.svg" alt="logo" className="size-8" />
          <h3 className="font-bold text-xl font-title">NgobrolDB</h3>
        </div>

        <ul className="flex gap-4">
          <li>
            <a
              href="#"
              className={`font-medium font-title hover:text-blue-600 ${
                pathname === "/" ? "text-blue-600" : ""
              }`}
            >
              Chat
            </a>
          </li>
          <li>
            <a
              href="#"
              className={`font-medium font-title hover:text-blue-600 ${
                pathname === "/browse" ? "text-blue-600" : ""
              }`}
            >
              Browse
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};
