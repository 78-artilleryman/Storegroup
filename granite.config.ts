import { defineConfig } from "@apps-in-toss/web-framework/config";

export default defineConfig({
  appName: "storegroup",
  brand: {
    displayName: "storegroup", // 화면에 노출될 앱의 한글 이름으로 바꿔주세요.
    primaryColor: "#3182F6", // 화면에 노출될 앱의 기본 색상으로 바꿔주세요.
    icon: "https://toss-storegroup.s3.us-east-1.amazonaws.com/Frame_2087328089.png",
    bridgeColorMode: "basic",
  },
  web: {
    host: "localhost",
    port: 5173,
    commands: {
      dev: "vite",
      build: "tsc -b && vite build",
    },
  },
  permissions: [],
  outdir: "dist",
});
