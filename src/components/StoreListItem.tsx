import { memo } from "react";
import { Place } from "@/store";
import { Button } from "@toss-design-system/mobile";

interface StoreListItemProps {
  place: Place;
  selected: boolean;
  // eslint-disable-next-line no-unused-vars
  onToggle: (place: Place) => void;
}

const StoreListItem = memo(
  ({ place, selected, onToggle }: StoreListItemProps) => {
    return (
      <li className="flex justify-between items-end gap-3 p-3 bg-white rounded-lg border border-gray-100 hover:border-gray-200 transition-colors">
        <div className="flex flex-col gap-2">
          <span className="text-[10px] px-1.5 py-0.5 bg-gray-200 text-gray-800 rounded-full w-fit">
            {place.address_name.split(" ")[0]}{" "}
            {place.address_name.split(" ")[1]}
          </span>
          <h3 className="font-medium text-sm truncate">{place.place_name}</h3>
          <p className="text-xs text-gray-600 mt-1 truncate">
            {place.road_address_name || place.address_name}
          </p>
        </div>
        <div className="flex items-center justify-end mt-1.5">
          <Button
            size="tiny"
            type={selected ? "dark" : "primary"}
            onClick={() => onToggle(place)}
          >
            {selected ? "선택됨" : "장소 추가"}
          </Button>
        </div>
      </li>
    );
  }
);

StoreListItem.displayName = "StoreListItem";

export default StoreListItem;
