"use client";

import React from "react";
import { useSearchStore } from "@/store";
import Image from "next/image";
import { Button } from "./ui/button";

function SelectedPlaceList() {
  const selectedPlaces = useSearchStore((state) => state.selectedPlaces);
  const removeSelectedPlace = useSearchStore(
    (state) => state.removeSelectedPlace
  );

  if (selectedPlaces.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center px-4">
        <p className="text-gray-500">선택된 장소가 없습니다.</p>
        <p className="text-sm text-gray-400 mt-2">장소 검색 후 추가해주세요.</p>
      </div>
    );
  }

  return (
    <div className="max-w-[420px] mx-auto p-4">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-lg font-bold">
          선택된 장소 ({selectedPlaces.length}개)
        </h1>
        <Button variant="outline" size="sm" className="h-8 text-sm font-medium">
          그룹화
        </Button>
      </div>
      <ul className="space-y-2">
        {selectedPlaces.map((place, index) => (
          <li
            key={`${place.place_name}-${index}`}
            className="flex gap-3 p-3 bg-white rounded-lg border border-gray-100 hover:border-gray-200 transition-colors"
          >
            {place.thumbnail_url ? (
              <div className="relative w-16 h-16 flex-shrink-0 rounded-md overflow-hidden">
                <Image
                  src={place.thumbnail_url}
                  alt={place.place_name}
                  fill
                  className="object-cover"
                  sizes="64px"
                />
              </div>
            ) : (
              <div className="w-16 h-16 bg-gray-50 rounded-md flex items-center justify-center flex-shrink-0">
                <span className="text-gray-400 text-xs">No Image</span>
              </div>
            )}
            <div className="flex-1 min-w-0 py-0.5">
              <h3 className="font-medium text-sm truncate">
                {place.place_name}
              </h3>
              <p className="text-xs text-gray-600 mt-1 truncate">
                {place.road_address_name || place.address_name}
              </p>
              <div className="flex items-center justify-between mt-1.5">
                <span className="text-[10px] px-1.5 py-0.5 bg-gray-50 text-gray-600 rounded-full">
                  {place.address_name.split(" ")[0]}{" "}
                  {place.address_name.split(" ")[1]}
                </span>
                <Button
                  variant="destructive"
                  size="sm"
                  className="h-6 text-xs font-medium"
                  onClick={() => removeSelectedPlace(place)}
                >
                  삭제
                </Button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SelectedPlaceList;
