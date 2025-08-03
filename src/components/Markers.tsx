import { ClusterPlace } from "@/store";
import { useCallback, useEffect, useRef } from "react";

interface MarkersProps {
  map: any;
  places: ClusterPlace[];
  selectedGroup: string | null;
  groupingResult: any;
  groupColors: string[];
  onPlaceClick: (
    // eslint-disable-next-line no-unused-vars
    place: ClusterPlace,
    // eslint-disable-next-line no-unused-vars
    groupNumber: number,
    // eslint-disable-next-line no-unused-vars
    color: string
  ) => void;
}

function Markers({
  map,
  places,
  selectedGroup,
  groupingResult,
  groupColors,
  onPlaceClick,
}: MarkersProps) {
  const markersRef = useRef<any[]>([]);
  const hasSetInitialBoundsRef = useRef<boolean>(false);

  // 커스텀 마커 HTML 생성
  const createCustomMarkerContent = (
    groupNumber: number,
    color: string,
    placeId: string
  ) => {
    return `
      <div onclick="window.handleMarkerClick('${placeId}')" style="
        position: relative;
        width: 32px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
      ">
        <div style="
          width: 32px;
          height: 32px;
          background-color: ${color};
          border: 3px solid white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          font-size: 14px;
          color: white;
          text-shadow: 1px 1px 2px rgba(0,0,0,0.5);
          box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        ">${groupNumber}</div>
        <div style="
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 0;
          height: 0;
          border-left: 6px solid transparent;
          border-right: 6px solid transparent;
          border-top: 8px solid ${color};
        "></div>
      </div>
    `;
  };

  const clearMarkers = useCallback(() => {
    markersRef.current.forEach((marker) => marker.setMap(null));
    markersRef.current = [];
  }, []);

  // 그룹 변경 시 bounds 조정 허용
  useEffect(() => {
    hasSetInitialBoundsRef.current = false;
  }, [selectedGroup]);

  // 지도 사용자 상호작용 감지
  useEffect(() => {
    if (!map) return;

    const handleMapInteraction = () => {
      hasSetInitialBoundsRef.current = true;
    };

    // 지도 이벤트 리스너 등록
    window.kakao.maps.event.addListener(
      map,
      "zoom_changed",
      handleMapInteraction
    );
    window.kakao.maps.event.addListener(
      map,
      "center_changed",
      handleMapInteraction
    );
    window.kakao.maps.event.addListener(map, "dragend", handleMapInteraction);

    return () => {
      // 컴포넌트 언마운트 시 이벤트 리스너 제거
      window.kakao.maps.event.removeListener(
        map,
        "zoom_changed",
        handleMapInteraction
      );
      window.kakao.maps.event.removeListener(
        map,
        "center_changed",
        handleMapInteraction
      );
      window.kakao.maps.event.removeListener(
        map,
        "dragend",
        handleMapInteraction
      );
    };
  }, [map]);

  const displayGroupMarkers = useCallback(() => {
    if (!map || places.length === 0) return;

    clearMarkers();

    const bounds = new window.kakao.maps.LatLngBounds();

    // 전역 클릭 핸들러 맵 생성
    const clickHandlers: {
      [key: string]: {
        place: ClusterPlace;
        groupNumber: number;
        color: string;
      };
    } = {};

    places.forEach((place, index) => {
      const position = new window.kakao.maps.LatLng(
        place.latitude,
        place.longitude
      );

      // 그룹 번호와 색상 결정
      let groupNumber = 1;
      let color = groupColors[0];

      if (selectedGroup && selectedGroup !== "all") {
        // 개별 그룹 선택 시
        const groupIndex =
          parseInt(selectedGroup.replace("clustering", "")) - 1;
        groupNumber = groupIndex + 1;
        color = groupColors[groupIndex % groupColors.length];
      } else if (selectedGroup === "all" && groupingResult) {
        // 전체보기일 때 각 장소가 어느 그룹에 속하는지 찾기
        const groups = Object.keys(groupingResult.result);
        for (let i = 0; i < groups.length; i++) {
          const groupPlaces = groupingResult.result[groups[i]];
          if (
            groupPlaces.some(
              (p: ClusterPlace) =>
                p.name === place.name && p.address === place.address
            )
          ) {
            const groupIndex =
              parseInt(groups[i].replace("clustering", "")) - 1;
            groupNumber = groupIndex + 1;
            color = groupColors[groupIndex % groupColors.length];
            break;
          }
        }
      }

      // 고유 ID 생성
      const placeId = `marker_${index}_${Date.now()}`;

      // 클릭 핸들러 저장
      clickHandlers[placeId] = { place, groupNumber, color };

      // 커스텀 마커 생성
      const customOverlay = new window.kakao.maps.CustomOverlay({
        position: position,
        content: createCustomMarkerContent(groupNumber, color, placeId),
        yAnchor: 1,
        clickable: true,
      });

      customOverlay.setMap(map);
      markersRef.current.push(customOverlay);
      bounds.extend(position);
    });

    // 전역 클릭 핸들러 함수 등록
    (window as any).handleMarkerClick = (placeId: string) => {
      const handler = clickHandlers[placeId];
      if (handler) {
        onPlaceClick(handler.place, handler.groupNumber, handler.color);
      }
    };

    // 사용자가 지도를 조작하지 않은 경우에만 지도 범위 조정
    if (places.length > 0 && !hasSetInitialBoundsRef.current) {
      map.setBounds(bounds);
    }
  }, [
    map,
    places,
    selectedGroup,
    groupingResult,
    groupColors,
    onPlaceClick,
    clearMarkers,
  ]);

  useEffect(() => {
    displayGroupMarkers();
  }, [displayGroupMarkers]);

  return null;
}

export default Markers;
