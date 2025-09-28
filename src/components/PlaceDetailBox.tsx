import { ClusterPlace } from "@/store";

interface PlaceDetailBoxProps {
  place: ClusterPlace | null;
  groupNumber: number;
  color: string;
  onClose: () => void;
}

function PlaceDetailBox({
  place,
  groupNumber,
  color,
  onClose,
}: PlaceDetailBoxProps) {
  if (!place) return null;

  return (
    <div className="fixed inset-x-0 mx-auto bottom-4 rounded-lg max-w-[380px] z-50 w-[calc(100%-2rem)] bg-white shadow-2xl border">
      <div className="p-4">
        <div className="flex justify-between items-start mb-3">
          <div className="flex gap-3 items-center">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center"
              style={{ backgroundColor: color }}
            >
              <div
                className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold"
                style={{
                  backgroundColor: "white",
                  color: color,
                }}
              >
                {groupNumber}
              </div>
            </div>
            <div>
              <div className="font-semibold text-sm">{place.name}</div>
              <div className="text-xs text-gray-600">그룹 {groupNumber}</div>
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

        <div className="flex gap-2 items-start">
          <span className="text-gray-500 mt-0.5 flex-shrink-0 text-sm">📍</span>
          <span className="text-xs text-gray-700 leading-relaxed">
            {place.address}
          </span>
        </div>
      </div>
    </div>
  );
}

export default PlaceDetailBox;
