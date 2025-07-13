"use client";

import React, { useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useSearchStore } from "@/store";

function SearchInput() {
  const [searchKeyword, setSearchKeyword] = useState("");
  const setPlaces = useSearchStore((state) => state.setPlaces);
  const inputRef = useRef<HTMLInputElement>(null);

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
    // 검색 시도 후 키보드 숨기기
    if (inputRef.current) {
      inputRef.current.blur();
    }
    searchPlaces();
  };

  return (
    <form onSubmit={handleSubmit} className="w-full flex gap-2">
      <Input
        ref={inputRef}
        placeholder="검색어를 입력하세요"
        value={searchKeyword}
        onChange={(e) => setSearchKeyword(e.target.value)}
      />
      <Button
        type="submit"
        variant="default"
        className="h-8 text-sm font-medium bg-blue-500 hover:bg-blue-600"
      >
        검색
      </Button>
    </form>
  );
}

export default SearchInput;
