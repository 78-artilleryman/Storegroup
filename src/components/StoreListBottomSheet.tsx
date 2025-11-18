import { useState, useCallback, memo, useEffect } from "react";
import { useSearchStore } from "@/store";
import { Place } from "@/store";
import StoreListContent from "./StoreListContent";
import SelectedPlaceContent from "./SelectedPlaceContent";
import StoreListTabs from "./StoreListTabs";
import { BottomSheet, Button, Post, Paragraph } from "@toss/tds-mobile";
import { useNavigate } from "react-router-dom";
import {} from "@toss/tds-mobile";
import { colors } from "@toss/tds-colors";
import { Analytics } from "@apps-in-toss/web-framework";

type TabType = "search" | "list";

function StoreListBottomSheet() {
  const [activeTab, setActiveTab] = useState<TabType>("search");

  const isOpen = useSearchStore((state) => state.isBottomSheetOpen);
  const setIsOpen = useSearchStore((state) => state.setIsBottomSheetOpen);

  const navigate = useNavigate();

  const places = useSearchStore((state) => state.places);
  const addSelectedPlace = useSearchStore((state) => state.addSelectedPlace);
  const removeSelectedPlace = useSearchStore(
    (state) => state.removeSelectedPlace
  );
  const isPlaceSelected = useSearchStore((state) => state.isPlaceSelected);
  const selectedPlaces = useSearchStore((state) => state.selectedPlaces);
  const groupCount = useSearchStore((state) => state.groupCount);

  useEffect(() => {
    const btn = document.getElementById("storelist_deleteall");
    const btn2 = document.getElementById("storelist_grouping");

    const handleClickDeleteAll = () => {
      Analytics.click({ button_name: "storelist_deleteall" });
    };

    const handleClickGrouping = () => {
      Analytics.click({ button_name: "storelist_grouping" });
    };

    if (btn) {
      btn.addEventListener("click", handleClickDeleteAll);
    }

    if (btn2) {
      btn2.addEventListener("click", handleClickGrouping);
    }

    return () => {
      if (btn) {
        btn.removeEventListener("click", handleClickDeleteAll);
      }
      if (btn2) {
        btn2.removeEventListener("click", handleClickGrouping);
      }
    };
  }, []);

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

  const removeSelectedPlaces = useSearchStore(
    (state) => state.clearSelectedPlaces
  );

  const toggleBottomSheet = () => {
    setIsOpen(!isOpen);
  };

  const handleGrouping = async () => {
    if (selectedPlaces.length < groupCount) return;

    // 유효성 검증
    if (selectedPlaces.length === 0) {
      alert("선택된 장소가 없습니다.");
      return;
    }

    setIsOpen(false);

    // 로딩 페이지로 이동 (실제 API 호출은 로딩 페이지에서 처리)
    navigate("/loading");
  };

  return (
    <>
      {/* 목록보기 버튼 */}
      {!isOpen && (
        <button
          id="storelist_list"
          onClick={toggleBottomSheet}
          className="fixed bottom-16 w-[100px] h-[36px] rounded-full left-1/2 -translate-x-1/2 z-50 bg-white shadow-md hover:bg-gray-50 transition-all text-sm font-medium"
        >
          목록보기
        </button>
      )}

      {/* 바텀시트 */}
      <BottomSheet
        open={isOpen}
        onClose={() => setIsOpen(false)}
        maxHeight="50vh"
        expandedMaxHeight="85vh"
        expandBottomSheet={true}
        header={
          <StoreListTabs
            activeTab={activeTab}
            onTabChange={setActiveTab}
            searchCount={places.length}
            selectedCount={selectedPlaces.length}
          />
        }
        cta={
          activeTab === "list" &&
          selectedPlaces.length > 0 && (
            <BottomSheet.DoubleCTA
              leftButton={
                <Button
                  id="storelist_deleteall"
                  color="danger"
                  variant="weak"
                  disabled={selectedPlaces.length === 0}
                  onClick={() => removeSelectedPlaces()}
                >
                  전체 삭제
                </Button>
              }
              rightButton={
                <Button
                  id="storelist_grouping"
                  disabled={selectedPlaces.length < groupCount}
                  onClick={handleGrouping}
                >
                  그룹화하기
                </Button>
              }
            />
          )
        }
      >
        {/* 컨텐츠 */}
        {activeTab === "search" ? (
          <>
            <Post.H3 color={colors.grey900}>
              <Paragraph.Text>검색 결과 ({places.length}개)</Paragraph.Text>
            </Post.H3>

            <StoreListContent
              places={places}
              isPlaceSelected={isPlaceSelected}
              onPlaceToggle={handlePlaceToggle}
            />
          </>
        ) : (
          <SelectedPlaceContent />
        )}
      </BottomSheet>
    </>
  );
}

export default memo(StoreListBottomSheet);
