import KakaoMap from "@/components/KakaoMap";
import SearchInput from "@/components/SearchInput";
import ExcelDataImporter from "@/components/ExcelDataImporter";
import { useEffect } from "react";
import { useSearchStore } from "@/store";
import { getGroupingResult } from "@/services/groupingApi";
import { Storage } from "@apps-in-toss/web-framework";

export default function Home() {
  const groupingResult = useSearchStore((state) => state.groupingResult);
  const setGroupingResult = useSearchStore((state) => state.setGroupingResult);
  const addSelectedPlace = useSearchStore((state) => state.addSelectedPlace);
  const clearSelectedPlaces = useSearchStore(
    (state) => state.clearSelectedPlaces
  );

  useEffect(() => {
    const fetchGrouping = async () => {
      try {
        const accessToken = await Storage.getItem("accessToken");
        if (!accessToken) return;
        const result = await getGroupingResult(accessToken);
        setGroupingResult(result);

        // 그룹화 결과를 전역 selectedPlaces로 변환/적용
        if (result && result.result) {
          const allClusterPlaces = Object.values(result.result).flat();

          // 초기화 후 중복 없이 추가 (스토어의 addSelectedPlace가 중복 방지 로직 보유)
          clearSelectedPlaces();
          allClusterPlaces.forEach((p) => {
            addSelectedPlace({
              place_name: p.name,
              address_name: p.address,
              road_address_name: p.address,
              x: String(p.longitude),
              y: String(p.latitude),
            });
          });
        }
      } catch (e) {
        console.error(e);
      }
    };

    if (!groupingResult) {
      fetchGrouping();
    }
  }, [groupingResult, setGroupingResult]);

  return (
    <>
      <div className="p-4 bg-white">
        <SearchInput />
        <ExcelDataImporter />
      </div>
      <KakaoMap />
    </>
  );
}
