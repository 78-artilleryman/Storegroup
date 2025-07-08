"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useSearchStore } from "@/store";

function Header() {
  const [searchKeyword, setSearchKeyword] = useState("");
  const setPlaces = useSearchStore((state) => state.setPlaces);

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
    <div className="w-full p-4 bg-white border-b">
      <div className="flex gap-3 items-center flex-col">
        {/* 인풋 영역 - 50% */}
        <div className="w-full">
          <Input
            placeholder="검색어를 입력하세요"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            onKeyPress={handleSearch}
          />
        </div>

        {/* 버튼 영역 - 50% */}
        <div className="flex-1 flex gap-2">
          <Button className="flex-1" variant="ghost" onClick={searchPlaces}>
            장소
          </Button>
          <Button className="flex-1" variant="ghost">
            리스트
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Header;
