import { defineConfig } from "@apps-in-toss/web-framework/config";

export default defineConfig({
  appName: "storegroup",
  brand: {
    displayName: "스토어그룹", // 화면에 노출될 앱의 한글 이름으로 바꿔주세요.
    primaryColor: "#3182F6", // 화면에 노출될 앱의 기본 색상으로 바꿔주세요.
    icon: "", // 화면에 노출될 앱의 아이콘 이미지 주소로 바꿔주세요.
    bridgeColorMode: "basic",
  },
  web: {
    host: "0.0.0.0", // 외부 접근 가능
    port: 5173,
    commands: {
      dev: "next dev --turbopack --hostname 0.0.0.0 --port 5173",
      build: "next build",
    },
  },
  permissions: [],
  webViewProps: {
    type: "external",
  },
  outdir: ".next",
});
