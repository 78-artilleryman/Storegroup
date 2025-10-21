import { Asset, FixedBottomCTA, Text } from "@toss/tds-mobile";
import { colors } from "@toss/tds-colors";
import { useNavigate } from "react-router-dom";

function SuccessPage() {
  const navigate = useNavigate();

  const handleNavigateHome = async () => {
    navigate("/home");
  };

  return (
    <div className="flex flex-col bg-white min-h-[calc(100vh-24px)] items-center pt-[100px]">
      <Asset.Image
        frameShape={{ width: 100 }}
        src="https://static.toss.im/lotties/check-spot-apng.png"
        aria-hidden={true}
      />

      <div className="h-[24px]" />
      <Text
        display="block"
        color={colors.grey800}
        typography="t2"
        fontWeight="bold"
        textAlign="center"
      >
        인터뷰 신청을 완료했어요
      </Text>
      <Text
        display="block"
        color={colors.grey700}
        typography="t5"
        fontWeight="regular"
        textAlign="center"
      >
        인터뷰이로 선정되면 추후 문자로 인터뷰 진행을 안내해드려요.
      </Text>
      <FixedBottomCTA onClick={handleNavigateHome} loading={false}>
        확인했어요
      </FixedBottomCTA>
    </div>
  );
}

export default SuccessPage;
