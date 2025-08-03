import KakaoMap from "@/components/KakaoMap";
import SearchInput from "@/components/SearchInput";
import ExcelDataImporter from "@/components/ExcelDataImporter";

export default function Home() {
  return (
    <>
      <div className="p-4 bg-white">
        <SearchInput />
        <ExcelDataImporter />
      </div>
      <KakaoMap />
    </>
  );
}
