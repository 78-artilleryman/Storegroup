import React, { useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useSearchStore } from "@/store";
import { searchPlacesByKeyword } from "@/services/kakaoApi";

function SearchInput() {
  const [searchKeyword, setSearchKeyword] = useState("");
  const setPlaces = useSearchStore((state) => state.setPlaces);
  const inputRef = useRef<HTMLInputElement>(null);

  const searchPlaces = async () => {
    if (!searchKeyword.trim()) return;

    try {
      const places = await searchPlacesByKeyword(searchKeyword);
      setPlaces(places);
    } catch (error) {
      console.error("장소 검색 중 오류가 발생했습니다:", error);

      if (error instanceof Error) {
        if (error.message === "카카오 REST API 키가 설정되지 않았습니다.") {
          alert("카카오 API 키가 설정되지 않았습니다.");
        } else {
          alert(
            "장소 검색 중 오류가 발생했습니다. CORS 정책으로 인해 카카오 API 직접 호출이 제한될 수 있습니다."
          );
        }
      }
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
    <form onSubmit={handleSubmit} className="w-full flex items-center gap-2">
      <Input
        ref={inputRef}
        placeholder="검색어를 입력하세요"
        value={searchKeyword}
        onChange={(e) => setSearchKeyword(e.target.value)}
        className="flex-1"
      />
      <Button
        type="submit"
        variant="default"
        size="default"
        className="shrink-0 px-4"
      >
        검색
      </Button>
    </form>
  );
}

export default SearchInput;
