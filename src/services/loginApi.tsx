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
    body: JSON.stringify({ authorizationCode, referrer }),
  });
  return response.json();
};
