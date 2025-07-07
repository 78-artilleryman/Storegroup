import KakaoMap from "@/components/KakaoMap";
import Header from "@/components/Header";

export default function Home() {
  return (
    <div className="max-w-[420px] mx-auto">
      <Header />
      <KakaoMap />
    </div>
  );
}
