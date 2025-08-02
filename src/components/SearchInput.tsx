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

    const KAKAO_REST_API_KEY = import.meta.env.VITE_KAKAO_REST_API_KEY;

    if (!KAKAO_REST_API_KEY) {
      console.error("카카오 REST API 키가 설정되지 않았습니다.");
      alert("카카오 API 키가 설정되지 않았습니다.");
      return;
    }

    try {
      // 1. 먼저 키워드로 장소 검색
      const placeResponse = await fetch(
        `https://dapi.kakao.com/v2/local/search/keyword.json?query=${encodeURIComponent(
          searchKeyword
        )}`,
        {
          headers: {
            Authorization: `KakaoAK ${KAKAO_REST_API_KEY}`,
          },
        }
      );

      if (!placeResponse.ok) {
        const errorData = await placeResponse.json();
        console.error("카카오 API 응답 오류:", errorData);
        throw new Error(`카카오 API 호출 실패: ${placeResponse.status}`);
      }

      const placeData = await placeResponse.json();

      // 2. 각 장소에 대해 이미지 검색 수행
      const placesWithImages = await Promise.all(
        placeData.documents.map(async (place: any) => {
          try {
            const imageResponse = await fetch(
              `https://dapi.kakao.com/v2/search/image?query=${encodeURIComponent(
                place.place_name + " " + place.address_name
              )}&size=1`,
              {
                headers: {
                  Authorization: `KakaoAK ${KAKAO_REST_API_KEY}`,
                },
              }
            );

            const imageData = await imageResponse.json();
            const thumbnail_url = imageData.documents[0]?.thumbnail_url;

            return {
              place_name: place.place_name,
              address_name: place.address_name,
              road_address_name: place.road_address_name,
              x: place.x,
              y: place.y,
              thumbnail_url: thumbnail_url || null,
            };
          } catch (error) {
            console.error("이미지 검색 중 오류:", error);
            return {
              place_name: place.place_name,
              address_name: place.address_name,
              road_address_name: place.road_address_name,
              x: place.x,
              y: place.y,
              thumbnail_url: null,
            };
          }
        })
      );

      setPlaces(placesWithImages);
    } catch (error) {
      console.error("장소 검색 중 오류가 발생했습니다:", error);
      alert(
        "장소 검색 중 오류가 발생했습니다. CORS 정책으로 인해 카카오 API 직접 호출이 제한될 수 있습니다."
      );
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
