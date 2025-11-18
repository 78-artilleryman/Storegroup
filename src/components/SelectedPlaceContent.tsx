import { useSearchStore } from "@/store";
import { Asset, Button, Paragraph, Post, Text, Switch } from "@toss/tds-mobile";
import { colors } from "@toss/tds-colors";
import { useEffect } from "react";
import { Analytics } from "@apps-in-toss/web-framework";

function SelectedPlaceContent() {
  const selectedPlaces = useSearchStore((state) => state.selectedPlaces);
  const removeSelectedPlace = useSearchStore(
    (state) => state.removeSelectedPlace
  );

  // 그룹 수 및 밸런스 설정
  const groupCount = useSearchStore((state) => state.groupCount);
  const setGroupCount = useSearchStore((state) => state.setGroupCount);
  const balance = useSearchStore((state) => state.balance);
  const setBalance = useSearchStore((state) => state.setBalance);

  useEffect(() => {
    const btn = document.getElementById("storelist_delete");
    if (!btn) return;

    const handleClick = () => {
      Analytics.click({ button_name: "storelist_delete" });
    };

    btn.addEventListener("click", handleClick);

    return () => {
      btn.removeEventListener("click", handleClick);
    };
  }, []);

  if (selectedPlaces.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-8 gap-3">
        <Asset.Icon
          frameShape={Asset.frameShape.CleanW40}
          backgroundColor="transparent"
          name="icon-warning-circle-line-mono"
          color={colors.grey300}
          aria-hidden={true}
          ratio="1/1"
        />
        <p
          className="text-[20px] font-semibold"
          style={{ color: colors.grey300 }}
        >
          선택된 장소가 없습니다.
        </p>
      </div>
    );
  }

  return (
    <div
      className="p-6 h-full flex flex-col"
      style={{ minHeight: "calc(100vh - 200px)" }}
    >
      <div className="mb-4 -ml-5 -mt-3">
        <Post.H3 paddingBottom={8} color={colors.grey900}>
          <Paragraph.Text>
            선택된 장소({selectedPlaces.length}개)
          </Paragraph.Text>
        </Post.H3>
      </div>
      {selectedPlaces.length < groupCount && (
        <div className="mb-4 px-5 py-3 bg-gray-100 rounded-lg flex items-center gap-2 ">
          <Asset.Icon
            frameShape={{ width: 18 }}
            name="icon-info-circle-mono"
            color={colors.grey400}
            aria-hidden={true}
          />
          <Text
            display="block"
            color={colors.grey700}
            typography="t6"
            fontWeight="medium"
          >
            그룹수보다 많은 장소를 선택해 주세요.
          </Text>
        </div>
      )}

      {/* 그룹 설정 및 밸런스 */}
      <div className="mb-4 space-y-3 flex-shrink-0">
        {/* 그룹 수 설정 */}
        <div className="bg-white rounded-xl px-[6px]">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <span
                className="text-[16px] font-semibold"
                style={{ color: colors.grey700 }}
              >
                그룹 수
              </span>
              <div className="w-8 h-5 bg-blue-100 rounded-[4px] flex items-center justify-center">
                <span className="text-xs font-bold text-blue-600">
                  {groupCount}개
                </span>
              </div>
            </div>
          </div>
          <div className="relative">
            <input
              type="range"
              min="2"
              max="7"
              value={groupCount}
              onChange={(e) => setGroupCount(Number(e.target.value))}
              className="w-full h-2 bg-gray-100 rounded-full appearance-none cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 slider"
              style={{
                background: `linear-gradient(to right, #3B82F6 0%, #3B82F6 ${
                  ((groupCount - 2) / 5) * 100
                }%, #E5E7EB ${((groupCount - 2) / 5) * 100}%, #E5E7EB 100%)`,
              }}
            />
            <div className="flex justify-between text-xs text-gray-400 mt-2">
              <span className="font-medium">2</span>
              <span className="font-medium">7</span>
            </div>
          </div>
        </div>

        {/* 밸런스 설정 */}
        <div className="bg-white rounded-xl px-[6px] py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span
                className="text-[16px] font-semibold"
                style={{ color: colors.grey700 }}
              >
                그룹 밸런스
              </span>
            </div>
            <Switch
              checked={balance === 1}
              onChange={(_event, checked) => {
                Analytics.click({
                  button_name: checked
                    ? "grouppage_groupbalance_on"
                    : "grouppage_groupbalance_off",
                });

                setBalance(checked ? 1 : 0);
              }}
            />
          </div>
          <p className="text-xs text-gray-500">
            {balance === 0
              ? "그룹 간 장소 수 균형을 고려하지 않습니다"
              : "그룹 간 장소 수 균형을 맞춥니다"}
          </p>
        </div>
      </div>

      {/* 스크롤 가능한 장소 리스트 */}
      <div className="flex-1 overflow-y-auto min-h-0">
        <ul className="space-y-2 pb-6">
          {selectedPlaces.map((place, index) => (
            <li
              key={`${place.place_name}-${index}`}
              className="flex justify-between items-end gap-3 px-[6px] py-3 bg-white rounded-lg transition-colors"
            >
              <div className="flex flex-col">
                <span className="text-[10px] px-1.5 py-0.5 bg-gray-200 text-gray-800 rounded-[4px] w-fit">
                  {place.address_name.split(" ")[0]}{" "}
                  {place.address_name.split(" ")[1]}
                </span>
                <h3 className="font-medium text-[16px] truncate mt-2">
                  {place.place_name}
                </h3>
                <p className="text-[14px] text-gray-600 truncate mt-1">
                  {place.road_address_name || place.address_name}
                </p>
              </div>
              <div className="flex items-center justify-end mt-1.5">
                <Button
                  id="storelist_delete"
                  size="small"
                  color="danger"
                  variant="weak"
                  onClick={() => removeSelectedPlace(place)}
                >
                  삭제
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default SelectedPlaceContent;
