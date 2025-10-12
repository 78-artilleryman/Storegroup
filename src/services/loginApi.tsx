import { getApiBaseUrl } from "@/utils/apiConfig";

export const loginApi = async ({
  authorizationCode,
  referrer,
}: {
  authorizationCode: string;
  referrer: string;
}) => {
  const baseUrl = getApiBaseUrl();
  const apiUrl = `${baseUrl}/auth/toss/login`;

  const response = await fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ authorizationCode, referrer }),
  });

  const data = await response.json();

  // 헤더에서 토큰 추출
  const authorizationHeader = response.headers.get("Authorization");
  const refreshTokenHeader = response.headers.get("X-Refresh-Token");

  return {
    ...data,
    accessToken: authorizationHeader?.replace("Bearer ", "") || null,
    refreshToken: refreshTokenHeader?.replace("Bearer ", "") || null,
  };
};

export const reissueToken = async (refreshToken: string) => {
  const baseUrl = getApiBaseUrl();
  const apiUrl = `${baseUrl}/auth/reissue?refreshToken=${refreshToken}`;

  const response = await fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`토큰 재발급 실패: ${response.status}`);
  }

  // 헤더에서 새로운 토큰 추출
  const authorizationHeader = response.headers.get("Authorization");
  const refreshTokenHeader = response.headers.get("X-Refresh-Token");

  return {
    accessToken: authorizationHeader?.replace("Bearer ", "") || null,
    refreshToken: refreshTokenHeader?.replace("Bearer ", "") || null,
  };
};
