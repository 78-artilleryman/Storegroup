interface EstimateRequest {
  score: "VERY_GOOD" | "GOOD" | "NORMAL" | "BAD" | "TOO_BAD";
  comment: string;
}

export const estimate = async (
  request: EstimateRequest,
  accessToken: string
) => {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  if (!baseUrl)
    throw new Error("VITE_BASE_URL 환경변수가 설정되지 않았습니다.");

  const apiUrl = `${baseUrl}/more/estimate`;

  const response = await fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    credentials: "include",
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }
  return await response.json();
};
