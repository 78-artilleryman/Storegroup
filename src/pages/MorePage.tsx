import { Top, ListRow, Asset } from "@toss/tds-mobile";
import { colors } from "@toss/tds-colors";
import { Link } from "react-router-dom";

function MorePage() {
  return (
    <div className="flex flex-col bg-white">
      <div className="h-[14px]" />
      <Top
        title={
          <Top.TitleParagraph size={22} color={colors.grey900}>
            문제가 생기셨나요?
            <br />
            언제든 의견을 보내주세요
          </Top.TitleParagraph>
        }
        lowerGap={0}
      />
      <div className="h-[24px]" />
      <Link to="/satisfaction" className="flex items-start  min-h-[400px]">
        <ListRow
          left={
            <Asset.Image
              frameShape={Asset.frameShape.CleanW60}
              src="https://static.toss.im/2d-emojis/png/4x/u1F4F1.png"
              aria-hidden={true}
              className="w-[24px] h-[24px]"
            />
          }
          contents={
            <ListRow.Texts
              type="1RowTypeA"
              top="전화 인터뷰 신청하기"
              topProps={{ color: colors.grey700 }}
            />
          }
          verticalPadding="large"
          arrowType="right"
        />
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
