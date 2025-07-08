"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useSearchStore } from "@/store";
import Link from "next/link";
import { usePathname } from "next/navigation";

function Header() {
  const [searchKeyword, setSearchKeyword] = useState("");
  const setPlaces = useSearchStore((state) => state.setPlaces);
  const pathname = usePathname();

  const searchPlaces = async () => {
    if (!searchKeyword.trim()) return;

    try {
      const response = await fetch(
        `/api/search?query=${encodeURIComponent(searchKeyword)}`
      );
      const data = await response.json();

      if (data.error) {
        console.error("검색 오류:", data.error);
        return;
      }

      setPlaces(data.places);
    } catch (error) {
      console.error("장소 검색 중 오류가 발생했습니다:", error);
    }
  };

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      searchPlaces();
    }
  };

  return (
    <div className="w-full bg-white border-b">
      <div className="flex gap-3 items-center flex-col p-4 pb-0">
        {/* 인풋 영역 - 50% */}
        <div className="w-full flex gap-2">
          <Input
            placeholder="검색어를 입력하세요"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            onKeyDown={handleSearch}
          />
          <Button variant="outline" onClick={searchPlaces} className="">
            검색
          </Button>
        </div>

        {/* 버튼 영역 - 50% */}
        <div className="w-full flex-1 flex justify-between">
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
    </div>
  );
}

export default Header;
