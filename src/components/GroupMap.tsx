import { useState, useEffect, useRef } from "react";

import { useSearchStore, ClusterPlace } from "@/store";
import { Button } from "@/components/ui/button";
import PlaceDetailBox from "./PlaceDetailBox";
import Markers from "./Markers";
import { loadKakaoMapScript } from "@/utils/kakaoLoader";

declare global {
  interface Window {
    kakao: any;
  }
}

// 그룹별 색상 정의
const GROUP_COLORS = [
  "#FF6B6B", // 빨간색
  "#4ECDC4", // 청록색
  "#45B7D1", // 파란색
  "#96CEB4", // 연두색
  "#FFEAA7", // 노란색
  "#DDA0DD", // 보라색
  "#FFB347", // 주황색
  "#98D8C8", // 민트색
  "#F7DC6F", // 연한 노란색
  "#BB8FCE", // 연한 보라색
];

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

  const loadKakaoMap = () => {
    window.kakao.maps.load(() => {
      const mapContainer = document.getElementById("group-map");
      const mapOption = {
        center: new window.kakao.maps.LatLng(37.497625203, 127.03088379),
        level: 4,
      };
      const map = new window.kakao.maps.Map(mapContainer, mapOption);
      mapRef.current = map;
      setIsMapLoaded(true);
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
              className="text-xs"
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
                  className="text-xs flex items-center gap-1"
                  style={{
                    backgroundColor:
                      selectedGroup === groupKey ? color : undefined,
                    borderColor: color,
                    color: selectedGroup === groupKey ? "white" : color,
                  }}
                >
                  <span
                    className="w-4 h-4 rounded-full text-white text-xs font-bold flex items-center justify-center"
                    style={{ backgroundColor: color }}
                  >
                    {groupIndex + 1}
                  </span>
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
