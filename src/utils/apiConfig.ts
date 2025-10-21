/**
 * 현재 접속한 프론트엔드 URL을 기준으로 백엔드 API Base URL을 결정합니다.
 * - private-apps 도메인에 접속 → VITE_DEV_URL 사용
 * - apps 도메인에 접속 → VITE_PROD_URL 사용
 */
export const getApiBaseUrl = (): string => {
  const hostname = window.location.hostname;

  // Dev 환경 (private-apps 도메인에 접속한 경우)
  if (hostname.includes("private-apps.tossmini.com")) {
    const devUrl = import.meta.env.VITE_DEV_URL;
    // const prodUrl = import.meta.env.VITE_PROD_URL;
    if (!devUrl) {
      throw new Error("VITE_DEV_URL 환경변수가 설정되지 않았습니다.");
    }
    return devUrl;
    // return prodUrl;
  }

  // Prod 환경 (apps 도메인에 접속한 경우)
  if (hostname.includes("apps.tossmini.com")) {
    const prodUrl = import.meta.env.VITE_PROD_URL;
    if (!prodUrl) {
      throw new Error("VITE_PROD_URL 환경변수가 설정되지 않았습니다.");
    }
    return prodUrl;
  }

  // 로컬 개발 환경
  if (hostname === "localhost" || hostname === "127.0.0.1") {
    // 로컬에서는 VITE_DEV_URL 우선, 없으면 VITE_PROD_URL 사용
    const devUrl = import.meta.env.VITE_DEV_URL;
    const prodUrl = import.meta.env.VITE_PROD_URL;

    if (devUrl) {
      return devUrl;
    }
    if (prodUrl) {
      return prodUrl;
    }

    throw new Error(
      "VITE_DEV_URL 또는 VITE_PROD_URL 환경변수가 설정되지 않았습니다."
    );
  }

  // 기본값: VITE_PROD_URL 사용
  const prodUrl = import.meta.env.VITE_PROD_URL;
  if (!prodUrl) {
    throw new Error("VITE_PROD_URL 환경변수가 설정되지 않았습니다.");
  }
  return prodUrl;
};

/**
 * 현재 환경이 Dev 환경인지 확인합니다.
 */
export const isDev = (): boolean => {
  const hostname = window.location.hostname;
  return (
    hostname.includes("private-apps") ||
    hostname === "localhost" ||
    hostname === "127.0.0.1"
  );
};

/**
 * 현재 환경 이름을 반환합니다.
 */
export const getEnvironment = (): "dev" | "prod" | "local" => {
  const hostname = window.location.hostname;

  if (hostname === "localhost" || hostname === "127.0.0.1") {
    return "local";
  }

  if (hostname.includes("private-apps.tossmini.com")) {
    return "dev";
  }

  return "prod";
};
