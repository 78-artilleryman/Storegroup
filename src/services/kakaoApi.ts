export interface Place {
  place_name: string;
  address_name: string;
  road_address_name: string;
  x: string;
  y: string;
}

export const searchPlacesByKeyword = async (
  keyword: string
): Promise<Place[]> => {
  if (!keyword.trim()) {
    throw new Error("검색어를 입력해주세요.");
  }

  const KAKAO_REST_API_KEY = import.meta.env.VITE_KAKAO_REST_API_KEY;

  if (!KAKAO_REST_API_KEY) {
    throw new Error("카카오 REST API 키가 설정되지 않았습니다.");
  }

  try {
    // 키워드로 장소 검색
    const placeResponse = await fetch(
      `https://dapi.kakao.com/v2/local/search/keyword.json?query=${encodeURIComponent(
        keyword
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

    // 검색 결과 데이터 가공
    const places: Place[] = placeData.documents.map((place: any) => ({
      place_name: place.place_name,
      address_name: place.address_name,
      road_address_name: place.road_address_name,
      x: place.x,
      y: place.y,
    }));

    return places;
  } catch (error) {
    console.error("장소 검색 중 오류가 발생했습니다:", error);
    throw error;
  }
};
