import { memo } from "react";
import { Button } from "./ui/button";
import { Place } from "@/store";

interface StoreListItemProps {
  place: Place;
  selected: boolean;
  // eslint-disable-next-line no-unused-vars
  onToggle: (place: Place) => void;
}

const StoreListItem = memo(
  ({ place, selected, onToggle }: StoreListItemProps) => {
    return (
      <li className="flex gap-3 p-3 bg-white rounded-lg border border-gray-100 hover:border-gray-200 transition-colors">
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
          <h3 className="font-medium text-sm truncate">{place.place_name}</h3>
          <p className="text-xs text-gray-600 mt-1 truncate">
            {place.road_address_name || place.address_name}
          </p>
          <div className="flex items-center justify-between mt-1.5">
            <span className="text-[10px] px-1.5 py-0.5 bg-gray-50 text-gray-600 rounded-full">
              {place.address_name.split(" ")[0]}{" "}
              {place.address_name.split(" ")[1]}
            </span>
            <Button
              variant={selected ? "default" : "outline"}
              size="sm"
              className="h-6 text-xs font-medium"
              onClick={() => onToggle(place)}
            >
              {selected ? "선택됨" : "장소 추가"}
            </Button>
          </div>
        </div>
      </li>
    );
  }
);

StoreListItem.displayName = "StoreListItem";

export default StoreListItem;
