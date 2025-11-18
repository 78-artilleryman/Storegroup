import {
  Asset,
  StepperRow,
  FixedBottomCTA,
  List,
  ListRow,
  Text,
} from "@toss/tds-mobile";
import { colors } from "@toss/tds-colors";
import { useNavigate } from "react-router-dom";
import {
  appLogin,
  Analytics,
  closeView,
  graniteEvent,
} from "@apps-in-toss/web-framework";
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

  useEffect(() => {
    const btn = document.getElementById("login_button");
    if (!btn) return;

    const handleClick = () => {
      Analytics.click({ button_name: "login_button" });
    };

    btn.addEventListener("click", handleClick);

    return () => {
      btn.removeEventListener("click", handleClick);
    };
  }, []);

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

  useEffect(() => {
    const unsubscription = graniteEvent.addEventListener("backEvent", {
      onEvent: () => {
        closeView();
      },
      onError: (error) => {
        alert(`에러가 발생했어요: ${error}`);
      },
    });
    return unsubscription;
  }, []);

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
        Analytics.click({ button_name: "login_button" });
        navigate("/home");
      }
    } catch (error) {
      console.error("토스 로그인 실패:", error);
    }
  }

  return (
    <div className="flex flex-col bg-white min-h-[calc(100vh)]">
      <div className="flex flex-col mt-10">
        <Text
          display="block"
          color={colors.grey800}
          typography="st5"
          fontWeight="semibold"
          textAlign="center"
        >
          방문할 매장 동선 관리,
        </Text>
        <div className="flex flex-row items-center justify-center">
          <Text
            display="block"
            color={colors.blue600}
            typography="st5"
            fontWeight="bold"
            textAlign="center"
          >
            스토어그룹{" "}
          </Text>
          <Text
            display="block"
            color={colors.grey800}
            typography="st5"
            fontWeight="semibold"
            textAlign="center"
          >
            이 도와줄게요
          </Text>
        </div>
      </div>
      <div className="flex items-center justify-center mt-10">
        <Asset.Image
          frameShape={Asset.frameShape.CleanW100}
          backgroundColor="transparent"
          src="https://static.toss.im/3d-emojis/u1F31E.png"
          aria-hidden={true}
          style={{ aspectRatio: "1/1" }}
        />
      </div>

      <div className="pt-20" />
      <List className="flex flex-col gap-3">
        <div style={{ background: colors.grey50 }} className="mx-4 rounded-2xl">
          <ListRow
            left={
              <StepperRow.AssetFrame
                shape={Asset.frameShape.CleanW32}
                content={
                  <Asset.ContentIcon
                    name="icon-store-food-blue"
                    aria-hidden={true}
                  />
                }
              />
            }
            contents={
              <ListRow.Texts
                type="2RowTypeA"
                top="흩어진 매장, 한눈에 정리"
                topProps={{ color: colors.grey700, fontWeight: "bold" }}
                bottom="방문해야 하는 매장을 한눈에 정리해줘요."
                bottomProps={{ color: colors.grey600 }}
              />
            }
            verticalPadding="large"
          />
        </div>

        <div style={{ background: colors.grey50 }} className="mx-4 rounded-2xl">
          <ListRow
            left={
              <StepperRow.AssetFrame
                shape={Asset.frameShape.CleanW32}
                content={
                  <Asset.ContentIcon name="icon-folder" aria-hidden={true} />
                }
              />
            }
            contents={
              <ListRow.Texts
                type="2RowTypeA"
                top="가까운 매장끼리 자동 그룹핑"
                topProps={{ color: colors.grey700, fontWeight: `bold` }}
                bottom="등록만 하면 위치 기반으로 가장 효율적인 루트를 추천해줘요."
                bottomProps={{ color: colors.grey600 }}
              />
            }
            verticalPadding="large"
          />
        </div>

        <div style={{ background: colors.grey50 }} className="mx-4 rounded-2xl">
          <ListRow
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
            contents={
              <ListRow.Texts
                type="2RowTypeA"
                top="영업 동선 최적화"
                topProps={{ color: colors.grey700, fontWeight: `bold` }}
                bottom="이동 시간은 줄이고, 방문 효율을 높여요."
                bottomProps={{ color: colors.grey600 }}
              />
            }
            verticalPadding="large"
          />
        </div>
      </List>

      <FixedBottomCTA id="login_button" loading={false} onClick={handleLogin}>
        매장 그룹핑하기
      </FixedBottomCTA>
    </div>
  );
}
