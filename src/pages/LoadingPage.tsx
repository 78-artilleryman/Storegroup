import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSearchStore } from "@/store";
import { performGrouping, getGroupingResult } from "@/services/groupingApi";
import { Storage } from "@apps-in-toss/web-framework";

function LoadingPage() {
  const navigate = useNavigate();
  const [timeElapsed, setTimeElapsed] = useState(false);
  const [apiCompleted, setApiCompleted] = useState(false);

  // Store에서 필요한 데이터 가져오기
  const selectedPlaces = useSearchStore((state) => state.selectedPlaces);
  const groupCount = useSearchStore((state) => state.groupCount);
  const balance = useSearchStore((state) => state.balance);
  const setGroupingResult = useSearchStore((state) => state.setGroupingResult);

  useEffect(() => {
    // 3초 타이머 시작
    const timer = setTimeout(() => {
      setTimeElapsed(true);
    }, 3000);

    // API 호출
    const performApi = async () => {
      let isUnmounted = false;
      const cleanup = () => {
        isUnmounted = true;
      };
      const accessToken = await Storage.getItem("accessToken");
      if (!accessToken) {
        throw new Error("accessToken이 없습니다.");
      }

      try {
        // 1) POST 요청 전송 (서버에 작업 생성)
        await performGrouping(selectedPlaces, groupCount, balance, accessToken);

        // 2) GET 폴링으로 결과 수신
        const maxAttempts = 20; // 최대 20회 (예: 최대 ~20초)
        const intervalMs = 1000; // 1초 간격
        let attempt = 0;

        while (!isUnmounted && attempt < maxAttempts) {
          try {
            const result = await getGroupingResult(accessToken);
            if (result && result.result) {
              if (!isUnmounted) {
                setGroupingResult(result);
                setApiCompleted(true);
              }
              break;
            }
          } catch (e) {
            // 아직 준비되지 않았거나 일시 오류일 수 있으므로 다음 시도
          }
          attempt += 1;
          await new Promise((res) => setTimeout(res, intervalMs));
        }

        if (!isUnmounted && !apiCompleted) {
          throw new Error(
            "결과를 가져오지 못했습니다. 잠시 후 다시 시도해주세요."
          );
        }
      } catch (error) {
        console.error("그룹화 요청 중 오류가 발생했습니다:", error);

        if (error instanceof Error) {
          alert(`오류: ${error.message}`);
        } else {
          alert("알 수 없는 오류가 발생했습니다. 콘솔을 확인해주세요.");
        }

        // 에러 발생 시 뒤로 이동
        navigate(-1);
      }
      return cleanup;
    };

    performApi();

    // 컴포넌트 언마운트 시 타이머 정리
    return () => {
      clearTimeout(timer);
    };
  }, [selectedPlaces, groupCount, balance, setGroupingResult, navigate]);

  // API 완료 && 3초 경과 시 결과 페이지로 이동
  useEffect(() => {
    if (timeElapsed && apiCompleted) {
      navigate("/group");
    }
  }, [timeElapsed, apiCompleted, navigate]);

  return (
    <main className="min-h-[calc(100vh-120px)] bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="bg-white rounded-2xl p-8 shadow-xl max-w-sm mx-4 text-center">
        {/* 로딩 스피너 */}
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>

        {/* 제목 */}
        <h2 className="text-xl font-bold text-gray-800 mb-3">그룹화 진행 중</h2>

        {/* 설명 */}
        <p className="text-gray-600 text-sm mb-6">
          선택하신 {selectedPlaces.length}개의 장소를
          <br />
          {groupCount}개 그룹으로 분석하고 있습니다.
        </p>

        {/* 상태 표시 */}
        <div className="space-y-2">
          <div
            className={`flex items-center justify-between text-sm ${
              apiCompleted ? "text-green-600" : "text-gray-500"
            }`}
          >
            <span>데이터 분석</span>
            {apiCompleted ? (
              <span className="font-medium">완료 ✓</span>
            ) : (
              <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            )}
          </div>

          <div
            className={`flex items-center justify-between text-sm ${
              timeElapsed ? "text-green-600" : "text-gray-500"
            }`}
          >
            <span>결과 준비</span>
            {timeElapsed ? (
              <span className="font-medium">완료 ✓</span>
            ) : (
              <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

export default LoadingPage;
