import LandingCard from './LandingCard';

function LandingCardList() {
  return (
    <div className="space-y-pr-80">
      <LandingCard className="bg-gradient-to-r from-brand-primary to-brand-tertiary p-pr-1 shadow-[0_0_10px_0_rgba(255,255,255,0.5)]">
        <LandingCard.Inner>
          <LandingCard.Image
            src="/images/landing/img-mockup1.png"
            xPosition="end"
            yPosition="end"
          />
          <LandingCard.TextWrapper icon="/images/landing/foldericon.svg">
            <LandingCard.Text>그룹으로</LandingCard.Text>
            <LandingCard.Text>할 일을 관리해요</LandingCard.Text>
          </LandingCard.TextWrapper>
        </LandingCard.Inner>
      </LandingCard>
      <LandingCard className="bg-[#1E293B]">
        <LandingCard.TextWrapper icon="/images/landing/messageicon.svg" right>
          <LandingCard.Text>간단하게 멤버들을</LandingCard.Text>
          <LandingCard.Text>초대해요</LandingCard.Text>
        </LandingCard.TextWrapper>
        <LandingCard.Image
          src="/images/landing/img-mockup2.png"
          xPosition="start"
          yPosition="start"
        />
      </LandingCard>
      <LandingCard className="bg-[#020617]">
        <LandingCard.Image
          src="/images/landing/img-mockup3.png"
          xPosition="end"
          yPosition="start"
        />
        <LandingCard.TextWrapper icon="/images/landing/checkicon.svg">
          <LandingCard.Text>할 일도 간편하게</LandingCard.Text>
          <LandingCard.Text>체크해요</LandingCard.Text>
        </LandingCard.TextWrapper>
      </LandingCard>
    </div>
  );
}

export default LandingCardList;
