import { Top, Asset } from "@toss-design-system/mobile";
import { adaptive } from "@toss-design-system/colors";
import { Link } from "react-router-dom";

function MorePage() {
  return (
    <div className="flex flex-col bg-white">
      <div className="h-[14px]" />
      <Top
        title={
          <Top.TitleParagraph size={22} color={adaptive.grey900}>
            문제가 생기셨나요?
            <br />
            언제든 의견을 보내주세요
          </Top.TitleParagraph>
        }
        lowerGap={0}
      />
      <div className="h-[24px]" />
      <Link to="/satisfaction" className="flex items-start  min-h-[500px]">
        <div className="flex items-center justify-between gap-4 px-6 mt-4 w-full">
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center rounded-full bg-gray-100 w-[48px] h-[48px]">
              <Asset.Icon
                frameShape={{ width: 30, height: 30 }}
                backgroundColor="transparent"
                name="icon-paper-plane"
                aria-hidden={true}
                ratio="1/1"
              />
            </div>
            <p className="text-gray-600 text-xl font-bold">의견 보내기</p>
          </div>
          <Asset.Icon
            frameShape={Asset.frameShape.CleanW24}
            backgroundColor="transparent"
            name="icon-arrow-right-textbutton-mono"
            color={adaptive.grey600}
            aria-hidden={true}
            ratio="1/1"
          />
        </div>
      </Link>
      <footer className="text-gray-600 p-4 bg-gray-100 h-full ">
        <p>
          스토어그룹 ㅣ 서울특별시 동대문구 회기로 168 ㅣ사업자 등록번호:
          898-02-03728 ㅣ 대표: 강현규 ㅣ 연락처: 010-4670-2193
        </p>
      </footer>
    </div>
  );
}

export default MorePage;
