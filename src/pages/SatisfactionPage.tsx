import {
  Top,
  List,
  ListRow,
  Checkbox,
  FixedBottomCTA,
} from "@toss-design-system/mobile";
import { adaptive } from "@toss-design-system/colors";
import { useNavigate } from "react-router-dom";
import { useSearchStore } from "@/store";

const satisfactionOptions = [
  { value: "VERY_GOOD", label: "매우 만족" },
  { value: "GOOD", label: "만족" },
  { value: "NORMAL", label: "보통" },
  { value: "BAD", label: "불만족" },
  { value: "TOO_BAD", label: "매우 불만족" },
] as const;

function SatisfactionPage() {
  const selectedScore = useSearchStore((s) => s.satisfactionScore);
  const setSatisfactionScore = useSearchStore((s) => s.setSatisfactionScore);
  const navigate = useNavigate();

  const handleSatisfactionSelect = (
    value: (typeof satisfactionOptions)[number]["value"]
  ) => {
    setSatisfactionScore(value);
  };

  return (
    <div className="flex flex-col bg-white min-h-[calc(100vh-24px)]">
      <div className="h-[14px]" />
      <Top
        title={
          <Top.TitleParagraph size={22} color={adaptive.grey900}>
            스토어그룹 서비스에
            <br />
            얼마나 만족하시나요?
          </Top.TitleParagraph>
        }
        lowerGap={0}
      />
      <div className="h-[24px]" />
      <List>
        {satisfactionOptions.map((option) => (
          <ListRow
            key={option.value}
            contents={
              <ListRow.Texts
                type="1RowTypeA"
                top={option.label}
                topProps={{ color: adaptive.grey700 }}
              />
            }
            right={
              selectedScore === option.value && (
                <Checkbox.Line checked={true} size={20} />
              )
            }
            verticalPadding="small"
            onClick={() => handleSatisfactionSelect(option.value)}
          />
        ))}
      </List>
      <FixedBottomCTA
        loading={false}
        disabled={selectedScore === null}
        onClick={() => navigate("/opinion")}
      >
        다음
      </FixedBottomCTA>
    </div>
  );
}

export default SatisfactionPage;
