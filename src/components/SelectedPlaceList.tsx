import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSearchStore } from "@/store";
import { Button } from "./ui/button";
import { Switch } from "./ui/switch";

function SelectedPlaceList() {
  const navigate = useNavigate();

  const [isGrouping, setIsGrouping] = useState(false);

  const selectedPlaces = useSearchStore((state) => state.selectedPlaces);
  const removeSelectedPlace = useSearchStore(
    (state) => state.removeSelectedPlace
  );
  const clearSelectedPlaces = useSearchStore(
    (state) => state.clearSelectedPlaces
  );

  // 그룹 수 및 밸런스 설정
  const groupCount = useSearchStore((state) => state.groupCount);
  const setGroupCount = useSearchStore((state) => state.setGroupCount);
  const balance = useSearchStore((state) => state.balance);
  const setBalance = useSearchStore((state) => state.setBalance);

  const setGroupingResult = useSearchStore((state) => state.setGroupingResult);

  const handleGrouping = async () => {
    if (selectedPlaces.length < groupCount || isGrouping) return;

    try {
      setIsGrouping(true);

      // 환경변수 확인
      const baseUrl = import.meta.env.VITE_BASE_URL;

      // 선택된 장소들을 요청 형식에 맞게 변환
      const requestData = {
        group: groupCount,
        place: selectedPlaces.map((place) => ({
          name: place.place_name,
          address: place.road_address_name || place.address_name,
          latitude: parseFloat(place.y),
          longitude: parseFloat(place.x),
        })),
        option: balance,
      };

      const apiUrl = `${baseUrl}/cluster`;

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("서버 에러 응답:", errorText);
        throw new Error(
          `HTTP error! status: ${response.status}, message: ${errorText}`
        );
      }

      const result = await response.json();

      // 그룹화 결과를 전역 상태에 저장
      setGroupingResult(result);

      // 그룹화가 완료되면 그룹 페이지로 이동
      navigate("/group");
    } catch (error) {
      console.error("그룹화 요청 중 오류가 발생했습니다:", error);

      // 더 자세한 에러 메시지 표시
      if (error instanceof Error) {
        alert(`오류: ${error.message}`);
      } else {
        alert("알 수 없는 오류가 발생했습니다. 콘솔을 확인해주세요.");
      }
    } finally {
      setIsGrouping(false);
    }
  };

  const handleClearAll = () => {
    if (selectedPlaces.length === 0) return;

    const confirmed = window.confirm(
      `선택된 ${selectedPlaces.length}개의 장소를 모두 삭제하시겠습니까?`
    );

    if (confirmed) {
      clearSelectedPlaces();
    }
  };

  if (selectedPlaces.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center px-4">
        <p className="text-gray-500">선택된 장소가 없습니다.</p>
        <p className="text-sm text-gray-400 mt-2">장소 검색 후 추가해주세요.</p>
      </div>
    );
  }

  return (
    <div className="max-w-[420px] mx-auto p-4 max-h-[calc(100vh-150px)] flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-lg font-bold">
          선택된 장소 ({selectedPlaces.length}개)
        </h1>
        <Button
          variant="default"
          size="sm"
          className="h-8 text-sm font-medium bg-blue-500 hover:bg-blue-600"
          onClick={handleGrouping}
          disabled={isGrouping || selectedPlaces.length < groupCount}
        >
          {isGrouping ? "그룹화 중..." : "그룹화"}
        </Button>
      </div>

      {selectedPlaces.length < groupCount && (
        <div className="mb-4 p-2 bg-orange-50 border border-orange-200 rounded-lg">
          <p className="text-sm text-orange-700">
            그룹화하려면 그룹 수({groupCount}개)보다 많은 장소를 선택해주세요.
          </p>
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
              disabled={isGrouping}
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
                Balance
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
              disabled={isGrouping}
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

      {/* 전체 삭제 버튼 */}
      <div className="mb-4 flex-shrink-0">
        <Button
          variant="destructive"
          size="sm"
          className="w-full h-8 text-sm font-medium"
          onClick={handleClearAll}
          disabled={isGrouping || selectedPlaces.length === 0}
        >
          전체 삭제 ({selectedPlaces.length}개)
        </Button>
      </div>

      {/* 스크롤 가능한 장소 리스트 */}
      <div className="flex-1 overflow-y-auto min-h-0">
        <ul className="space-y-2 pb-6">
          {selectedPlaces.map((place, index) => (
            <li
              key={`${place.place_name}-${index}`}
              className="flex gap-3 p-3 bg-white rounded-lg border border-gray-100 hover:border-gray-200 transition-colors"
            >
              {place.thumbnail_url ? (
                <div className="relative w-16 h-16 flex-shrink-0 rounded-md overflow-hidden">
                  <img
                    src={place.thumbnail_url}
                    alt={place.place_name}
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="w-16 h-16 bg-gray-50 rounded-md flex items-center justify-center flex-shrink-0">
                  <span className="text-gray-400 text-xs">No Image</span>
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
                    variant="destructive"
                    size="sm"
                    className="h-6 text-xs font-medium"
                    onClick={() => removeSelectedPlace(place)}
                    disabled={isGrouping}
                  >
                    삭제
                  </Button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default SelectedPlaceList;
