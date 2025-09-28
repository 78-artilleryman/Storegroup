import { useState, useEffect, useRef } from "react";

import { useSearchStore, ClusterPlace } from "@/store";
import { Button } from "@/components/ui/button";
import PlaceDetailBox from "./PlaceDetailBox";
import Markers from "./Markers";
import { loadKakaoMapScript } from "@/utils/kakaoLoader";
import { Storage } from "@apps-in-toss/web-framework";
import { getGroupingResult } from "@/services/groupingApi";

declare global {
  interface Window {
    kakao: any;
  }
}

// 그룹별 색상 정의
const GROUP_COLORS = [
  "#F04452", // 빨간색
  "#3182F6", // 청록색
  "#FE9800", // 파란색
  "#FFC342", // 연두색
  "#03B26C", // 노란색
  "#18A5A5", // 보라색
  "#A234C7", // 주황색
  "#98D8C8", // 민트색
  "#F7DC6F", // 연한 노란색
  "#BB8FCE", // 연한 보라색
];

// const GROUP_COLORS_2 = [
//   "#FFB3B3", // 연한 빨간색
//   "#7EDDD6", // 연한 청록색
//   "#FFD699", // 연한 주황색
//   "#FFF2B3", // 연한 노란색
//   "#B8E6B8", // 연한 연두색
//   "#B8E6D6", // 연한 민트색
//   "#E6B3E6", // 연한 보라색
//   "#D6B3E6", // 연한 라벤더
//   "#F9E6B3", // 연한 베이지
//   "#E6D6B3", // 연한 크림
// ];

function GroupMap() {
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState<ClusterPlace | null>(null);
  const [selectedPlaceGroup, setSelectedPlaceGroup] = useState<{
    number: number;
    color: string;
  }>({ number: 1, color: GROUP_COLORS[0] });
  const [currentPlaces, setCurrentPlaces] = useState<ClusterPlace[]>([]);
  const mapRef = useRef<any>(null);
  const groupingResult = useSearchStore((state) => state.groupingResult);
  const setGroupingResult = useSearchStore((state) => state.setGroupingResult);

  const getGroupingResultApi = async () => {
    const accessToken = await Storage.getItem("accessToken");
    if (!accessToken) {
      throw new Error("accessToken이 없습니다.");
    }
    const result = await getGroupingResult(accessToken);
    console.log("그룹화 API 응답:", result);
    setGroupingResult(result);
  };

  const loadKakaoMap = () => {
    window.kakao.maps.load(() => {
      const mapContainer = document.getElementById("group-map");
      if (!mapContainer) {
        console.error("지도 컨테이너를 찾을 수 없습니다.");
        return;
      }

      const mapOption = {
        center: new window.kakao.maps.LatLng(37.497625203, 127.03088379),
        level: 4,
      };
      const map = new window.kakao.maps.Map(mapContainer, mapOption);
      mapRef.current = map;

      // 지도가 완전히 로드된 후 상태 업데이트
      window.kakao.maps.event.addListener(map, "tilesloaded", () => {
        console.log("카카오맵 타일 로딩 완료");
        setIsMapLoaded(true);
      });
    });
  };

  const handlePlaceClick = (
    place: ClusterPlace,
    groupNumber: number,
    color: string
  ) => {
    setSelectedPlace(place);
    setSelectedPlaceGroup({ number: groupNumber, color: color });
  };

  const handleGroupSelect = (groupKey: string) => {
    setSelectedGroup(groupKey);
    if (groupingResult && groupingResult.result[groupKey]) {
      setCurrentPlaces(groupingResult.result[groupKey]);
    }
  };

  const showAllMarkers = () => {
    if (!groupingResult) return;

    const allPlaces: ClusterPlace[] = [];
    Object.values(groupingResult.result).forEach((places) => {
      allPlaces.push(...places);
    });

    setSelectedGroup("all");
    setCurrentPlaces(allPlaces);
  };

  useEffect(() => {
    const initializeMap = async () => {
      try {
        console.log("그룹맵 카카오맵 스크립트 로딩 시작...");
        await loadKakaoMapScript();
        console.log("그룹맵 카카오맵 스크립트 로드 완료, 맵 초기화 시작");
        loadKakaoMap();
      } catch (error) {
        console.error("그룹맵 카카오맵 초기화 실패:", error);
      }
    };

    initializeMap();
  }, []);

  useEffect(() => {
    if (!groupingResult) {
      getGroupingResultApi();
    }
  }, [groupingResult]);

  useEffect(() => {
    // 컴포넌트가 마운트되고 지도가 로드되면 모든 마커 표시
    if (isMapLoaded && groupingResult) {
      showAllMarkers();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMapLoaded, groupingResult]);

  if (!groupingResult) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center px-4">
        <p className="text-gray-500">그룹화된 장소가 없습니다.</p>
        <p className="text-sm text-gray-400 mt-2">
          장소 검색 후 그룹화 해주세요.
        </p>
      </div>
    );
  }

  const groups = Object.keys(groupingResult.result);

  return (
    <>
      {/* 그룹 선택 버튼들 */}
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="max-w-[420px] mx-auto">
          <h1 className="text-lg font-bold mb-3">그룹화 결과</h1>
          <div className="flex flex-wrap gap-2">
            <Button
              variant={selectedGroup === "all" ? "default" : "outline"}
              size="sm"
              onClick={showAllMarkers}
              className={`text-xs border-[#4E5968] ${
                selectedGroup === "all" ? "!bg-[#4E5968]" : ""
              }`}
            >
              전체보기
            </Button>
            {groups.map((groupKey) => {
              const groupIndex =
                parseInt(groupKey.replace("clustering", "")) - 1;
              const color = GROUP_COLORS[groupIndex % GROUP_COLORS.length];
              return (
                <Button
                  key={groupKey}
                  variant={selectedGroup === groupKey ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleGroupSelect(groupKey)}
                  className="text-xs flex items-center"
                  style={{
                    backgroundColor:
                      selectedGroup === groupKey ? color : undefined,
                    borderColor: color,
                    color: selectedGroup === groupKey ? "white" : color,
                  }}
                >
                  그룹 {groupIndex + 1} (
                  {groupingResult.result[groupKey].length}개)
                </Button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 지도 영역 */}
      <div id="group-map" className="w-full h-[calc(100vh-200px)]" />

      {/* 마커 컴포넌트 */}
      {isMapLoaded && (
        <Markers
          map={mapRef.current}
          places={currentPlaces}
          selectedGroup={selectedGroup}
          groupingResult={groupingResult}
          groupColors={GROUP_COLORS}
          onPlaceClick={handlePlaceClick}
        />
      )}

      {/* 선택된 그룹의 장소 목록 */}
      {selectedGroup && selectedGroup !== "all" && (
        <div className="bg-white border-t border-gray-200 p-4 max-h-40 overflow-y-auto">
          <div className="max-w-[420px] mx-auto">
            <h3 className="font-semibold text-sm mb-2 flex items-center gap-2">
              <span
                className="w-5 h-5 rounded-full text-white text-xs font-bold flex items-center justify-center"
                style={{
                  backgroundColor:
                    GROUP_COLORS[
                      (parseInt(selectedGroup.replace("clustering", "")) - 1) %
                        GROUP_COLORS.length
                    ],
                }}
              >
                {parseInt(selectedGroup.replace("clustering", ""))}
              </span>
              {selectedGroup.replace("clustering", "그룹 ")} 장소 목록
            </h3>
            <div className="space-y-1">
              {groupingResult.result[selectedGroup].map((place, index) => (
                <div key={index} className="text-xs text-gray-600">
                  <span className="font-medium">{place.name}</span>
                  <span className="ml-2 text-gray-500">{place.address}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 장소 상세 정보 박스 */}
      <PlaceDetailBox
        place={selectedPlace}
        groupNumber={selectedPlaceGroup.number}
        color={selectedPlaceGroup.color}
        onClose={() => setSelectedPlace(null)}
      />
    </>
  );
}

export default GroupMap;
