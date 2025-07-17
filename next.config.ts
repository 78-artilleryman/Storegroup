import type { NextConfig } from "next";
import withPWAInit from "@ducanh2912/next-pwa";

const withPWA = withPWAInit({
  dest: "public",
  cacheOnFrontEndNav: true,
  aggressiveFrontEndNavCaching: true,
  reloadOnOnline: true,
  disable: false,
  workboxOptions: {
    disableDevLogs: true,
  },
});

const nextConfig: NextConfig = {
  images: {
    domains: [
      "search1.kakaocdn.net",
      "search2.kakaocdn.net",
      "search3.kakaocdn.net",
      "search4.kakaocdn.net",
    ],
  },
};

export default withPWA(nextConfig);
