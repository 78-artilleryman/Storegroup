import { ClusterPlace } from "@/store";
import { colors } from "@toss/tds-colors";
import { BottomSheet } from "@toss/tds-mobile";

interface PlaceDetailBoxProps {
  place: ClusterPlace | null;
  groupNumber: number;
  color: string;
  isOpen: boolean;
  onClose: () => void;
}

function PlaceDetailBox({
  place,
  groupNumber,
  color,
  isOpen,
  onClose,
}: PlaceDetailBoxProps) {
  if (!place) return null;

  return (
    <BottomSheet open={isOpen} onClose={onClose}>
      <div className="p-4">
        <div
          className="inline-flex items-center gap-2 rounded-[4px] px-2 py-1"
          style={{ backgroundColor: color }}
        >
          <p className="text-xs font-bold text-white">그룹 {groupNumber}</p>
        </div>
        <div className="flex justify-between items-start my-3">
          <div className="flex gap-3 items-center">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white"
              style={{ backgroundColor: colors.grey400 }}
            >
              {groupNumber}
            </div>

            <div className="min-w-0">
              <h3
                className="font-bold text-[20px] break-all whitespace-normal leading-snug"
                style={{ color: colors.grey800 }}
              >
                {place.name}
              </h3>
              <span
                className="text-[16px] leading-relaxed"
                style={{ color: colors.grey600 }}
              >
                {place.address}
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 absolute right-4 top-1"
          >
            <span className="text-gray-500 hover:text-gray-700 text-lg">×</span>
          </button>
        </div>
      </div>
    </BottomSheet>
  );
}

export default PlaceDetailBox;
