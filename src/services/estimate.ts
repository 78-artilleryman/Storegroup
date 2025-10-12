import { getApiBaseUrl } from "@/utils/apiConfig";

interface EstimateRequest {
  score: "VERY_GOOD" | "GOOD" | "NORMAL" | "BAD" | "TOO_BAD";
  comment: string;
}

export const estimate = async (
  request: EstimateRequest,
  accessToken: string
) => {
  const baseUrl = getApiBaseUrl();
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

export const postPhoneCall = async (accessToken: string) => {
  const baseUrl = getApiBaseUrl();
  const apiUrl = `${baseUrl}/more/apply/phoneCall`;

  const response = await fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }
  return await response.json();
};
