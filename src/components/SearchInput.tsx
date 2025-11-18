import React, { useState, useRef, useEffect } from "react";
import { useSearchStore } from "@/store";
import { searchPlacesByKeyword } from "@/services/kakaoApi";
import { SearchField } from "@toss/tds-mobile";
import { Analytics } from "@apps-in-toss/web-framework";

function SearchInput() {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const setPlaces = useSearchStore((state) => state.setPlaces);
  const setIsBottomSheetOpen = useSearchStore(
    (state) => state.setIsBottomSheetOpen
  );
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const btn = document.getElementById("storelist_input");
    if (!btn) return;

    const handleClick = () => {
      Analytics.click({ button_name: "storelist_input" });
    };

    btn.addEventListener("click", handleClick);

    return () => {
      btn.removeEventListener("click", handleClick);
    };
  }, []);

  const searchPlaces = async () => {
    if (!searchKeyword.trim()) return;

    const startTime = Date.now();

    try {
      setIsLoading(true);
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
    } finally {
      // 최소 1초는 로딩 스피너를 보여주기
      const elapsedTime = Date.now() - startTime;
      const minLoadingTime = 1000; // 1초

      if (elapsedTime < minLoadingTime) {
        setTimeout(() => {
          setIsLoading(false);
          // 로딩이 완료된 후 바텀시트 열기
          setTimeout(() => {
            setIsBottomSheetOpen(true);
          }, 100); // 로딩 완료 후 100ms 후에 바텀시트 열기
        }, minLoadingTime - elapsedTime);
      } else {
        setIsLoading(false);
        // 로딩이 완료된 후 바텀시트 열기
        setTimeout(() => {
          setIsBottomSheetOpen(true);
        }, 100); // 로딩 완료 후 100ms 후에 바텀시트 열기
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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (inputRef.current) {
        inputRef.current.blur();
      }
      searchPlaces();
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // 일부 iOS/브라우저에서 keydown 대신 keypress로 Enter가 들어오는 경우 대응
    if (e.key === "Enter") {
      e.preventDefault();
      if (inputRef.current) {
        inputRef.current.blur();
      }
      searchPlaces();
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="w-full flex items-center gap-2">
        <SearchField
          id="storelist_input"
          ref={inputRef}
          placeholder="장소를 입력해 보세요"
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
          onKeyDown={handleKeyDown}
          onKeyPress={handleKeyPress}
          type="search"
          enterKeyHint="search"
          className="w-full"
          disabled={isLoading}
        />
        <button type="submit" className="hidden" aria-hidden="true" />
      </form>

      {/* 로딩 스피너 오버레이 */}
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 flex flex-col items-center space-y-4">
            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-sm text-gray-600">검색 중...</p>
          </div>
        </div>
      )}
    </>
  );
}

export default SearchInput;
