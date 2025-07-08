"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

function Header() {
  const pathname = usePathname();

  return (
    <div className="w-full bg-white border-b">
      <div className="w-full flex justify-between">
        <Link
          href="/"
          className={`flex-1 w-full text-center py-2.5 font-medium transition-colors relative
            ${
              pathname === "/"
                ? "text-blue-600 after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-blue-500"
                : "text-gray-600 hover:text-gray-900"
            }`}
        >
          장소
        </Link>
        <Link
          href="/list"
          className={`flex-1 w-full text-center py-2.5 font-medium transition-colors relative
            ${
              pathname === "/list"
                ? "text-blue-600 after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-blue-500"
                : "text-gray-600 hover:text-gray-900"
            }`}
        >
          리스트
        </Link>
      </div>
    </div>
  );
}

export default Header;
