"use client";

import React, { useState } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useSearchStore } from "@/store";
import Image from "next/image";
import { Button } from "./ui/button";

function StoreListBottomSheet() {
  const [isOpen, setIsOpen] = useState(true);
  const places = useSearchStore((state) => state.places);

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
            <div className="px-4 pb-safe-or-4 overflow-y-auto-hide max-h-[calc(50vh-80px)] overflow-y-auto">
              {places.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-8">
                  <p className="text-gray-500 text-sm">검색 결과가 없습니다.</p>
                  <p className="text-xs text-gray-400 mt-1">
                    다른 검색어를 입력해보세요.
                  </p>
                </div>
              ) : (
                <ul className="space-y-2 pb-4">
                  {places.map((place, index) => (
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
                          <span className="text-gray-400 text-xs">
                            No Image
                          </span>
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
                            variant="outline"
                            size="sm"
                            className="h-6 text-xs font-medium"
                          >
                            장소 추가
                          </Button>
                        </div>
                      </div>
                    </li>
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

export default StoreListBottomSheet;
