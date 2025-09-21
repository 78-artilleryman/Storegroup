export const loginApi = async ({
  authorizationCode,
  referrer,
}: {
  authorizationCode: string;
  referrer: string;
}) => {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const apiUrl = `${baseUrl}/auth/toss/login`;

  if (!baseUrl) {
    throw new Error("VITE_BASE_URL 환경변수가 설정되지 않았습니다.");
  }

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
