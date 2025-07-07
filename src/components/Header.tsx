import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

function Header() {
  return (
    <div className="w-full  p-4 bg-white border-b">
      <div className="flex gap-3 items-center flex-col">
        {/* 인풋 영역 - 50% */}
        <div className="w-full">
          <Input placeholder="검색어를 입력하세요" />
        </div>

        {/* 버튼 영역 - 50% */}
        <div className="flex-1 flex  gap-2">
          <Button className="flex-1" variant="ghost">
            장소
          </Button>
          <Button className="flex-1" variant="ghost">
            리스트
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Header;
