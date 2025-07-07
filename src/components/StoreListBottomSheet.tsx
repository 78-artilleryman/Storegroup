import React, { useState } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

function StoreListBottomSheet() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div>
      <Drawer open={isOpen} onOpenChange={setIsOpen} modal={false}>
        <DrawerTrigger
          className={`fixed bottom-20 w-[120px] h-[40px] rounded-full left-1/2 -translate-x-1/2 z-50 bg-white ${
            isOpen ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
        >
          목록보기
        </DrawerTrigger>
        <DrawerContent className="h-[300px] max-w-[420px] mx-auto">
          <DrawerHeader>
            <DrawerTitle>Are you absolutely sure?</DrawerTitle>
            <DrawerDescription>This action cannot be undone.</DrawerDescription>
          </DrawerHeader>
        </DrawerContent>
      </Drawer>
    </div>
  );
}

export default StoreListBottomSheet;
