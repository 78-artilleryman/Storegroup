"use client";

import React, { useState, useCallback, memo } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useSearchStore } from "@/store";
import { Place } from "@/store";
import StoreListItem from "./StoreListItem";

function StoreListBottomSheet() {
  const [isOpen, setIsOpen] = useState(true);
  const places = useSearchStore((state) => state.places);
  const addSelectedPlace = useSearchStore((state) => state.addSelectedPlace);
  const removeSelectedPlace = useSearchStore(
    (state) => state.removeSelectedPlace
  );
  const isPlaceSelected = useSearchStore((state) => state.isPlaceSelected);
  const selectedPlaces = useSearchStore((state) => state.selectedPlaces);
  console.log(selectedPlaces);

  // 장소 토글 핸들러를 메모이제이션
  const handlePlaceToggle = useCallback(
    (place: Place) => {
      const selected = isPlaceSelected(place);
      if (selected) {
        removeSelectedPlace(place);
      } else {
        addSelectedPlace(place);
      }
    },
    [isPlaceSelected, removeSelectedPlace, addSelectedPlace]
  );

  return (
    <div className="relative z-50">
      <Drawer open={isOpen} onOpenChange={setIsOpen} modal={false}>
        <DrawerTrigger
          className={`fixed bottom-16 w-[100px] h-[36px] rounded-full left-1/2 -translate-x-1/2 z-50 bg-white shadow-md hover:bg-gray-50 transition-all ${
            isOpen ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
        >
          목록보기
        </DrawerTrigger>
        <DrawerContent className="fixed bottom-0 left-0 right-0 max-h-[50vh] rounded-t-xl bg-white mx-auto max-w-[420px]">
          <div className="mx-auto w-full max-w-[420px]">
            <DrawerHeader className="px-4 py-3">
              <DrawerTitle className="text-base font-bold">
                검색 결과 ({places.length}개)
              </DrawerTitle>
            </DrawerHeader>
            <div className="px-4 pb-safe-or-4 overflow-y-auto max-h-[calc(50vh-80px)]">
              {places.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-8">
                  <p className="text-gray-500 text-sm">검색 결과가 없습니다.</p>
                  <p className="text-xs text-gray-400 mt-1">
                    다른 검색어를 입력해보세요.
                  </p>
                </div>
              ) : (
                <ul className="space-y-2 pb-4">
                  {places.map((place) => (
                    <StoreListItem
                      key={place.place_name}
                      place={place}
                      selected={isPlaceSelected(place)}
                      onToggle={handlePlaceToggle}
                    />
                  ))}
                </ul>
              )}
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
}

export default memo(StoreListBottomSheet);
