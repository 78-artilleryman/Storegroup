import { Storage } from "@apps-in-toss/web-framework";
import { reissueToken } from "@/services/loginApi";

const ACCESS_TOKEN_KEY = "accessToken";
const REFRESH_TOKEN_KEY = "refreshToken";

/**
 * 액세스 토큰 가져오기
 */
export const getAccessToken = async (): Promise<string | null> => {
  return await Storage.getItem(ACCESS_TOKEN_KEY);
};

/**
 * 리프레시 토큰 가져오기
 */
export const getRefreshToken = async (): Promise<string | null> => {
  return await Storage.getItem(REFRESH_TOKEN_KEY);
};

/**
 * 토큰 저장
 */
export const saveTokens = async (
  accessToken: string,
  refreshToken: string
): Promise<void> => {
  await Storage.setItem(ACCESS_TOKEN_KEY, accessToken);
  await Storage.setItem(REFRESH_TOKEN_KEY, refreshToken);
};

/**
 * 토큰 삭제
 */
export const clearTokens = async (): Promise<void> => {
  await Storage.removeItem(ACCESS_TOKEN_KEY);
  await Storage.removeItem(REFRESH_TOKEN_KEY);
};

/**
 * 토큰 재발급 및 저장
 * @returns 성공 여부
 */
export const refreshAndSaveToken = async (): Promise<boolean> => {
  try {
    const refreshToken = await getRefreshToken();

    if (!refreshToken) {
      console.error("리프레시 토큰이 없습니다.");
      return false;
    }

    // 토큰 재발급 요청
    const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
      await reissueToken(refreshToken);

    if (!newAccessToken || !newRefreshToken) {
      console.error("토큰 재발급 실패: 새 토큰을 받지 못했습니다.");
      return false;
    }

    // 새 토큰 저장
    await saveTokens(newAccessToken, newRefreshToken);

    console.log("토큰이 성공적으로 재발급되었습니다.");
    return true;
  } catch (error) {
    console.error("토큰 재발급 중 오류 발생:", error);
    return false;
  }
};

/**
 * API 요청 시 401 에러가 발생했을 때 토큰 재발급 시도
 * @param apiCall API 호출 함수 (새로운 토큰을 파라미터로 받음)
 * @param onUnauthorized 재발급 실패 시 호출될 콜백 (예: 로그인 페이지로 이동)
 */
export const withTokenRefresh = async <T>(
  apiCall: (token: string) => Promise<T>,
  onUnauthorized?: () => void
): Promise<T | null> => {
  let accessToken = await getAccessToken();

  if (!accessToken) {
    console.error("액세스 토큰이 없습니다.");
    if (onUnauthorized) {
      onUnauthorized();
    }
    return null;
  }

  try {
    return await apiCall(accessToken);
  } catch (error: any) {
    // 401 에러인 경우 토큰 재발급 시도
    if (error?.message?.includes("401") || error?.status === 401) {
      console.log("401 에러 발생, 토큰 재발급 시도...");

      const refreshSuccess = await refreshAndSaveToken();

      if (refreshSuccess) {
        // 재발급 성공 시 새로운 토큰으로 API 재호출
        const newAccessToken = await getAccessToken();
        if (newAccessToken) {
          try {
            return await apiCall(newAccessToken);
          } catch (retryError) {
            console.error("재시도 실패:", retryError);
            throw retryError;
          }
        }
      }

      // 재발급 실패 시 콜백 호출
      if (onUnauthorized) {
        onUnauthorized();
      }
      throw new Error("토큰 재발급 실패");
    }

    throw error;
  }
};
