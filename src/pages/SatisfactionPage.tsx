import {
  Top,
  List,
  ListRow,
  Checkbox,
  FixedBottomCTA,
} from "@toss-design-system/mobile";
import { adaptive } from "@toss-design-system/colors";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SatisfactionPage() {
  const [selectedSatisfaction, setSelectedSatisfaction] = useState<
    string | null
  >(null);
  const navigate = useNavigate();
  const satisfactionOptions = [
    { value: "very-satisfied", label: "매우 만족" },
    { value: "satisfied", label: "만족" },
    { value: "neutral", label: "보통" },
    { value: "dissatisfied", label: "불만족" },
    { value: "very-dissatisfied", label: "매우 불만족" },
  ];

  const handleSatisfactionSelect = (value: string) => {
    setSelectedSatisfaction(value);
  };
  return (
    <div className="flex flex-col bg-white min-h-[calc(100vh-24px)]">
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
              selectedSatisfaction === option.value && (
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
        disabled={selectedSatisfaction === null}
        onClick={() => navigate("/opinion")}
      >
        다음
      </FixedBottomCTA>
    </div>
  );
}

export default SatisfactionPage;
