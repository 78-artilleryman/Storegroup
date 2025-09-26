import { Top, TextArea, FixedBottomCTA } from "@toss-design-system/mobile";
import { adaptive } from "@toss-design-system/colors";
import { useNavigate } from "react-router-dom";
import { estimate } from "@/services/estimate";
import { Storage } from "@apps-in-toss/web-framework";
import { useSearchStore } from "@/store";

function OpinionPage() {
  const satisfactionScore = useSearchStore((s) => s.satisfactionScore);
  const opinion = useSearchStore((s) => s.opinion);
  const setOpinion = useSearchStore((s) => s.setOpinion);
  const clearFeedback = useSearchStore((s) => s.clearFeedback);
  const navigate = useNavigate();
  const handleChangeOpinion = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setOpinion(e.target.value);
  };

  const handleEstimate = async () => {
    const accessToken = await Storage.getItem("accessToken");
    if (!accessToken) {
      throw new Error("accessToken이 없습니다.");
    }
    const response = await estimate(
      {
        score: satisfactionScore ?? "NORMAL",
        comment: opinion,
      },
      accessToken
    );
    console.log(response);
  };

  const handleSubmit = async () => {
    await handleEstimate();
    clearFeedback();
    navigate("/success");
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
      <FixedBottomCTA disabled={opinion.length === 0} onClick={handleSubmit}>
        의견 보내기
      </FixedBottomCTA>
    </div>
  );
}

export default OpinionPage;
