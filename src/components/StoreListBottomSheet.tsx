"use client";

import React, { useState, useCallback, memo, useRef } from "react";
import { useSearchStore } from "@/store";
import { Place } from "@/store";
import StoreListItem from "./StoreListItem";

function StoreListBottomSheet() {
  const [isOpen, setIsOpen] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [dragY, setDragY] = useState(0);
  const startYRef = useRef(0);
  const currentYRef = useRef(0);

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

  const toggleBottomSheet = () => {
    setIsOpen(!isOpen);
  };

  // 드래그 시작
  const handleDragStart = (e: React.TouchEvent | React.MouseEvent) => {
    setIsDragging(true);
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
    startYRef.current = clientY;
    currentYRef.current = clientY;
  };

  // 드래그 중
  const handleDragMove = (e: React.TouchEvent | React.MouseEvent) => {
    if (!isDragging) return;

    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
    const deltaY = clientY - startYRef.current;

    // 아래로만 드래그 가능 (위로는 안됨)
    if (deltaY > 0) {
      setDragY(deltaY);
      currentYRef.current = clientY;
    }
  };

  // 드래그 종료
  const handleDragEnd = () => {
    if (!isDragging) return;

    setIsDragging(false);

    // 100px 이상 드래그하면 닫기
    if (dragY > 100) {
      setIsOpen(false);
    }

    // 드래그 위치 초기화
    setDragY(0);
  };

  return (
    <>
      {/* 목록보기 버튼 */}
      {!isOpen && (
        <button
          onClick={toggleBottomSheet}
          className="fixed bottom-16 w-[100px] h-[36px] rounded-full left-1/2 -translate-x-1/2 z-50 bg-white shadow-md hover:bg-gray-50 transition-all text-sm font-medium"
        >
          목록보기
        </button>
      )}

      {/* 바텀시트 */}
      <div
        className={`fixed bottom-0 left-0 right-0 bg-white rounded-t-xl shadow-2xl border-t max-w-[420px] mx-auto z-40 ${
          isDragging ? "" : "transition-transform duration-300 ease-out"
        }`}
        style={{
          maxHeight: "50vh",
          transform: isOpen ? `translateY(${dragY}px)` : "translateY(100%)",
        }}
      >
        {/* 핸들 바 */}
        <div
          className="flex justify-center py-4 cursor-grab active:cursor-grabbing"
          onMouseDown={handleDragStart}
          onMouseMove={handleDragMove}
          onMouseUp={handleDragEnd}
          onMouseLeave={handleDragEnd}
          onTouchStart={handleDragStart}
          onTouchMove={handleDragMove}
          onTouchEnd={handleDragEnd}
        >
          <div className="w-16 h-1.5 bg-gray-300 rounded-full" />
        </div>

        {/* 헤더 */}
        <div className="px-4 py-3 border-b border-gray-100">
          <h2 className="text-base font-bold">검색 결과 ({places.length}개)</h2>
        </div>

        {/* 컨텐츠 */}
        <div
          className="px-4 pb-4 overflow-y-auto"
          style={{ maxHeight: "calc(50vh - 80px)" }}
        >
          {places.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8">
              <p className="text-gray-500 text-sm">검색 결과가 없습니다.</p>
              <p className="text-xs text-gray-400 mt-1">
                다른 검색어를 입력해보세요.
              </p>
            </div>
          ) : (
            <ul className="space-y-2 pt-4">
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
    </>
  );
}

export default memo(StoreListBottomSheet);
