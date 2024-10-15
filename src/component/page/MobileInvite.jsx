import React from 'react';
import styled from 'styled-components';

// Styled components
const Container = styled.div`
  width: 100%;
  padding: 0;
  margin: 0;
  /* font-family: Arial, sans-serif; */
  max-width: 480px;
  margin: auto;
`;

const MainImage = styled.img`
  width: 100%;
  height: auto;
  padding: 15px;
`;

const Section = styled.div`
  padding: 15px;
  position: relative;

  &:after {
    content: '';
    position: absolute;
    left: 15px;
    right: 15px;
    bottom: 0;
    height: 1px;
    background-color: #ddd;
  }
`;


const Title = styled.h1`
  font-size: 14px;
  text-align: left;
  margin-bottom: 18px;
  /* font-weight: bold; */
  font-weight: 500;
`;

const DetailWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  /* margin-bottom: 24px; */

  &:not(:last-child) {
    margin-bottom: 24px;
  }
`;


const DayWrapper = styled.div`
  /* display: flex; */
  /* align-items: flex-start; */
  /* margin-bottom: 24px; */

  &:not(:last-child) {
    margin-bottom: 16px;
  }
`;

const TimeWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  /* margin-bottom: 24px; */
  margin-top: 2px;
  justify-content: space-between;
  &:not(:last-child) {
    margin-bottom: 2px;
    justify-content: start;
  }
`;

const DetailContent=styled.div`

`

const InfoText = styled.p`
  font-size: 12px;
  /* margin-bottom: 10px; */
  /* line-height: 1.5; */
  box-sizing: border-box;
  line-height: 1.8;
`;

const ScheduleTitle = styled.p`
  font-size: 12px;
  /* margin-bottom: 10px; */
  /* font-weight: bold; */
  width: 45px;
  margin-right: 25px;
    box-sizing: border-box;
    line-height: 1.8;
`;

const Footer = styled.div`
  background-color: #f8f8f8;
  text-align: left;
  padding: 15px;
  font-size: 12px;
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: flex-end;

`;

const LeftFooter=styled.div`
    
`

const RightFooter=styled.div`
    
`

const RightLogo=styled.div`
    width: 75px;
    height: 45px;
    background-color: aqua;
`
const LeftTxt=styled.div`
    
`

const LeftButton=styled.button`
    
`

const Map = styled.img`
  width: 100%;
  height: 280px;
  border: none;
  margin-bottom: 20px;
`;


const Button = styled.a`
  display: block;
  text-align: center;
  padding: 10px;
  margin: 10px 0;
  background-color: #f5f5f5;
  color: #333;
  text-decoration: none;
  border-radius: 5px;
  font-size: 14px;
  &:hover {
    background-color: #ddd;
  }
`;



// Main Component
function MobileInvite() {
  return (
    <Container>
      {/* Main Image */}
      <MainImage src="https://via.placeholder.com/480x480" alt="Exhibition Poster" />

      <div>
      <Button href="tmap://route?goalname=홍익대학교&goalx=126.993187&goaly=37.582341" target="_blank">
        티맵에서 열기
      </Button>
      <Button href="nmap://place?lat=37.582341&lng=126.993187&name=홍익대학교" target="_blank">
        네이버지도에서 열기
      </Button>
      <Button href="kakaomap://look?p=37.582341,126.993187" target="_blank">
        카카오맵에서 열기
      </Button>
    </div>



      {/* Exhibition Name */}
      <Section>
        <Title>ICYCLE: 선택의 순간들이 만들어낸 결정체 </Title>
        
        <DetailWrapper>
        <ScheduleTitle>전시명</ScheduleTitle>
      
        <InfoText>2024 한국공학대학교<br></br>디자인공학부 제19회 졸업전시회</InfoText>
        </DetailWrapper>

        <DetailWrapper>
        <ScheduleTitle>전시 장소</ScheduleTitle>
        <DetailContent>
        <InfoText>10/18/FRI 13:00 - 17:30<br></br>
        (opening 16:00)</InfoText>
        <InfoText>10/19/SAT - 10/20/SUN 10:00 - 17:30</InfoText>
        </DetailContent>
        </DetailWrapper>

        <DetailWrapper>
        <ScheduleTitle>장소</ScheduleTitle>
      
        <InfoText>홍익대학교 대학로 아트센터 B1 갤러리 1 <br></br>(서울시 종로구 대학로 57)</InfoText>
        </DetailWrapper>
      </Section>

      {/* Exhibition Time and Location */}
   

      {/* Detailed Schedule */}
      <Section>
        <ScheduleTitle>상세 일정</ScheduleTitle>

        <DayWrapper>
        <ScheduleTitle>10/18.FRI</ScheduleTitle>
        <TimeWrapper>
        <InfoText>16:00</InfoText>
        <InfoText style={{marginLeft:'24px'}}>개회식</InfoText>
        </TimeWrapper>

        <TimeWrapper>
        <InfoText>16:00</InfoText>
        <InfoText style={{marginLeft:'24px'}}>개회식</InfoText>
        </TimeWrapper>

        <TimeWrapper>
        <InfoText>16:00</InfoText>
        <InfoText style={{marginLeft:'24px'}}>개회식</InfoText>
        </TimeWrapper>

        <TimeWrapper>
        <InfoText>16:00</InfoText>
        <InfoText style={{marginLeft:'24px'}}>개회식</InfoText>
        </TimeWrapper>

        <TimeWrapper>
        <InfoText>16:00</InfoText>
        <InfoText style={{marginLeft:'24px'}}>개회식</InfoText>
        </TimeWrapper>

        <TimeWrapper>
            <div style={{display:'flex'}}>
        <InfoText>16:00</InfoText>
        <InfoText style={{marginLeft:'24px'}}>개회식</InfoText>
        </div>
        <InfoText>*마감시간 17:30</InfoText>
        </TimeWrapper>

        </DayWrapper>



        <DayWrapper>
        <ScheduleTitle>10/18</ScheduleTitle>
        <TimeWrapper>
        <InfoText>16:00</InfoText>
        <InfoText style={{marginLeft:'24px'}}>개회식</InfoText>
        </TimeWrapper>

        <TimeWrapper>
        <div style={{display:'flex'}}>
        <InfoText>16:00</InfoText>
        <InfoText style={{marginLeft:'24px'}}>개회식</InfoText>
        </div>
        <InfoText>*마감시간 17:30</InfoText>
        </TimeWrapper>


        </DayWrapper>


        <DayWrapper>
        <ScheduleTitle>10/18</ScheduleTitle>
        <TimeWrapper>
        <div style={{display:'flex'}}>
        <InfoText>16:00</InfoText>
        <InfoText style={{marginLeft:'24px'}}>개회식</InfoText>
        </div>
        <InfoText>*마감시간 17:30</InfoText>
        </TimeWrapper>

        </DayWrapper>
      </Section>

      {/* Directions */}
      <Section>
  {/* Map */}
            <Map></Map>

      <ScheduleTitle style={{width:'auto'}}>지하철 이용시</ScheduleTitle>
      <DetailWrapper>
        <ScheduleTitle style={{width:'62px'}}>1호선</ScheduleTitle>
      
        <InfoText>종로5가역 2번출구<br></br>이화사거리 방면으로 직진 (도보 14분)</InfoText>
        </DetailWrapper>

        <DetailWrapper>
        <ScheduleTitle style={{width:'62px'}}>4호선</ScheduleTitle>
        <InfoText>혜화역 3번출구<br></br>
        서울대 방면으로 직진 (도보 11분)</InfoText>
        </DetailWrapper>

        
      <ScheduleTitle style={{width:'auto'}}>지하철 이용시</ScheduleTitle>
      <DetailWrapper>
        <ScheduleTitle style={{width:'62px'}}>통신대</ScheduleTitle>
        <InfoText>104, 106, 107, 140, 150, 160, 273, 710, 2112</InfoText>
        </DetailWrapper>

        <DetailWrapper>
        <ScheduleTitle style={{width:'62px'}}>이화장</ScheduleTitle>
        <InfoText>109, 273, 601, 2112, 7025</InfoText>
        </DetailWrapper>

        <DetailWrapper>
        <ScheduleTitle style={{width:'62px'}}>현대그룹빌딩</ScheduleTitle>
        <InfoText>102, 107, 108, 109, 162, 401, 7025</InfoText>
        </DetailWrapper>

        <DetailWrapper>
        <ScheduleTitle style={{width:'62px'}}>이화사거리</ScheduleTitle>
        <InfoText>마을버스 종로 08번</InfoText>
        </DetailWrapper>



      
      </Section>

      {/* Footer */}
      <Footer>
        <LeftFooter>
            <LeftTxt>2024 TUKOREA<br></br>
DESIGN ENGINEERING<br></br>
19TH GRADUATION EXHIBITION</LeftTxt>
            <LeftButton>INSTAGRAM</LeftButton>
        </LeftFooter>
        <RightFooter>
            <RightLogo></RightLogo>
        </RightFooter>
      </Footer>
    </Container>
  );
}

export default MobileInvite;
