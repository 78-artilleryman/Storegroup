import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSearchStore } from "@/store";
import { performGrouping } from "@/services/groupingApi";
import { withTokenRefresh } from "@/utils/tokenManager";
import { Asset, Top } from "@toss/tds-mobile";
import { colors } from "@toss/tds-colors";

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
      try {
        // 토큰 재발급 로직이 포함된 API 호출
        const result = await withTokenRefresh(
          (token) =>
            performGrouping(selectedPlaces, groupCount, balance, token),
          () => {
            // 토큰 재발급 실패 시 로그인 페이지로 이동
            console.log("토큰 재발급 실패. 로그인 페이지로 이동합니다.");
            navigate("/");
          }
        );

        if (result) {
          setGroupingResult(result);
          setApiCompleted(true);
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
    };

    performApi();

    // 컴포넌트 언마운트 시 타이머 정리
    return () => clearTimeout(timer);
  }, [selectedPlaces, groupCount, balance, setGroupingResult, navigate]);

  // API 완료 && 3초 경과 시 결과 페이지로 이동
  useEffect(() => {
    if (timeElapsed && apiCompleted) {
      navigate("/group");
    }
  }, [timeElapsed, apiCompleted, navigate]);

  return (
    <main className="min-h-[calc(100vh)] bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center">
      <Top
        title={
          <Top.TitleParagraph size={22} color={colors.grey900}>
            {groupCount}개의 그룹으로 분석하고 있어요
          </Top.TitleParagraph>
        }
        lower={
          <Top.SubtitleParagraph color={colors.grey500}>
            <span className="pl-6">잠시만 기다려주세요.</span>
          </Top.SubtitleParagraph>
        }
      />
      <Asset.Lottie
        frameShape={{ width: 375 }}
        src="https://static.toss.im/lotties/loading/load-ripple.json"
        loop={true}
        speed={1}
        aria-hidden={true}
      />
    </main>
  );
}

export default LoadingPage;
