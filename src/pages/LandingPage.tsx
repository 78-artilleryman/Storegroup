import {
  Asset,
  Top,
  ListHeader,
  StepperRow,
  Stepper,
  FixedBottomCTA,
} from "@toss-design-system/mobile";
import { adaptive } from "@toss-design-system/colors";
// import { useNavigate } from "react-router-dom";
import { appLogin } from "@apps-in-toss/web-framework";

export default function Page() {
  // const navigate = useNavigate();

  async function handleLogin() {
    try {
      const { authorizationCode, referrer } = await appLogin();
      console.log(authorizationCode, referrer);
      // 획득한 인가 코드(`authorizationCode`)와 `referrer`를 서버로 전달해요.
      // navigate("/home");

      // 로그인 성공 시 홈 페이지로 이동
    } catch (error) {
      console.error("토스 로그인 실패:", error);
    }
  }

  return (
    <>
      <Top
        title={
          <Top.TitleParagraph size={22} color={adaptive.grey900}>
            매장 방문, 한 눈에 정리하고 빠르게 출발해요
          </Top.TitleParagraph>
        }
      />
      <div className="flex justify-center">
        <Asset.Image
          frameShape={{ width: 220 }}
          src="https://static.toss.im/3d/tossmobile-kv-mobile-pay-hero.png"
          aria-hidden={true}
        />
      </div>
      <div className="my-3" />
      <ListHeader
        title={
          <ListHeader.TitleParagraph
            color={adaptive.grey800}
            fontWeight="bold"
            typography="t5"
          >
            빠르게 방문할 매장 동선짜고 관리하기
          </ListHeader.TitleParagraph>
        }
        descriptionPosition="bottom"
      />
      <Stepper>
        <StepperRow
          left={
            <StepperRow.AssetFrame
              shape={Asset.frameShape.CleanW32}
              content={
                <Asset.ContentIcon name="icon-store-white" aria-hidden={true} />
              }
            />
          }
          center={<StepperRow.Texts type="A" title="가야할 매장을 등록하고" />}
        />
        <StepperRow
          left={
            <StepperRow.AssetFrame
              shape={Asset.frameShape.CleanW32}
              content={
                <Asset.ContentIcon name="icon-folder-blue" aria-hidden={true} />
              }
            />
          }
          center={<StepperRow.Texts type="A" title="그룹화하면 끝! " />}
        />
        <StepperRow
          left={
            <StepperRow.AssetFrame
              shape={Asset.frameShape.CleanW32}
              content={
                <Asset.ContentIcon
                  name="icon-document-store"
                  aria-hidden={true}
                />
              }
            />
          }
          center={
            <StepperRow.Texts
              type="A"
              title="오늘의 방문 매장을 확인하고 출발해요"
            />
          }
          hideLine={true}
        />
      </Stepper>
      <FixedBottomCTA loading={false} onClick={handleLogin}>
        시작하기
      </FixedBottomCTA>
    </>
  );
}
