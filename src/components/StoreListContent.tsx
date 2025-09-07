import { Place } from "@/store";
import StoreListItem from "./StoreListItem";

interface StoreListContentProps {
  places: Place[];
  isPlaceSelected: (place: Place) => boolean;
  onPlaceToggle: (place: Place) => void;
}

function StoreListContent({
  places,
  isPlaceSelected,
  onPlaceToggle,
}: StoreListContentProps) {
  return (
    <div
      className="px-4 pb-4 overflow-y-auto h-full"
      style={{ minHeight: "calc(100vh - 200px)" }}
    >
      {places.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-8">
          <p className="text-gray-500 text-sm">검색 결과가 없습니다.</p>
          <p className="text-xs text-gray-400 mt-1">
            다른 검색어를 입력해보세요.
          </p>
        </div>
      ) : (
        <ul className="space-y-2 pt-4">
          {places.map((place) => (
            <StoreListItem
              key={place.place_name}
              place={place}
              selected={isPlaceSelected(place)}
              onToggle={onPlaceToggle}
            />
          ))}
        </ul>
      )}
    </div>
  );
}

export default StoreListContent;
