import { Top, TextArea, FixedBottomCTA } from "@toss-design-system/mobile";
import { adaptive } from "@toss-design-system/colors";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function OpinionPage() {
  const [opinion, setOpinion] = useState("");
  const navigate = useNavigate();
  const handleChangeOpinion = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setOpinion(e.target.value);
  };
  return (
    <div className="flex flex-col bg-white min-h-[calc(100vh-24px)]">
      <div className="h-[14px]" />
      <Top
        title={
          <Top.TitleParagraph size={22} color={adaptive.grey900}>
            그렇게 생각한 이유를
            <br />
            알려주세요!
          </Top.TitleParagraph>
        }
      />
      <TextArea
        variant="box"
        hasError={false}
        label=""
        labelOption="sustain"
        value={opinion}
        placeholder="의견 입력하기"
        height={200}
        onChange={handleChangeOpinion}
      />
      <FixedBottomCTA
        disabled={opinion.length === 0}
        onClick={() => navigate("/success")}
      >
        의견 보내기
      </FixedBottomCTA>
    </div>
  );
}

export default OpinionPage;
