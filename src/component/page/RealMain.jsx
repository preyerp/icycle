import React, { useState, useRef, useEffect } from 'react';
import styled from "styled-components";
import Sidenav from '../ui/Sidenav';
import { motion, useScroll, useTransform } from 'framer-motion';
import TextWithGlitch from '../TextEffect/GlitchTextComponent';
import TextScrambleComponent from '../TextEffect/TextScrambleComponent';
import TextScrambleWithGlitch from '../TextEffect/TextScrambleWithGlitch';
import MainVideoTxt from '../ui/MainVideoTxt';

// styled components
const Wrapper = styled.div`
  width: 100%;
  min-height: 1000vh; /* 추가 콘텐츠가 보일 수 있도록 최소 높이 설정 */
  background-color: #FFFFFF;
  overflow-y: auto; /* 스크롤바가 보이도록 설정 */
`;

const Box = styled(motion.div)`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2em;
  position: fixed;
  top: 0;
  left: 0;
  perspective: 1000px; /* 3D 효과를 위해 추가 */
`;


// 비디오 스타일 컴포넌트
const Video = styled(motion.video).attrs({
    loop: true,
    autoPlay: true,
    muted: true,
    // loading: "lazy", // 지연 로딩 속성 추가
})`
    width: 100%;
    position: relative;
    transition: clip-path 0.5s ease;
  `;
const VideoWrapper = styled(motion.div)`
  width: 65%;
  margin: auto;
  position: absolute;
  transition: opacity 0.5s ease, filter 0.5s ease, transform 0.5s ease;
`;
const VideoContent = styled.div`
  height: 350vh; /* 스크롤이 가능하도록 컨텐츠의 높이를 200vh로 설정 */
`;
const TextContents = styled.div`
  width: 100%;
  height: 650vh;
  background-color: white;
  z-index: 50;
  position: relative;
  color: #ffffff;
`;
const EmptyBox = styled.div`
  width: 100%;
  height: ${props => props.height};
`;
const TextContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const BigText = styled.p`
  font-size: 24px;
  font-weight: bold;
  color: black; 
  margin: 0;
  white-space: pre-wrap;
`;
const InfoText = styled.p`
  font-size: 14px;
  font-weight: bold;
  color: black; 
  margin: 0;
  white-space: pre-wrap;
`;


const LogoContainer = styled.div`
  width: 780px;
  height: 256px;
  position: relative;
`;
const LogoImg = styled(motion.img)`
    width: ${props => props.width || '100%'};
    height: ${props => props.height || 'auto'};
    top: ${props => props.top || 'none'};
    left: ${props => props.left || 'none'};
    right: ${props => props.right || 'none'};
    bottom: ${props => props.bottom || 'none'};
    position: absolute;
    object-fit: cover;
    transition: all ${props => props.transition || '0.5'}s ease;
`;
const IceImg = styled.img`
    width: ${props => props.width || '50%'};
    object-fit: cover;
`;

const LogoGif = styled.img`
    height: 100%;
    position: absolute;
    left: 50%;
    transform: translateX(-50%); /* 수평 중앙 정렬 */
    object-fit: contain; /* 높이에 맞춰 원본 비율 유지 */
`;
const MediaContainer = styled.div`
    width: 100%;
    height: 60vh;
    position: relative;
    background-color: #000;
`;

const MediaTxtContainer = styled.div`
    width: 100%;
    height: 34px;
    display: flex;
    position: absolute;
    top: 50%;
    transform: translateY(-50%); /* 수평 중앙 정렬 */
    mix-blend-mode: difference;
`;
const MediaButton = styled.div`
    margin-right: 15px;
    border: 1px solid #fff;
    padding: 8px; /* 텍스트와 테두리 사이의 간격 */
    transform: translateY(-25%); /* 수평 중앙 정렬 */
    cursor: pointer;
    transition: all 0.5s ease;
    mix-blend-mode: difference;

    &:hover {
        background-color:#fff;
        color: #000;
    }
`;

const MButtonContainer = styled.div`
    width: 100%;
    position: relative;
    flex: 1;
    float: left;
    display: flex;
    align-items: flex-end;
    flex-direction: column;
`;

function RealMain(props) {

    const { scrollYProgress } = useScroll(); // useScroll 훅으로 스크롤 위치 추적
    const phrases1 = [
        '1 / FROM',
        'ASCII, FUNCTION',
        '00:01',
        '1963'
    ]
    const phrases2 = [
        '36 / EVERY',
        'HEX, SORTING',
        '00:13',
        '1997'
    ]
    const phrases3 = [
        '74 / PROCESS',
        'TECH, ROBOTIC',
        '00:32',
        '2028'
    ]

    const mediaPhrases1 = [
        'DESIGN ENGINEERING',
        'DESIGN ENGINEERING',
    ]

    const mediaPhrases2 = [
        '19TH GRADUATION EXHIBITION',
        '19TH GRADUATION EXHIBITION',
    ]

    const mediaPhrases3 = [
        '2024 TECH UNIV KOREA',
        '2024 TECH UNIV KOREA',
    ]

    const [phrases, setPhrases] = useState(phrases1); // 초기값은 phrases1

    const txtId = useTransform(scrollYProgress, [0.1, 0.101, 0.2, 0.201], [0, 1, 1, 2]);

    useEffect(() => {
        // txtId가 1이 되면 phrases2로 변경, 0이면 phrases1으로 유지
        txtId.onChange((value) => {
            if (value === 1) {
                setPhrases(phrases2); // 스크롤 위치가 해당 범위에 도달하면 phrases2로 변경
            } else if (value === 2) {
                setPhrases(phrases3);
            } else {

                setPhrases(phrases1); // 그 외에는 phrases1을 유지
            }
        });
    }, [txtId]);

    // 첫 번째 비디오의 opacity와 scale 설정
    const opacity1 = useTransform(scrollYProgress, [0.098, 0.103], [1, 0]);
    const scale1 = useTransform(scrollYProgress, [0, 0.1], [1, 0.9]);
    const clipPath1 = useTransform(scrollYProgress, [0.1, 0.101], ["inset(0% 0% 0% 0%)", "inset(0% 0% 0% 0%)"]);
    const trans3d1 = useTransform(scrollYProgress, [0.1, 0.101], ["translate3d(0, 0, 0px)", "translate3d(0, 0, -300px)"]);

    // 두 번째 비디오의 opacity와 scale 설정
    const opacity2 = useTransform(scrollYProgress, [0.095, 0.1, 0.198, 0.2], [0, 1, 1, 0]);
    const scale2 = useTransform(scrollYProgress, [0.1, 0.2], [1, 0.9]);
    const clipPath2 = useTransform(scrollYProgress, [0.1, 0.101], ["inset(100% 0% 0% 0%)", "inset(0% 0% 0% 0%)"]);
    const bright2 = useTransform(scrollYProgress, [0.1, 0.105, 0.108], ["brightness(0)", "brightness(10)", "brightness(1)"]);
    const trans3d2 = useTransform(scrollYProgress, [0.1, 0.101, 0.2, 0.201], ["translate3d(0, 0, 300px)", "translate3d(0, 0, 0px)", "translate3d(0, 0, 0px)", "translate3d(0, 0, -300px)"]);


    // 세 번째 비디오의 opacity와 scale 설정
    const opacity3 = useTransform(scrollYProgress, [0.195, 0.2, 0.3, 0.35], [0, 1, 1, 0]);
    const scale3 = useTransform(scrollYProgress, [0.2, 0.3], [1, 0.9]);
    const clipPath3 = useTransform(scrollYProgress, [0.2, 0.201], ["inset(100% 0% 0% 0%)", "inset(0% 0% 0% 0%)"]);
    const bright3 = useTransform(scrollYProgress, [0.2, 0.205, 0.208], ["brightness(0)", "brightness(10)", "brightness(1)"]);
    const trans3d3 = useTransform(scrollYProgress, [0.2, 0.201], ["translate3d(0, 0, 300px)", "translate3d(0, 0, 0px)"]);


    const logoTopOpacity = useTransform(scrollYProgress, [0.5, 0.501], [0, 1]);
    const logoTopY = useTransform(scrollYProgress, [0.5, 0.501], [-100, 0]);

    const logoLeftOpacity = useTransform(scrollYProgress, [0.5, 0.501], [0, 1]);
    const logoLeftX = useTransform(scrollYProgress, [0.5, 0.501], [-100, 0]);

    const logoRightOpacity = useTransform(scrollYProgress, [0.5, 0.501], [0, 1]);
    const logoRightX = useTransform(scrollYProgress, [0.5, 0.501], [100, 0]);

    const logoBottomOpacity = useTransform(scrollYProgress, [0.5, 0.501], [0, 1]);
    const logoBottomY = useTransform(scrollYProgress, [0.5, 0.501], [100, 0]);

    const logoBackOpacity = useTransform(scrollYProgress, [0.5, 0.501], [0, 1]);
    const logoBackScale = useTransform(scrollYProgress, [0.5, 0.501], [1.1, 1]);

    const logoTextOpacity = useTransform(scrollYProgress, [0.5, 0.501], [0, 1]);
    const logoTextScale = useTransform(scrollYProgress, [0.5, 0.501], [1.1, 1]);




    return (
        <Wrapper>
            <Sidenav></Sidenav>
            <Box>

                <MainVideoTxt topic={phrases[0]} keyword={phrases[1]} time={phrases[2]} year={phrases[3]}></MainVideoTxt>
                {/* <TextScrambleComponent left={"1%"} color={'black'} phrases1={phrases1} />
                <TextScrambleComponent left={"25%"} color={'white'} phrases1={phrases2} />
                <TextScrambleComponent right={"2%"} color={'black'} phrases1={phrases3} /> */}
                <VideoWrapper style={{ opacity: opacity1, transform: trans3d1 }}>
                    <Video src="web_main_01.mp4" style={{ scale: scale1, clipPath: clipPath1 }} />
                </VideoWrapper>
                <VideoWrapper style={{ opacity: opacity2, transform: trans3d2, filter: bright2 }}>
                    <Video src="web_main_02.mp4" style={{ scale: scale2, clipPath: clipPath2 }} />
                </VideoWrapper>
                <VideoWrapper style={{ opacity: opacity3, transform: trans3d3, filter: bright3 }}>
                    <Video src="web_main_03.mp4" style={{ scale: scale3, clipPath: clipPath3 }} />
                </VideoWrapper>

            </Box>
            <VideoContent />
            <TextContents>
                <EmptyBox height={'100px'}></EmptyBox>

                <TextContainer>
                    <BigText>THE CRYSTAL FORMED</BigText>
                    <BigText>BY MOMENTS OF CHOICE</BigText>
                </TextContainer>

                <EmptyBox height={'60px'}></EmptyBox>

                <TextContainer>
                    <InfoText>우리는 살아가면서 수많은 선택의 기로에 서고, 매 순간마다 다른 결정을 내린다.</InfoText>
                    <InfoText>그 연속된 선택들이 쌓여 각자는 끊임없이 성장하고 변화하며, 우리만의 독특한 결정을 만들어낸다.</InfoText>
                </TextContainer>

                <EmptyBox height={'32px'}></EmptyBox>

                <TextContainer>
                    <InfoText>지난 4년 동안, 90명의 각기 다른 개성을 지닌 사람들이 이러한 선택의 순간들을 반복하며 자신만의 길을 개척해왔다.</InfoText>
                    <InfoText>그 여정 속에서 형성된 결정들은 각자의 색과 결을 담아 이번 전시에서 작품으로 선보인다. 이 작품들은 단순한 결과물이 아니라,</InfoText>
                    <InfoText>그들이 수많은 갈림길에서 내린 선택들이 모여 이루어진 결정체다.</InfoText>
                </TextContainer>

                <EmptyBox height={'120px'}></EmptyBox>

                <TextContainer>
                    <IceImg width={'1480px'} src={"/mainSnow.png"}></IceImg>
                </TextContainer>

                <EmptyBox height={'80px'}></EmptyBox>

                <TextContainer>
                    <InfoText>우리의 인생은 'ICE + CYCLE'처럼 단단하면서도 끊임없이 결정을 요구하는 순환의 구조를 가지고 있다.</InfoText>
                    <InfoText>우리의 결정들은 이러한 연속된 순간들이 쌓여 하나의 결정체, 즉 {'<ICYCLE>'}을 형성한다. {'<ICYCLE>'}은 각자가 만들어낸</InfoText>
                    <InfoText>고유한 결정들이 모여 이룬 것이며, 우리가 지나온 모든 순간의 집합체이자 앞으로 계속될 여정을 담고 있는 상징이다.</InfoText>
                </TextContainer>

                <EmptyBox height={'400px'}></EmptyBox>

                <TextContainer>
                    <LogoContainer>

                        <LogoImg style={{ opacity: logoTopOpacity, y: logoTopY }} transition={'0.5'} width={'575px'} height={'33px'} top={'0'} left={'102.5px'} src={"/logo/logoTop.png"} />
                        <LogoImg style={{ opacity: logoLeftOpacity, x: logoLeftX }} transition={'0.7'} width={'32px'} height={'85px'} top={'85.5px'} left={'9.62px'} src={"/logo/logoLeft.png"} />
                        <LogoImg style={{ opacity: logoRightOpacity, x: logoRightX }} transition={'0.6'} width={'32px'} height={'82px'} top={'87px'} right={'9.62px'} src={"/logo/logoRight.png"} />
                        <LogoImg style={{ opacity: logoBottomOpacity, y: logoBottomY }} transition={'0.8'} width={'572px'} height={'33px'} bottom={'0'} left={'104px'} src={"/logo/logoBottom.png"} />
                        <LogoImg style={{ opacity: logoBackOpacity, scale: logoBackScale }} transition={'0.9'} width={'680.77px'} height={'162.38px'} top={'46.31px'} left={'49.62px'} src={"/logo/logoBack.png"} />
                        <LogoImg style={{ opacity: logoTextOpacity, scale: logoTextScale }} transition={'0.5'} width={'571.85px'} height={'81.87px'} top={'86.92px'} left={'104.18px'} src={"/logo/logoText.png"} />
                        {/* <motion.div   // 로고 탑
                            initial={{ opacity: 0, y: -100 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{
                                ease: 'easeInOut',
                                duration: 1,
                                y: { duration: 1 },
                                delay: 0.8, // 1초 뒤에 애니메이션 시작
                            }}
                        >
                            <LogoImg width={'575px'} height={'33px'} top={'0'} left={'102.5px'} src={"/logo/logoTop.png"} />
                        </motion.div>
                        <motion.div   //로고 왼쪽
                            initial={{ opacity: 0, x: -100 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{
                                ease: 'easeInOut',
                                duration: 2,
                                x: { duration: 1 },
                                delay: 1,
                            }}
                        >
                            <LogoImg width={'32px'} height={'85px'} top={'85.5px'} left={'9.62px'} src={"/logo/logoLeft.png"} />
                        </motion.div>
                        <motion.div   // 로고 오른쪽
                            initial={{ opacity: 0, x: 100 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{
                                ease: 'easeInOut',
                                duration: 2,
                                x: { duration: 1 },
                                delay: 1.2,
                            }}
                        >
                            <LogoImg width={'32px'} height={'82px'} top={'87px'} right={'9.62px'} src={"/logo/logoRight.png"} />
                        </motion.div>
                        <motion.div   // 로고 아래
                            style={{ position: 'absolute', bottom: '0' }}  // 로고의 위치 고정
                            initial={{ opacity: 0, y: 100 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{
                                ease: 'easeInOut',
                                duration: 2,
                                y: { duration: 1 },
                                delay: 1.5,
                            }}
                        >
                            <LogoImg width={'572px'} height={'33px'} bottom={'0'} left={'104px'} src={"/logo/logoBottom.png"} />
                        </motion.div>
                        <motion.div   // 로고 배경
                            initial={{ opacity: 0, scale: 1.1 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{
                                ease: 'easeInOut',
                                duration: 2,
                                scale: { duration: 1 },
                                delay: 1.8,
                            }}
                        >
                            <LogoImg width={'680.77px'} height={'162.38px'} top={'46.31px'} left={'49.62px'} src={"/logo/logoBack.png"} />
                        </motion.div>
                        <motion.div   // 로고 글자
                            initial={{ opacity: 0, scale: 1.1 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{
                                ease: 'easeInOut',
                                duration: 2,
                                scale: { duration: 1 },
                                delay: 2,
                            }}
                        >
                            <LogoImg width={'571.85px'} height={'81.87px'} top={'86.92px'} left={'104.18px'} src={"/logo/logoText.png"} />
                        </motion.div> */}
                    </LogoContainer>

                </TextContainer>

                <EmptyBox height={'80px'}></EmptyBox>

                <TextContainer>
                    <InfoText>{'<ICYCLE>'}의 심볼은 프로그래밍 언어 ‘{'</>'}’ 코드와 색상 칩을 형상화한 모습으로, 여섯 개의 칩이 모여 하나를 이룬다.</InfoText>
                    <InfoText>각 칩은 육각형 눈결정의 가지를 상징하며, 각 칩에 상응하는 정의는 해당 카테고리에 명시되어 있다.</InfoText>
                    <InfoText>로고는 공학적 직선과 디자인적 곡선이 정밀하게 연결되어 형성된 구조이다.</InfoText>
                </TextContainer>

                <EmptyBox height={'300px'}></EmptyBox>

                <TextContainer>
                    <IceImg width={'560px'} src={"/icycleHex.png"}></IceImg>
                </TextContainer>

                <EmptyBox height={'80px'}></EmptyBox>

                <TextContainer>
                    <InfoText>눈결정은 육각형을 기반으로 구성될 때 특유의 안정된 형태를 보인다. 중앙에서부터 여섯 갈래로 뻗은</InfoText>
                    <InfoText>{'<ICYCLE>'}의 가지들은 각각 고유한 방향성을 가진다. 이는 AI & ROBOT, EDUCATION & KIDS, HEALTH CARE,</InfoText>
                    <InfoText>IT & TECH, LIVING, MOBILITY로 구성되어 만들어진다. 각 가지들은 공학적 메커니즘에 따라</InfoText>
                    <InfoText>함수로 데이터화되었으며, 이를 기반으로 6자리의 ‘헥스코드(Hex Code)’로 시각화되었다.</InfoText>
                </TextContainer>


                <EmptyBox height={'80px'}></EmptyBox>

                <MediaContainer>
                    <LogoGif src="/Logo Flow_01.gif" alt="Logo animation" />
                    <MediaTxtContainer>
                        <div style={{ width: "100%", position: 'relative', flex: '3' }}>
                            <TextScrambleComponent color={'white'} phrases1={mediaPhrases1} phrases2={mediaPhrases2} phrases3={mediaPhrases3} />
                        </div>
                        <MButtonContainer>
                            <MediaButton>Media</MediaButton>
                        </MButtonContainer>
                    </MediaTxtContainer>
                </MediaContainer>

                <TextContainer>
                    <InfoText></InfoText>
                    <InfoText></InfoText>
                    <InfoText></InfoText>
                </TextContainer>



                {/* <TextWithGlitch text="icicle" /> */}
                {/* <TextScrambleWithGlitch /> */}

            </TextContents>
        </Wrapper>
    )
}

export default RealMain;