import { Place } from "@/store";
import StoreListItem from "./StoreListItem";
import { Asset } from "@toss/tds-mobile";
import { colors } from "@toss/tds-colors";

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
            검색 내역이 없습니다.
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
