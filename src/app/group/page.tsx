"use client";

import React, { useState, useEffect, useRef } from "react";
import Script from "next/script";
import { useSearchStore, ClusterPlace } from "@/store";
import { Button } from "@/components/ui/button";

declare global {
  interface Window {
    kakao: any;
  }
}

function GroupPage() {
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const mapRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);
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

  const clearMarkers = () => {
    markersRef.current.forEach((marker) => marker.setMap(null));
    markersRef.current = [];
  };

  const displayGroupMarkers = (places: ClusterPlace[]) => {
    if (!mapRef.current) return;

    clearMarkers();

    if (places.length === 0) return;

    const bounds = new window.kakao.maps.LatLngBounds();

    places.forEach((place) => {
      const position = new window.kakao.maps.LatLng(
        place.latitude,
        place.longitude
      );

      const marker = new window.kakao.maps.Marker({
        position: position,
        map: mapRef.current,
      });

      // 마커에 클릭 이벤트 추가
      const infowindow = new window.kakao.maps.InfoWindow({
        content: `<div style="padding:8px;font-size:12px;white-space:nowrap;">
          <strong>${place.name}</strong><br/>
          <span style="color:#666;">${place.address}</span>
        </div>`,
      });

      window.kakao.maps.event.addListener(marker, "click", function () {
        infowindow.open(mapRef.current, marker);
      });

      window.kakao.maps.event.addListener(marker, "mouseout", function () {
        infowindow.close();
      });

      markersRef.current.push(marker);
      bounds.extend(position);
    });

    // 모든 마커가 보이도록 지도 범위 조정
    if (places.length > 0) {
      mapRef.current.setBounds(bounds);
    }
  };

  const handleGroupSelect = (groupKey: string) => {
    setSelectedGroup(groupKey);
    if (groupingResult && groupingResult.result[groupKey]) {
      displayGroupMarkers(groupingResult.result[groupKey]);
    }
  };

  const showAllMarkers = () => {
    if (!groupingResult) return;

    const allPlaces: ClusterPlace[] = [];
    Object.values(groupingResult.result).forEach((places) => {
      allPlaces.push(...places);
    });

    setSelectedGroup("all");
    displayGroupMarkers(allPlaces);
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
      <main className="min-h-[calc(100vh-120px)] bg-gray-50 pt-4">
        <div className="flex flex-col items-center justify-center py-12 text-center px-4">
          <p className="text-gray-500">그룹화된 장소가 없습니다.</p>
          <p className="text-sm text-gray-400 mt-2">
            장소 검색 후 그룹화 해주세요.
          </p>
        </div>
      </main>
    );
  }

  const groups = Object.keys(groupingResult.result);

  return (
    <>
      <Script
        strategy="afterInteractive"
        type="text/javascript"
        src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_CLIENT}&autoload=false`}
        onReady={loadKakaoMap}
      />
      <main className="min-h-[calc(100vh-120px)] bg-gray-50">
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
              {groups.map((groupKey) => (
                <Button
                  key={groupKey}
                  variant={selectedGroup === groupKey ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleGroupSelect(groupKey)}
                  className="text-xs"
                >
                  {groupKey.replace("clustering", "그룹 ")} (
                  {groupingResult.result[groupKey].length}개)
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* 지도 영역 */}
        <div id="group-map" className="w-full h-[calc(100vh-200px)]" />

        {/* 선택된 그룹의 장소 목록 */}
        {selectedGroup && selectedGroup !== "all" && (
          <div className="bg-white border-t border-gray-200 p-4 max-h-40 overflow-y-auto">
            <div className="max-w-[420px] mx-auto">
              <h3 className="font-semibold text-sm mb-2">
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
      </main>
    </>
  );
}

export default GroupPage;
