import {
  Asset,
  Top,
  StepperRow,
  Stepper,
  FixedBottomCTA,
} from "@toss/tds-mobile";
import { colors } from "@toss/tds-colors";
import { useNavigate } from "react-router-dom";
import { appLogin } from "@apps-in-toss/web-framework";
import { loginApi } from "@/services/loginApi";
import {
  saveTokens,
  getRefreshToken,
  refreshAndSaveToken,
} from "@/utils/tokenManager";
import { useEffect, useState } from "react";

export default function Page() {
  const navigate = useNavigate();
  const [isChecking, setIsChecking] = useState(true);

  // 이미 로그인되어 있는지 확인 (리프레시 토큰으로 재발급 시도)
  useEffect(() => {
    const checkLogin = async () => {
      const refreshToken = await getRefreshToken();

      if (!refreshToken) {
        // 리프레시 토큰이 없으면 로그인 화면 표시
        setIsChecking(false);
        return;
      }

      // 리프레시 토큰이 있으면 토큰 재발급 시도
      const success = await refreshAndSaveToken();

      if (success) {
        // 재발급 성공 시 홈으로 이동
        navigate("/home");
      } else {
        // 재발급 실패 시 로그인 화면 표시
        setIsChecking(false);
      }
    };
    checkLogin();
  }, [navigate]);

  // 토큰 확인 중일 때는 아무것도 표시하지 않음
  if (isChecking) {
    return null;
  }

  async function handleLogin() {
    try {
      const { authorizationCode, referrer } = await appLogin();
      const loginApiResponse = await loginApi({ authorizationCode, referrer });

      // 토큰이 존재하는 경우에만 저장
      if (loginApiResponse.accessToken && loginApiResponse.refreshToken) {
        await saveTokens(
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
          <Top.TitleParagraph size={28} color={colors.grey900}>
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
            <StepperRow.Texts type="A" title="그룹화하면 끝" description="" />
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
