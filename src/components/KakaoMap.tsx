import { useEffect, useRef, useState } from "react";
import StoreListBottomSheet from "./StoreListBottomSheet";
import { useSearchStore } from "@/store";
import { loadKakaoMapScript } from "@/utils/kakaoLoader";

interface MapProps {
  lat?: string | null;
  lng?: string | null;
  zoom?: number;
}

declare global {
  interface Window {
    kakao: any;
  }
}

function KakaoMap({
  lat = "37.497625203",
  lng = "127.03088379",
  zoom = 4,
}: MapProps) {
  const mapRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);
  const places = useSearchStore((state) => state.places);
  const [, setIsMapReady] = useState(false);

  const loadKakaoMap = () => {
    window.kakao.maps.load(() => {
      const mapContainer = document.getElementById("map");
      const mapOption = {
        center: new window.kakao.maps.LatLng(lat, lng),
        level: zoom,
      };
      const map = new window.kakao.maps.Map(mapContainer, mapOption);
      mapRef.current = map;
      setIsMapReady(true);

      // 맵이 완전히 준비된 후 기존 places가 있으면 마커 표시
      setTimeout(() => {
        if (places.length > 0) {
          displayMarkers();
        }
      }, 100);
    });
  };

  const clearMarkers = () => {
    markersRef.current.forEach((marker) => marker.setMap(null));
    markersRef.current = [];
  };

  const displayMarkers = () => {
    if (!mapRef.current) return;

    clearMarkers();

    if (places.length === 0) return;

    const bounds = new window.kakao.maps.LatLngBounds();

    places.forEach((place) => {
      const position = new window.kakao.maps.LatLng(place.y, place.x);

      const marker = new window.kakao.maps.Marker({
        position: position,
        map: mapRef.current,
      });

      markersRef.current.push(marker);
      bounds.extend(position);
    });

    // 모든 마커가 보이도록 지도 범위 조정
    if (places.length > 0) {
      mapRef.current.setBounds(bounds);
    }
  };

  useEffect(() => {
    if (mapRef.current) {
      displayMarkers();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [places]);

  useEffect(() => {
    const initializeMap = async () => {
      try {
        console.log("카카오맵 스크립트 로딩 시작...");
        await loadKakaoMapScript();
        console.log("카카오맵 스크립트 로드 완료, 맵 초기화 시작");
        loadKakaoMap();
        setIsMapReady(true);
      } catch (error) {
        console.error("카카오맵 초기화 실패:", error);
      }
    };

    initializeMap();
  }, []);

  return (
    <>
      <div id="map" className="w-full h-[calc(100vh-120px)]" />
      <StoreListBottomSheet />
    </>
  );
}

export default KakaoMap;
