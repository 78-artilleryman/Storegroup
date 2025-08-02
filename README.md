# StoreGroup

StoreGroup은 매장을 그룹화해주는 Vite + React 애플리케이션입니다.

## 🚀 시작하기

### 환경변수 설정

프로젝트 루트에 `.env.local` 파일을 생성하고 다음 환경변수들을 설정하세요:

```
# Google Analytics
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# Kakao API Keys  
VITE_KAKAO_REST_API_KEY=your_kakao_rest_api_key_here
VITE_KAKAO_JS_KEY=your_kakao_js_key_here
```

### 개발 서버 실행

```bash
pnpm install
pnpm dev
```

개발 서버는 [http://localhost:3000](http://localhost:3000)에서 실행됩니다.

### 빌드

```bash
pnpm build
```

### 미리보기

```bash
pnpm preview
```

## 🏗️ 기술 스택

- **React 18** - UI 라이브러리
- **Vite** - 빌드 도구
- **TypeScript** - 타입 안전성
- **React Router** - 클라이언트 사이드 라우팅
- **Tailwind CSS** - 스타일링
- **Zustand** - 상태 관리
- **Radix UI** - UI 컴포넌트
- **Kakao Map API** - 지도 서비스

## 📁 프로젝트 구조

```
src/
├── components/          # 재사용 가능한 컴포넌트
│   ├── ui/             # UI 컴포넌트 (Radix UI 기반)
│   ├── Header.tsx      # 네비게이션 헤더
│   ├── KakaoMap.tsx    # 카카오맵 컴포넌트
│   └── ...
├── pages/              # 페이지 컴포넌트
│   ├── Home.tsx        # 홈 페이지
│   ├── GroupPage.tsx   # 그룹 페이지
│   └── ListPage.tsx    # 리스트 페이지
├── store/              # 상태 관리 (Zustand)
├── lib/                # 유틸리티 함수
└── main.tsx           # 앱 진입점
```

## 🔧 주요 기능

- **장소 검색**: 카카오 API를 통한 실시간 장소 검색
- **장소 그룹화**: 선택한 장소들을 그룹으로 분류
- **지도 시각화**: 카카오맵을 통한 장소 및 그룹 시각화
- **반응형 디자인**: 모바일 친화적 UI

## ⚠️ 주의사항

- 카카오 API는 CORS 정책으로 인해 클라이언트에서 직접 호출 시 제한될 수 있습니다.
- 운영 환경에서는 프록시 서버나 백엔드 API를 통한 호출을 권장합니다.

## 📝 라이선스

이 프로젝트는 MIT 라이선스 하에 있습니다.
