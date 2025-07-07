"use client";

import React from "react";
import Script from "next/script";

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
  zoom = 3,
}: MapProps) {
  const loadKakaoMap = () => {
    window.kakao.maps.load(() => {
      const mapContainer = document.getElementById("map");
      const mapOption = {
        center: new window.kakao.maps.LatLng(lat, lng),
        level: zoom,
      };
      new window.kakao.maps.Map(mapContainer, mapOption);
    });
  };

  return (
    <>
      <Script
        strategy="afterInteractive"
        type="text/javascript"
        src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_CLIENT}&autoload=false`}
        onReady={loadKakaoMap}
      />
      <div id="map" className="w-full h-screen" />
    </>
  );
}

export default KakaoMap;
