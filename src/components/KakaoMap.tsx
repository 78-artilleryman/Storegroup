"use client";

import React, { useEffect, useRef } from "react";
import Script from "next/script";
import StoreListBottomSheet from "./StoreListBottomSheet";
import { useSearchStore } from "@/store";

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

  const loadKakaoMap = () => {
    window.kakao.maps.load(() => {
      const mapContainer = document.getElementById("map");
      const mapOption = {
        center: new window.kakao.maps.LatLng(lat, lng),
        level: zoom,
      };
      const map = new window.kakao.maps.Map(mapContainer, mapOption);
      mapRef.current = map;
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

      // 마커에 클릭 이벤트 추가
      const infowindow = new window.kakao.maps.InfoWindow({
        content: `<div style="padding:5px;font-size:12px;">${place.place_name}</div>`,
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

  useEffect(() => {
    if (mapRef.current) {
      displayMarkers();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [places]);

  return (
    <>
      <Script
        strategy="afterInteractive"
        type="text/javascript"
        src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_CLIENT}&autoload=false`}
        onReady={loadKakaoMap}
      />
      <div id="map" className="w-full h-[calc(100vh-120px)]" />
      <StoreListBottomSheet />
    </>
  );
}

export default KakaoMap;
