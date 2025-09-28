import {
  Asset,
  Top,
  FixedBottomCTA,
  BottomSheet,
  Button,
} from "@toss-design-system/mobile";
import { adaptive } from "@toss-design-system/colors";
import { useState } from "react";
import { Storage } from "@apps-in-toss/web-framework";
import { postPhoneCall } from "@/services/estimate";

function SuccessPage() {
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

  const handleBottomSheetOpen = () => {
    setIsBottomSheetOpen(true);
  };

  const handleBottomSheetClose = () => {
    setIsBottomSheetOpen(false);
  };

  const handlePhoneCall = async () => {
    const accessToken = await Storage.getItem("accessToken");
    if (!accessToken) {
      throw new Error("accessToken이 없습니다.");
    }
    postPhoneCall(accessToken);
    handleBottomSheetClose();
  };

  return (
    <div className="flex flex-col bg-white min-h-[calc(100vh-24px)]">
      <Top
        title={
          <Top.TitleParagraph size={22} color={adaptive.grey900}>
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
              <Button type="dark" onClick={handleBottomSheetClose}>
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
            <br /> 1만원권 상품권을 드려요
          </li>
          <li>추후 문자로 인터뷰 진행 안내해드려요.</li>
        </ul>
      </BottomSheet>
    </div>
  );
}

export default SuccessPage;
