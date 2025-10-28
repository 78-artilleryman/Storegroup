import KakaoMap from "@/components/KakaoMap";
import SearchInput from "@/components/SearchInput";
import ExcelDataImporter from "@/components/ExcelDataImporter";
import { useEffect } from "react";
import { useSearchStore } from "@/store";
import { getGroupingResult } from "@/services/groupingApi";
import { withTokenRefresh } from "@/utils/tokenManager";
import { useNavigate } from "react-router-dom";
import { closeView, graniteEvent } from "@apps-in-toss/web-framework";

export default function Home() {
  const navigate = useNavigate();
  const groupingResult = useSearchStore((state) => state.groupingResult);
  const setGroupingResult = useSearchStore((state) => state.setGroupingResult);
  const addSelectedPlace = useSearchStore((state) => state.addSelectedPlace);
  const clearSelectedPlaces = useSearchStore(
    (state) => state.clearSelectedPlaces
  );

  useEffect(() => {
    const fetchGrouping = async () => {
      try {
        // 토큰 재발급 로직이 포함된 API 호출
        const result = await withTokenRefresh(
          (token) => getGroupingResult(token),
          () => {
            // 토큰 재발급 실패 시 로그인 페이지로 이동
            console.log("토큰 재발급 실패. 로그인 페이지로 이동합니다.");
            navigate("/");
          }
        );

        if (result) {
          setGroupingResult(result);

          // 그룹화 결과를 전역 selectedPlaces로 변환/적용
          if (result.result) {
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
        }
      } catch (e) {
        console.error(e);
      }
    };

    if (!groupingResult) {
      fetchGrouping();
    }
  }, [groupingResult, setGroupingResult, navigate]);

  useEffect(() => {
    const unsubscription = graniteEvent.addEventListener("backEvent", {
      onEvent: () => {
        closeView();
      },
      onError: (error) => {
        alert(`에러가 발생했어요: ${error}`);
      },
    });
    return unsubscription;
  }, []);

  return (
    <>
      <div className=" bg-white">
        <SearchInput />
        <ExcelDataImporter />
      </div>
      <KakaoMap />
    </>
  );
}
