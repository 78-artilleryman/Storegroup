import {
  Asset,
  Top,
  StepperRow,
  Stepper,
  FixedBottomCTA,
} from "@toss-design-system/mobile";
import { adaptive } from "@toss-design-system/colors";
import { useNavigate } from "react-router-dom";
import { appLogin } from "@apps-in-toss/web-framework";
import { loginApi } from "@/services/loginApi";
import { Storage } from "@apps-in-toss/web-framework";

const accessToken = "accessToken";
const refreshToken = "refreshToken";

export default function Page() {
  const navigate = useNavigate();

  async function handleSet(
    accessTokenValue: string,
    refreshTokenValue: string
  ) {
    await Storage.setItem(accessToken, accessTokenValue);
    await Storage.setItem(refreshToken, refreshTokenValue);
  }

  async function handleLogin() {
    try {
      const { authorizationCode, referrer } = await appLogin();
      const loginApiResponse = await loginApi({ authorizationCode, referrer });

      // 토큰이 존재하는 경우에만 저장
      if (loginApiResponse.accessToken && loginApiResponse.refreshToken) {
        await handleSet(
          loginApiResponse.accessToken,
          loginApiResponse.refreshToken
        );
        // 로그인 성공 시 홈 페이지로 이동
        navigate("/home");
      }
    } catch (error) {
      console.error("토스 로그인 실패:", error);
    }
  }

  return (
    <div className="flex flex-col bg-white min-h-[calc(100vh)]">
      <Top
        title={
          <Top.TitleParagraph size={28} color={adaptive.grey900}>
            매장 방문, 한 눈에 정리하고 빠르게 출발해요
          </Top.TitleParagraph>
        }
        upper={
          <Top.UpperAssetContent
            content={
              <Asset.Icon
                frameShape={Asset.frameShape.CleanW60}
                name="icon-map"
                aria-hidden={true}
              />
            }
          />
        }
      />
      <div className="h-[174px]" />
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
          center={
            <StepperRow.Texts
              type="A"
              title="가야할 매장을 등록하고"
              description=""
            />
          }
        />
        <StepperRow
          left={
            <StepperRow.AssetFrame
              shape={Asset.frameShape.CleanW32}
              content={
                <Asset.ContentImage
                  src="https://static.toss.im/2d-emojis/png/4x/u1F5C2.png"
                  aria-hidden={true}
                />
              }
            />
          }
          center={
            <StepperRow.Texts type="A" title="그룹화하면 끝!" description="" />
          }
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
              description=""
            />
          }
          hideLine={true}
        />
      </Stepper>
      <FixedBottomCTA loading={false} onClick={handleLogin}>
        로그인하기
      </FixedBottomCTA>
    </div>
  );
}
