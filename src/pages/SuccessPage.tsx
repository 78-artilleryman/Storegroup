import {
  Asset,
  Top,
  FixedBottomCTA,
  BottomSheet,
  Button,
  useToast,
} from "@toss/tds-mobile";
import { colors } from "@toss/tds-colors";
import { useState } from "react";
import { withTokenRefresh } from "@/utils/tokenManager";
import { postPhoneCall } from "@/services/estimate";
import { useNavigate } from "react-router-dom";

function SuccessPage() {
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const { openToast } = useToast();
  const navigate = useNavigate();

  const handleBottomSheetOpen = () => {
    setIsBottomSheetOpen(true);
  };

  const handleBottomSheetClose = () => {
    setIsBottomSheetOpen(false);
    navigate("/home");
  };

  const handlePhoneCall = async () => {
    try {
      // 토큰 재발급 로직이 포함된 API 호출
      await withTokenRefresh(
        (token) => postPhoneCall(token),
        () => {
          // 토큰 재발급 실패 시 로그인 페이지로 이동
          console.log("토큰 재발급 실패. 로그인 페이지로 이동합니다.");
          navigate("/");
        }
      );

      openToast("응해주셔서 감사해요. 곧 연락드릴게요!", {
        type: `bottom`,
        lottie: `https://static.toss.im/lotties-common/check-green-spot.json`,
        higherThanCTA: false,
      });
      handleBottomSheetClose();

      // 토스트가 보인 후 홈으로 이동
      setTimeout(() => {
        navigate("/home");
      }, 1000); // 2초 후 홈으로 이동 (토스트 표시 시간 고려)
    } catch (error) {
      console.error("전화 인터뷰 신청 중 오류 발생:", error);
    }
  };

  return (
    <div className="flex flex-col bg-white min-h-[calc(100vh-24px)]">
      <Top
        title={
          <Top.TitleParagraph size={22} color={colors.grey900}>
            답변이 잘 제출됐어요.
            <br />
            소중한 의견 감사해요
          </Top.TitleParagraph>
        }
        upper={
          <Top.UpperAssetContent
            content={
              <Asset.Icon
                frameShape={Asset.frameShape.CleanW60}
                name="icon-emoji-smiling-face-with-heart-eyes"
                aria-hidden={true}
              />
            }
          />
        }
      />
      <FixedBottomCTA loading={false} onClick={handleBottomSheetOpen}>
        다음
      </FixedBottomCTA>
      <BottomSheet
        header={
          <BottomSheet.Header>
            짧은 전화 인터뷰에 응해주실 수 있나요?
          </BottomSheet.Header>
        }
        open={isBottomSheetOpen}
        onClose={() => {}}
        cta={
          <BottomSheet.DoubleCTA
            leftButton={
              <Button
                color="dark"
                variant="weak"
                onClick={handleBottomSheetClose}
              >
                다음에 할게요
              </Button>
            }
            rightButton={
              <Button onClick={handlePhoneCall}>인터뷰 할래요</Button>
            }
          />
        }
      >
        <ul className="text-gray-600 px-12 flex flex-col gap-2 list-disc list-outside ">
          <li>
            인터뷰이로 선정된 분들에게는 스타벅스
            <br /> 1만원권 상품권을 드려요.
          </li>
          <li>추후 문자로 인터뷰 진행 안내해드려요.</li>
        </ul>
      </BottomSheet>
    </div>
  );
}

export default SuccessPage;
