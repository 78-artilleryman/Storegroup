import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useSearchStore } from "@/store";
import { searchPlacesByKeyword } from "@/services/kakaoApi";
import type { Place } from "@/store";

interface ExcelDataItem {
  name: string;
  address: string;
}

function ExcelDataImporter() {
  const navigate = useNavigate();
  const [clipboardData, setClipboardData] = useState<ExcelDataItem[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const addSelectedPlace = useSearchStore((state) => state.addSelectedPlace);

  // 주소에서 주요 도로명 추출 함수
  const extractRoadName = (address: string): string => {
    // 정규표현식으로 도로명 추출 (xxx로, xxx길, xxx대로 등)
    const roadMatch = address.match(/([가-힣0-9]+(?:로|길|대로|street|st))/i);
    if (roadMatch) {
      return roadMatch[1];
    }

    // 도로명이 없으면 구/동명 추출
    const areaMatch = address.match(/([가-힣]+(?:구|동))/);
    if (areaMatch) {
      return areaMatch[1];
    }

    return "";
  };

  // 카카오 검색 후 선택 리스트에 추가
  const processExcelData = async () => {
    if (clipboardData.length === 0) return;

    setIsProcessing(true);
    let successCount = 0;

    try {
      for (const item of clipboardData) {
        try {
          // 주소에서 도로명 추출
          const roadName = extractRoadName(item.address);

          // 가게명 + 도로명으로 검색 키워드 생성
          const searchKeyword = roadName
            ? `${item.name} ${roadName}`
            : item.name;

          // 생성된 키워드로 검색
          const places = await searchPlacesByKeyword(searchKeyword);

          if (places.length > 0) {
            // 첫 번째 검색 결과를 선택 리스트에 추가
            const selectedPlace: Place = places[0];
            addSelectedPlace(selectedPlace);
            successCount++;
          }

          // API 호출 간격 조절 (카카오 API 제한 고려)
          await new Promise((resolve) => setTimeout(resolve, 100));
        } catch (error) {
          console.error(`${item.name} 검색 실패:`, error);
        }
      }

      alert(`${successCount}개의 장소가 선택 리스트에 추가되었습니다.`);

      // 처리 완료 후 클립보드 데이터 초기화
      setClipboardData([]);

      // 리스트 페이지로 이동
      navigate("/list");
    } catch (error) {
      console.error("데이터 처리 중 오류:", error);
      alert("데이터 처리 중 오류가 발생했습니다.");
    } finally {
      setIsProcessing(false);
    }
  };

  // 클립보드에 데이터가 없으면 컴포넌트를 렌더링하지 않음
  if (clipboardData.length === 0) {
    return null;
  }

  return (
    <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-blue-800">
          복사된 데이터 감지됨 ({clipboardData.length}개)
        </h3>
        <div className="flex gap-2">
          <Button
            onClick={processExcelData}
            disabled={isProcessing}
            size="sm"
            className="bg-blue-600 hover:bg-blue-700"
          >
            {isProcessing ? "처리 중..." : "일괄 추가"}
          </Button>
        </div>
      </div>

      {isProcessing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 flex flex-col items-center space-y-4">
            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-sm text-gray-600">데이터 처리 중...</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default ExcelDataImporter;
