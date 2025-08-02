import type { Place, GroupingResponse } from "@/store";

export interface GroupingRequest {
  group: number;
  place: {
    name: string;
    address: string;
    latitude: number;
    longitude: number;
  }[];
  option: number;
}

export const performGrouping = async (
  selectedPlaces: Place[],
  groupCount: number,
  balance: number
): Promise<GroupingResponse> => {
  if (selectedPlaces.length < groupCount) {
    throw new Error(
      `그룹화하려면 그룹 수(${groupCount}개)보다 많은 장소를 선택해주세요.`
    );
  }

  const baseUrl = import.meta.env.VITE_BASE_URL;

  if (!baseUrl) {
    throw new Error("VITE_BASE_URL 환경변수가 설정되지 않았습니다.");
  }

  // 선택된 장소들을 요청 형식에 맞게 변환
  const requestData: GroupingRequest = {
    group: groupCount,
    place: selectedPlaces.map((place) => ({
      name: place.place_name,
      address: place.road_address_name || place.address_name,
      latitude: parseFloat(place.y),
      longitude: parseFloat(place.x),
    })),
    option: balance,
  };

  const apiUrl = `${baseUrl}/cluster`;

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("서버 에러 응답:", errorText);
      throw new Error(
        `HTTP error! status: ${response.status}, message: ${errorText}`
      );
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("그룹화 요청 중 오류가 발생했습니다:", error);
    throw error;
  }
};
