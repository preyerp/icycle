import React, { useState, useEffect, useRef } from 'react';
import Sidenav from '../ui/Sidenav';
import styled from 'styled-components';
import Footer from '../ui/Footer';

// 로딩 GIF 스타일
const LoadingGif = styled.img`
  width: 100px;
  height: 100px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const RealWrap = styled.div`
  

  @media (max-width: 768px) {
    /* 모바일 버전에서 추가적인 스타일을 적용할 수 있습니다 */
  }
`;

// Vimeo 영상을 담는 컨테이너
const VideoContainer = styled.div`
  width: 100vw;
  height: 100vh;
  max-width: 100%;
  margin: 0 auto;
  position: relative;
  overflow: hidden;
  display: flex;
  justify-content: center;
  background-color: #000;

  @media (max-width: 768px) {
    /* height: auto; */
    /* border: 10px solid red; */
    /* margin-top: 50vh; */
    
    /* transform: translateY(-50%); */
    overflow: visible;
  }
  
`;
const VideoM = styled.iframe`
  margin: auto 0;
`

const DescriptionContainer = styled.div`
  opacity: ${({ showDescription }) => (showDescription ? '1' : '0')};
  transition: opacity ease .5s;
  flex-direction: column;
  position: absolute;
  top: 50%;
  left: 15px;
  transform: translateY(-50%);
  color: #ffffff;
  line-height: 1.6;
  font-size: 14px;
  white-space: pre-line;
  pointer-events: ${({ showDescription }) => (showDescription ? 'auto' : 'none')}; /* 클릭 방지 */

  mix-blend-mode: difference;
  
  @media (max-width: 768px) {
    top: 65.5%;
    left: 50%;
    /* border: 1px solid red; */
    transform: translateX(-50%)
    ;
    width: 300px;
    text-align: center;
    font-size: 12px;
    /* color: #ffffff; */
    opacity: 1;
  }
`;


// Chapter 버튼을 담는 컨테이너
const ChapterButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 196px;
  @media (max-width: 768px) {
    height: 160px;
  }
`;

// Chapter 버튼 스타일
const ChapterButton = styled.button`
  padding: 10px 20px;
  border: none;
  font-size: 14px;
  background-color: transparent;
  color: ${({ isActive }) => (isActive ? '#ffffff' : '#b2b2b2')}; /* 선택된 챕터는 검정 글자, 나머지는 회색 글자 */
  cursor: pointer;
  mix-blend-mode: difference;

  &:hover {
    color: #ffffff;
  }
  @media (max-width: 768px) {

    /* color: ${({ isActive }) => (isActive ? '#000' : '#00000050')}; */
    font-size: 12px;
    &:hover {
    /* color: #000; */
  }
  }
`;

const RightWrap = styled.div`
  display: flex;
  width: 135px;
  position: absolute;
  right: 15px;
  top: 50%;
  align-items: center;
  justify-content: space-between;
  height: 176px;
  transform: translateY(-50%);

  @media (max-width: 768px) {
    top:120px;
    transform: translateY(calc(24% - 36px));
    ;
    /* width: 100px; */
    /* height: 140px; */
    /* width: 300px; */
    text-align: center;
    font-size: 12px;
    /* color: #000; */
  }
`;

// 막대를 담는 컨테이너
const ProgressBarContainer = styled.div`
  position: relative;
  height: 176px;
  width: 2px;
  background-color: #ffffff30;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  @media (max-width: 768px) {
    height: 140px;
    /* background-color: #00000030; */
    
  }
`;

// 작은 막대
const SmallBar = styled.div`
  width: 100%;
  height: 25%;
  background-color: #fff;
  position: absolute;
  transition: top 0.3s ease;
  top: ${({ currentChapter }) => {
    if (currentChapter === 1) return '0';
    if (currentChapter === 2) return '25%';
    if (currentChapter === 3) return '50%';
    if (currentChapter === 4) return '75%';
    return '0';
  }};

@media (max-width: 768px) {
    
    /* background-color: #000000; */
    
  }
`;
const TitleTxt = styled.h4`
  color: #000;
  /* padding-left: 15px; */
  font-size: 24px;
  font-weight: 500;
  width: 56%;
  @media (max-width: 768px) {
    
   width: 100%;
    margin-bottom: 36px;
    font-size: 16px;
  }
;`
const BottomButton = styled.button`
  position: absolute;
  background-color: transparent;
  color: #fff;
  bottom: 20px;
  opacity: 0.8;
  border: none;
  cursor: pointer;
  mix-blend-mode: difference;
`;

const DetailTxt = styled.div`
  width: auto;
  /* margin-bottom: 120px; */
  @media (max-width: 768px) {
    
    width: 100%;
     
   }
`;

const KConcept = styled.p`
  margin-bottom: 42px;
  line-height: 1.6;
  
  @media (max-width: 768px) {
  display: none;
     
   }
`;
const KConceptM = styled.p`
  margin-bottom: 42px;
  line-height: 1.6;
  font-size: 12px;
  display: none;
  @media (max-width: 768px) {
  display: block;
     
   }
`;

const EConcept = styled.p`
  text-transform: none;
  line-height: 1.6;
  @media (max-width: 768px) {
  display: none;
     
   }
`;
const EConceptM = styled.p`
  text-transform: none;
  font-size: 12px;
  line-height: 1.6;
  display: none;
  @media (max-width: 768px) {
  display: block;
     
   }
`;

const BottomContainer = styled.div`
  display: flex;
  justify-content: start;
  padding-top: 54px;
  padding: 54px 15px 120px;
  @media (max-width: 768px) {
    
   flex-direction: column;
   padding: 54px 15px 80px;
      
  }
`;


function IntroPage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentChapter, setCurrentChapter] = useState(1); // 현재 선택된 챕터 (1, 2, 3)
  const [showDescription, setShowDescription] = useState(true); // 설명글 표시 여부
  const bottomContainerRef = useRef(null); // BottomContainer에 대한 참조

  const chapters = [
    {
      id: 1,
      videoUrl:
        'https://player.vimeo.com/video/1019852340?badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1&muted=0&loop=1&controls=0&title=0&byline=0&portrait=0',
      description: 'In the whirlwind of ‘ICYCLE’ \n 순환적 과정을 통해 우리의 결정이 형성되는 과정',
    },
    {
      id: 2,
      videoUrl:
        'https://player.vimeo.com/video/1019809556?badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1&muted=0&loop=1&controls=0&title=0&byline=0&portrait=0',
      description: 'Endless, yet special \n 끝없는, 그럼에도 특별한',
    },
    {
      id: 3,
      videoUrl:
        'https://player.vimeo.com/video/1019874341?badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1&muted=0&loop=1&controls=0&title=0&byline=0&portrait=0',
      description: 'Collection of moments \n 순간의 집합체',
    },
    {
      id: 4,
      videoUrl:
        'https://player.vimeo.com/video/1019814167?badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1&muted=0&loop=1&controls=0&title=0&byline=0&portrait=0',
      description: 'Collection of moments \n 순간의 집합체',
    },
  ];

  const currentChapterData = chapters.find((chapter) => chapter.id === currentChapter);

  const handleVideoLoad = () => {
    setIsLoaded(true);
  };

  useEffect(() => {
    const iframe = document.querySelector('iframe');
    if (iframe) {
      iframe.addEventListener('load', handleVideoLoad);
    }
    return () => {
      if (iframe) {
        iframe.removeEventListener('load', handleVideoLoad);
      }
    };
  }, [currentChapter]);

  useEffect(() => {
    // 설명글이 챕터 변경 시 5초 동안 노출되었다가 사라짐
    setShowDescription(true);
    const timer = setTimeout(() => {
      setShowDescription(false);
    }, 4000);

    return () => clearTimeout(timer);
  }, [currentChapter]);

  // BottomButton 클릭 시 BottomContainer로 스크롤
  const scrollToBottomContainer = () => {
    const bottomContainer = document.getElementById('bottom-container'); // BottomContainer의 id가 필요
    const offsetTop = bottomContainer.offsetTop - 54; // 패딩을 고려한 위치
    window.scrollTo({
      top: offsetTop,
      behavior: 'smooth',
    });
  };

  return (

    <RealWrap>
      <Sidenav />

      {/* Vimeo 비디오 영역 */}
      <VideoContainer>
        {/* {!isLoaded && <LoadingGif src="/loading.gif" alt="Loading..." />} */}

        {/* Chapter 버튼 */}
        <RightWrap>
          <ChapterButtonWrapper>
            {chapters.map((chapter) => (
              <ChapterButton
                key={chapter.id}
                isActive={chapter.id === currentChapter}
                onClick={() => {
                  setIsLoaded(false); // 로딩 상태 초기화
                  setCurrentChapter(chapter.id); // 챕터 변경
                }}
              >
                CHAPTER 0{chapter.id - 1}
              </ChapterButton>
            ))}
          </ChapterButtonWrapper>

          {/* 막대 */}
          <ProgressBarContainer>
            <SmallBar currentChapter={currentChapter} />
          </ProgressBarContainer>
        </RightWrap>

        {/* 설명글 */}
        <DescriptionContainer showDescription={showDescription}>
          {currentChapterData.description}
        </DescriptionContainer>

        <BottomButton onClick={scrollToBottomContainer}>SEE DESCRIPTION <br /><span class="material-symbols-outlined">
          stat_minus_1
        </span></BottomButton>

        <VideoM
          src={currentChapterData.videoUrl}
          frameBorder="0"
          allow="autoplay; fullscreen; picture-in-picture; clipboard-write"
          style={{
            width: '100vw',
            height: '56.25vw', // 16:9 비율
            border: 'none',
          }}
          title={`Chapter ${currentChapter}`}
        ></VideoM>
      </VideoContainer>

      {/* BottomContainer */}
      <BottomContainer id="bottom-container" ref={bottomContainerRef}>
        <TitleTxt>CYCLE OF ‘I’</TitleTxt>
        <DetailTxt>
          <KConcept>
            [CYCLE OF ‘I’]는 선택의 순간들이 모여 만들어진 결정체 ‘ICYCLE’의 과정을 시각적으로 체험할 수 있는 <br /> 공간이다.
            매 순간 내리는 선택들이 서로 맞물려 하나의 결정체로 완성되는 모습은, 인생의 모든 선택과  <br />경험들이 독립적
            있지 않고 연속된 흐름 속에서 이루어진다는 의미를 담고 있다.
            이 순환적 과정은 곧 인생의 <br />본질을 반영하며, 그 안에서 우리는 나 자신과 삶에 대한 근본적인 질문을 던지게 된다.
            본 전시를 통해 <br /> 우리는 각자의 인생에서 중요한 선택의 순간들을 마주하며, 매 순간 내려온 결정들이 어떻게 개인의 <br /> 정체성을 형성하는지를 고민해보는 기회가 된다.
            [CYCLE OF ‘I’]의 영상을 관람하며 인생의 선택들이<br /> 어떤 의미를 지니고 있는지 되돌아볼 수 있다.
          </KConcept>
          <KConceptM>
            [CYCLE OF ‘I’]는 선택의 순간들이 모여 만들어진 결정체 ‘ICYCLE’의 과정을 시각적으로 체험할 수 있는 공간이다.
            매 순간 내리는 선택들이 서로 맞물려 하나의 결정체로 완성되는 모습은, 인생의 모든 선택과 경험들이 독립적
            있지 않고 연속된 흐름 속에서 이루어진다는 의미를 담고 있다.
            이 순환적 과정은 곧 인생의 본질을 반영하며, 그 안에서 우리는 나 자신과 삶에 대한 근본적인 질문을 던지게 된다.
            본 전시를 통해 우리는 각자의 인생에서 중요한 선택의 순간들을 마주하며, 매 순간 내려온 결정들이 어떻게 개인의 정체성을 형성하는지를 고민해보는 기회가 된다.
            [CYCLE OF ‘I’]의 영상을 관람하며 인생의 선택들이 어떤 의미를 지니고 있는지 되돌아볼 수 있다.
          </KConceptM>
          <EConcept>
            [CYCLE OF ‘I’] is a space where one can visually experience the process of ‘ICYCLE’, <br /> a crystallization of accumulated moments of choice.
            The way every decision interlocks and <br />forms a singular crystal represents how all choices and experiences in life are not independent<br /> but occur in a continuous flow.
            This cyclical process reflects the essence of life itself,<br /> prompting us to ask fundamental questions about ourselves and our lives.
            Through this<br /> exhibition, we are given the opportunity to confront the critical moments of choice in our lives<br /> and reflect on how each decision shapes our identity.
            By viewing the videos in [CYCLE OF ‘I’],<br /> we can contemplate the significance of the choices we make in life.
          </EConcept>
          <EConceptM>
            [CYCLE OF ‘I’] is a space where one can visually experience the process of ‘ICYCLE’, a crystallization of accumulated moments of choice.
            The way every decision interlocks and forms a singular crystal represents how all choices and experiences in life are not independent but occur in a continuous flow.
            This cyclical process reflects the essence of life itself, prompting us to ask fundamental questions about ourselves and our lives.
            Through this exhibition, we are given the opportunity to confront the critical moments of choice in our lives and reflect on how each decision shapes our identity.
            By viewing the videos in [CYCLE OF ‘I’], we can contemplate the significance of the choices we make in life.
          </EConceptM>


        </DetailTxt>
      </BottomContainer>

      {/* Vimeo player script */}
      <script src="https://player.vimeo.com/api/player.js"></script>
      <Footer />
    </RealWrap>


  );
}

export default IntroPage;

