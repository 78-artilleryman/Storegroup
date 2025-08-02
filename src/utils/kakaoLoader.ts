// 카카오맵 스크립트 동적 로딩 유틸리티
let isKakaoLoaded = false;
let isKakaoLoading = false;
const kakaoLoadPromises: Promise<void>[] = [];

export const loadKakaoMapScript = (): Promise<void> => {
  // 이미 로드되었으면 즉시 resolve
  if (isKakaoLoaded && window.kakao && window.kakao.maps) {
    return Promise.resolve();
  }

  // 이미 로딩 중이면 기존 Promise 반환
  if (isKakaoLoading) {
    return kakaoLoadPromises[kakaoLoadPromises.length - 1];
  }

  isKakaoLoading = true;

  const promise = new Promise<void>((resolve, reject) => {
    const kakaoKey = import.meta.env.VITE_KAKAO_JS_KEY;

    if (!kakaoKey) {
      reject(new Error("VITE_KAKAO_JS_KEY 환경변수가 설정되지 않았습니다."));
      return;
    }

    // 이미 스크립트가 존재하는지 확인
    const existingScript = document.querySelector(
      'script[src*="dapi.kakao.com"]'
    );
    if (existingScript) {
      existingScript.remove();
    }

    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${kakaoKey}&autoload=false`;
    script.async = true;

    script.onload = () => {
      console.log("카카오맵 스크립트 로드 완료");
      isKakaoLoaded = true;
      isKakaoLoading = false;
      resolve();
    };

    script.onerror = (error) => {
      console.error("카카오맵 스크립트 로드 실패:", error);
      isKakaoLoading = false;
      reject(new Error("카카오맵 스크립트 로드에 실패했습니다."));
    };

    document.head.appendChild(script);
  });

  kakaoLoadPromises.push(promise);
  return promise;
};
