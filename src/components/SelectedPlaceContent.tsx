import { useSearchStore } from "@/store";
import {
  Asset,
  Button,
  Paragraph,
  Post,
  Text,
} from "@toss-design-system/mobile";
import { Switch } from "./ui/switch";
import { adaptive } from "@toss-design-system/colors";

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

  if (selectedPlaces.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-8 gap-3">
        <Asset.Icon
          frameShape={Asset.frameShape.CleanW40}
          backgroundColor="transparent"
          name="icon-warning-circle-line-mono"
          color={adaptive.grey300}
          aria-hidden={true}
          ratio="1/1"
        />
        <p
          className="text-[20px] font-bold"
          style={{ color: adaptive.grey300 }}
        >
          선택된 장소가 없습니다.
        </p>
      </div>
    );
  }

  return (
    <div
      className="p-4 h-full flex flex-col"
      style={{ minHeight: "calc(100vh - 200px)" }}
    >
      <div className="mb-4 -ml-5 -mt-3">
        <Post.H3 paddingBottom={8} color={adaptive.grey900}>
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
            color={adaptive.grey400}
            aria-hidden={true}
          />
          <Text
            display="block"
            color={adaptive.grey700}
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
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <span className="text-sm font-semibold text-gray-800">
                그룹 수
              </span>
              <div className="w-8 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-xs font-bold text-blue-600">
                  {groupCount}
                </span>
              </div>
            </div>
          </div>
          <div className="relative">
            <input
              type="range"
              min="2"
              max="10"
              value={groupCount}
              onChange={(e) => setGroupCount(Number(e.target.value))}
              className="w-full h-2 bg-gray-100 rounded-full appearance-none cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 slider"
              style={{
                background: `linear-gradient(to right, #3B82F6 0%, #3B82F6 ${
                  ((groupCount - 2) / 8) * 100
                }%, #E5E7EB ${((groupCount - 2) / 8) * 100}%, #E5E7EB 100%)`,
              }}
            />
            <div className="flex justify-between text-xs text-gray-400 mt-2">
              <span className="font-medium">2</span>
              <span className="font-medium">10</span>
            </div>
          </div>
        </div>

        {/* 밸런스 설정 */}
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-sm font-semibold text-gray-800">
                그룹 밸런스
              </span>
              <div
                className={`px-2 py-1 rounded-full text-xs font-medium ${
                  balance === 1
                    ? "bg-blue-100 text-blue-600"
                    : "bg-gray-100 text-gray-500"
                }`}
              >
                {balance === 0 ? "OFF" : "ON"}
              </div>
            </div>
            <Switch
              checked={balance === 1}
              onCheckedChange={(checked) => setBalance(checked ? 1 : 0)}
              className="data-[state=checked]:bg-blue-500"
            />
          </div>
          <p className="text-xs text-gray-500 mt-2">
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
              className="flex justify-between items-end gap-3 p-3 bg-white rounded-lg transition-colors"
            >
              <div className="flex flex-col">
                <span className="text-[10px] px-1.5 py-0.5 bg-gray-200 text-gray-800 rounded-[4px] w-fit">
                  {place.address_name.split(" ")[0]}{" "}
                  {place.address_name.split(" ")[1]}
                </span>
                <h3 className="font-medium text-sm truncate mt-2">
                  {place.place_name}
                </h3>
                <p className="text-xs text-gray-600 truncate mt-1">
                  {place.road_address_name || place.address_name}
                </p>
              </div>
              <div className="flex items-center justify-end mt-1.5">
                <Button
                  size="tiny"
                  type="danger"
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
