import { useRef, useEffect } from "react";

type TabType = "search" | "list";

interface StoreListTabsProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  searchCount: number;
  selectedCount: number;
}

function StoreListTabs({
  activeTab,
  onTabChange,
  searchCount,
  selectedCount,
}: StoreListTabsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current && indicatorRef.current) {
      const container = containerRef.current;
      const indicator = indicatorRef.current;
      const buttons = container.querySelectorAll("button");

      const activeIndex = activeTab === "search" ? 0 : 1;
      const activeButton = buttons[activeIndex];

      if (activeButton) {
        const containerRect = container.getBoundingClientRect();
        const buttonRect = activeButton.getBoundingClientRect();

        const left = buttonRect.left - containerRect.left;
        const width = buttonRect.width;

        indicator.style.transform = `translateX(${left}px)`;
        indicator.style.width = `${width}px`;
      }
    }
  }, [activeTab]);

  return (
    <div
      ref={containerRef}
      className="relative flex bg-gray-100 rounded-lg p-1 mx-4 my-2"
    >
      {/* 슬라이딩 인디케이터 */}
      <div
        ref={indicatorRef}
        className="absolute top-1 bottom-1 bg-white rounded-md shadow-sm transition-all duration-300 ease-out"
        style={{
          left: "4px",
          width: "calc(50% - 2px)",
        }}
      />

      <button
        onClick={() => onTabChange("search")}
        className={`relative z-10 flex-1 py-2 px-4 text-sm font-medium rounded-md transition-colors duration-200 ${
          activeTab === "search"
            ? "text-blue-600"
            : "text-gray-600 hover:text-gray-800"
        }`}
      >
        검색결과 ({searchCount})
      </button>
      <button
        onClick={() => onTabChange("list")}
        className={`relative z-10 flex-1 py-2 px-4 text-sm font-medium rounded-md transition-colors duration-200 ${
          activeTab === "list"
            ? "text-blue-600"
            : "text-gray-600 hover:text-gray-800"
        }`}
      >
        선택된 장소 ({selectedCount})
      </button>
    </div>
  );
}

export default StoreListTabs;
