"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useSearchStore } from "@/store";

function SearchInput() {
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    searchPlaces();
  };

  return (
    <form onSubmit={handleSubmit} className="w-full flex gap-2">
      <Input
        placeholder="검색어를 입력하세요"
        value={searchKeyword}
        onChange={(e) => setSearchKeyword(e.target.value)}
      />
      <Button type="submit" variant="outline">
        검색
      </Button>
    </form>
  );
}

export default SearchInput;
