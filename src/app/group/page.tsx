import React from "react";

function GroupPage() {
  return (
    <main className="min-h-[calc(100vh-120px)] bg-gray-50 pt-4">
      <div className="flex flex-col items-center justify-center py-12 text-center px-4">
        <p className="text-gray-500">그룹화된 장소가 없습니다.</p>
        <p className="text-sm text-gray-400 mt-2">
          장소 검색 후 그룹화 해주세요.
        </p>
      </div>
    </main>
  );
}

export default GroupPage;
