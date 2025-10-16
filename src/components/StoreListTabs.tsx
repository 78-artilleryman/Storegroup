import { SegmentedControl } from "@toss/tds-mobile";
import { useRef, useEffect } from "react";

type TabType = "search" | "list";

interface StoreListTabsProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  searchCount: number;
  selectedCount: number;
}

function StoreListTabs({ activeTab, onTabChange }: StoreListTabsProps) {
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
    <>
      <SegmentedControl
        alignment="fixed"
        value={activeTab === "search" ? "0-검색 결과" : "1-선택된 장소"}
        onChange={(value) => {
          // value 예: "0-검색 결과" | "1-선택된 장소"
          if (typeof value === "string") {
            onTabChange(value.startsWith("0-") ? "search" : "list");
          }
        }}
        disabled={false}
        size="large"
        name="SegmentedControl"
      >
        <SegmentedControl.Item value="0-검색 결과">
          {`검색 결과`}
        </SegmentedControl.Item>
        <SegmentedControl.Item value="1-선택된 장소">
          {`선택된 장소`}
        </SegmentedControl.Item>
      </SegmentedControl>
    </>
  );
}

export default StoreListTabs;
