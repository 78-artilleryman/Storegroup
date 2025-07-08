import KakaoMap from "@/components/KakaoMap";
import SearchInput from "@/components/SearchInput";

export default function Home() {
  return (
    <>
      <div className="p-4 bg-white">
        <SearchInput />
      </div>
      <KakaoMap />
    </>
  );
}
