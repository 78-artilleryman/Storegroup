import { Top, ListRow, FixedBottomCTA, Asset } from "@toss/tds-mobile";
import { colors } from "@toss/tds-colors";
import { useNavigate } from "react-router-dom";
import { withTokenRefresh } from "@/utils/tokenManager";
import { postPhoneCall } from "@/services/estimate";

function SatisfactionPage() {
  const navigate = useNavigate();

  const handleSubmit = async () => {
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
      navigate("/success");
    } catch (error) {
      console.error("전화 인터뷰 신청 중 오류 발생:", error);
    }
  };

  return (
    <div className="flex flex-col bg-white min-h-[calc(100vh-24px)]">
      <Top
        title={
          <Top.TitleParagraph size={22} color={colors.grey900}>
            짧은 전화 인터뷰에 응해주실 수 있나요?
          </Top.TitleParagraph>
        }
        upper={
          <Top.UpperAssetContent
            content={
              <Asset.Image
                frameShape={Asset.frameShape.CleanW60}
                src="https://static.toss.im/2d-emojis/png/4x/u1F4F1.png"
                aria-hidden={true}
              />
            }
          />
        }
      />
      <ListRow
        contents={
          <ListRow.Texts
            type="2RowTypeA"
            top="진행 방법"
            topProps={{ color: colors.grey700, fontWeight: `bold` }}
            bottom="전화 인터뷰로 약 10-15분 정도 소요돼요."
            bottomProps={{ color: colors.grey600 }}
          />
        }
        verticalPadding="large"
      />
      <ListRow
        contents={
          <ListRow.Texts
            type="2RowTypeA"
            top="질문 내용"
            topProps={{ color: colors.grey700, fontWeight: `bold` }}
            bottom="서비스 경험에 대한 질문이며 민감한 개인정보와 관련된 사항은 질문드리지 않아요."
            bottomProps={{ color: colors.grey600 }}
          />
        }
        verticalPadding="large"
      />
      <ListRow
        contents={
          <ListRow.Texts
            type="2RowTypeA"
            top="참여 보상"
            topProps={{ color: colors.grey700, fontWeight: `bold` }}
            bottom="인터뷰이로 선정된 분들에게는 감사의 마음을 담아 소정의 상품을 드려요."
            bottomProps={{ color: colors.grey600 }}
          />
        }
        verticalPadding="large"
      />
      <ListRow
        contents={
          <ListRow.Texts
            type="2RowTypeA"
            top="진행 안내"
            topProps={{ color: colors.grey700, fontWeight: `bold` }}
            bottom="추후 문자로 인터뷰 진행을 안내해드려요."
            bottomProps={{ color: colors.grey600 }}
          />
        }
        verticalPadding="large"
      />
      <FixedBottomCTA onClick={handleSubmit} loading={false}>
        인터뷰 신청하기
      </FixedBottomCTA>
    </div>
  );
}

export default SatisfactionPage;
