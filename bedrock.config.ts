import { defineConfig } from "@apps-in-toss/web-framework/config";

export default defineConfig({
  appName: "storegroup",
  brand: {
    displayName: "스토어그룹", // 화면에 노출될 앱의 한글 이름으로 바꿔주세요.
    primaryColor: "#3182F6", // 화면에 노출될 앱의 기본 색상으로 바꿔주세요.
    icon: "https://toss-storegroup.s3.us-east-1.amazonaws.com/ab7d737be3956db9.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAYDWHTEC3OT5TWI4T%2F20251006%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20251006T154905Z&X-Amz-Expires=300&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLWVhc3QtMSJIMEYCIQCR27ofz00s%2FYGJhrkq7FyZx59jF1Qh53MSal%2BB9FLq%2BgIhAJlthltUra2kYNCuW4%2Fygg2ppNm%2FMlLtm88LTeAN7s7hKuMCCJH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNTU3NjkwNTkzNDYyIgyyLDk9MpvGiB0RF44qtwIJQIP9Ab0n6GR0pcuuRuSOtmnWSIC5QhEz1lMowePNGQfPqF0MPYxLURsRcb0yvRhRGYHoZCN8q0xEfns%2F%2FqK0sFc%2F2Mj8ofnVrN7Qoj5pTP5Ly2wxC%2FOmcg7QdDIrTlDtqB%2FefE2GYrzyFkNvarUyfyKG%2BD3cuFlh07aRBa6R6ouuNVAHxXT6fEfRsz7TEAOBJC6ks3BO4uLs%2BcR9AaUg%2FQp1wYgzM8FeCd%2BC1K%2BldsDGSKoqM5p2kG1b87GrsxMESCwPb0mQZlpMI8YkM%2FRrbZUrnE6ctfbtMvsTTQBMyUXT449aBkJy6LhG9vAUNjbjW6xaIX%2FFSoI3Fu8nTZTj%2FYcpgvPtHqmXvfCKMSmF745uH9URg3v9BppwWVB4U%2ByXI8%2BuWoJD4bNTYZIQ8QNz9x0Hr14ruzCJyY%2FHBjqsAjsqE%2Bgs8TfWtR23eANWAbwSPvgFZAFqt1KeWr5I5jHR49CYrgqlzkG4uscd1aV9CMKTeAlqm6mW8juhdyBLuxeNzWdXN7VRXKpSut0r0101MZE1NyQBtAeyL8PjK89eWkVUMDBW%2BPTbMDT3h1HFQv92KJtSJiavJtcYIGQo8rZ0ofUSDTBPO7hmIeQS%2FScks9APYl%2F3iavD4uzAv7yjPfDhkR77ki6tRvB9M5VB1u2padC5VfK%2ByyBVoh0u79ohYwCYRv7nBYNpx51PLCjFXUZJgqXUrrGASd8KIjTtgFiHvwcuJLDpUtr2cEudPHbctYyXtKadMLU9S2bbtCpmBGR4yL31%2Bf3pkk7fKKVE3%2FQvfdSSSFUT5xK7Cc1GFqPrD%2BFv6V1e5lJDRUcN3Q%3D%3D&X-Amz-Signature=b75add829c18a904853bced97861b5515edfe988cdafa2b0c0aee730cb0ea118&X-Amz-SignedHeaders=host&response-content-disposition=inline", // 화면에 노출될 앱의 아이콘 이미지 주소로 바꿔주세요.
    bridgeColorMode: "basic",
  },
  web: {
    host: "localhost",
    port: 5173,
    commands: {
      dev: "vite --host",
      build: "vite build",
    },
  },
  permissions: [],
  outdir: "dist",
  webViewProps: {
    type: "partner",
  },
});
