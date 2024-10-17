import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Sidenav from '../ui/Sidenav';
import postData from '../../data/data.json'; // 데이터를 불러오는 부분
import exampleImage from '../../assets/new.png';
import Footer from '../ui/Footer';

import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase"; // Firebase Firestore 연결

const RealWrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: #fff;
`;

const MainImage = styled.div`
  width: 100%;
  height: auto;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  aspect-ratio: 1920 / 700;

  @media (max-width: 768px) {
    aspect-ratio: 780 / 520;
  }
`;

const TextContainer = styled.div`
  display: flex;
  justify-content:start;
  width: 100%;
  padding: 80px 15px;
  box-sizing: border-box;

  @media (max-width: 768px) {
   flex-direction: column;
   padding: 15px 15px 54px;
  }
`;

const LeftText = styled.div`
  width: 36%;
  text-align: left;
  font-size: 16px;
  line-height: 1.4;
  margin-left: 20%;

  @media (max-width: 768px) {
   display: flex;
   width: 100%;
   margin-left: 0;
   justify-content: space-between;
   align-items: flex-end;
   margin-bottom: 54px;
  }
`;

const MainTitle = styled.div`
  
`

const Title = styled.h1`
  font-size: 16px;
  margin-bottom: 2px;
  font-weight: 600;
  letter-spacing: -0.32px;

  @media (max-width: 768px) {
   font-size: 12px;
  }
`;

const Subtitle = styled.h2`
  font-size: 14px;
  margin-bottom: 42px;
  font-weight: 500;
  letter-spacing: -0.28px;

  @media (max-width: 768px) {
   margin-bottom: 0;
   font-size: 12px;
  }
`;

const StudentName = styled.p`
  font-size: 14px;
  font-weight: 500;
  letter-spacing: -0.28px;

  @media (max-width: 768px) {
   font-size: 12px;
  }
`;

const RightText = styled.div`
  margin-left: 0;
  /* width: 24%; */
  text-align: left;
  font-weight: 500;
  font-size: 14px;
  letter-spacing: -0.32px;
  line-height: 1.5;
  white-space: pre-line; /* 이 부분을 추가 */
  @media (max-width: 768px) {
   width: 90%;
   font-size: 12px;
  }
`;

const StudentImagesContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
  padding: 0;
  box-sizing: border-box;
`;

const StudentImage = styled.img`
  width: 60%;
  height: auto;
  object-fit: cover;
  display: block;
  box-sizing: border-box;
`;

const VimeoVideoWrapper = styled.div`
  width: 100%;
  aspect-ratio: 16/9;
  margin-bottom: 120px;
`;

// Vimeo 영상 스타일
const VimeoVideo = styled.iframe`
  width: 100%;  /* 가로 100% */
  height:100%;  /* 16:9 비율 */
  border: none;
  display: block;
  box-sizing: border-box;

  @media (max-width: 768px) {
    width: 100vw;
    height: 56.25vw;
  }
`;

const ProfileTitle = styled.div`
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 24px;
  padding-left: 15px;
`;

const ProfileSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  width: 100%;
  margin: 0 auto 120px;
  padding: 0 15px;
  box-sizing: border-box;

  @media (max-width: 768px) {
   align-items: flex-start;
   flex-direction: column;
  }
`;

const ProfileWrap = styled.div`
  @media (max-width: 768px) {
   flex-direction: column;
  }
`;

const ProfileContainer = styled.div`
  display: flex;
  align-items: flex-end;
  margin-right: 60px;

  @media (max-width: 768px) {
   margin: 0 auto 16px;
   margin-right: 0;
  }
`;

const ProfileBox = styled.div`
  width: 240px;
  height: 360px;
  background-color: #cfd8dc;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  margin-right: 16px;

  @media (max-width: 768px) {
   width: 120px;
   height: 180px;
  }
`;

const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;

const ProfileText = styled.div`
  font-size: 14px;
  margin-bottom: 0px;
  line-height: 1.6;
  text-transform: none;
  width: 156px;
  font-weight: 500;

  @media (max-width: 768px) {
   font-size: 12px;
  }
`;

const ProfileTexttwo = styled.div`
  font-size: 14px;
  margin-bottom: 16px;
  line-height: 1.6;
  text-transform: none;
  width: 156px;
  font-weight: 500;

  @media (max-width: 768px) {
   margin-bottom: 8px;
   font-size: 12px;
  }
`;

const GuestbookButton = styled.button`
  background-color: #ffffff; 
  font-weight: 500;
  border: 1.5px solid #000;
  padding: 6px 8px;
  font-size: 14px;
  cursor: pointer;
    transition: all 0.5s ease;
  &:hover {
        background-color:#000;
        color: #fff;
    }

  @media (max-width: 768px) {
   font-size: 12px;
  }
`;

const Pagination = styled.div`
  font-size: 14px;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  width: 100%;
`;

const PaginationButton = styled.button`
  background: none;
  border: none;
  color: #333;
  font-size: 14x;
  cursor: pointer;
  padding: 0;
  margin: 0 8px;

  &:disabled {
    color: #ccc;
    cursor: not-allowed;
  }

  @media (max-width: 768px) {
   font-size: 12px;
  }
`;

const Slash = styled.span`
  margin: 0 4px;
  color: #000;
  font-size: 14px;

  @media (max-width: 768px) {
   font-size: 12px;
  }
`;

const Copyright = styled.div`
  height: 100px;
  width: 100%;
  display: flex;
  align-items: center;
  padding: 0 15px;
  font-size: 14px;
  font-weight: normal;
  letter-spacing: -.28px;
  line-height: 1.4;

  @media (max-width: 768px) {
   font-size: 12px;
  }
`;
const Icon = styled.img`
  width: 24px;
  height: auto;
  object-fit: cover;
  margin-bottom: 16px;
`;
function PostViewPage() {
  const { pID } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [projectData, setProjectData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("pID")
    console.log(pID)
    const fetchProjectData = async () => {
      setLoading(true);
      try {
        const projectRef = doc(db, "newProjects", pID); // 특정 문서 ID로 Firestore에서 문서 참조
        const projectSnap = await getDoc(projectRef);

        if (projectSnap.exists()) {
          setProjectData(projectSnap.data()); // 문서 데이터 저장
        } else {
          console.error("문서를 찾을 수 없습니다.");
        }
      } catch (error) {
        console.error("문서를 불러오는 중 오류 발생:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjectData();
  }, []);
  console.log("projectData")
  console.log(projectData)

  useEffect(() => {
    const selectedPost = postData.find(post => post.pID === pID);
    setPost(selectedPost);
  }, [pID]);

  if (!projectData) {
    return <div>Loading...</div>;
  }

  const currentIndex = postData.findIndex(p => p.pID === pID);

  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  const goToPreviousPost = () => {
    if (currentIndex > 0) {
      const prevPost = postData[currentIndex - 1];
      navigate(`/projects/${prevPost.pID}`);
      scrollToTop();
    }
  };

  const goToNextPost = () => {
    if (currentIndex < postData.length - 1) {
      const nextPost = postData[currentIndex + 1];
      navigate(`/projects/${nextPost.pID}`);
      scrollToTop();
    }
  };

  // Vimeo 링크를 자동으로 파라미터 추가해서 처리
  const vimeoBaseLink = projectData.vimeoLink || "https://player.vimeo.com/video/836631741?";  // 학생이 제공한 링크 또는 기본 링크
  const vimeoLink = `${vimeoBaseLink}?title=0&byline=0&portrait=0&loop=1`;
  console.log("vimeoLink")
  console.log(vimeoLink)
  // const designers = post.designer.split(',').map((designer, index) => ({
  //   name: designer.trim(),
  //   engname: post.engname[index].trim(),
  //   major: '미디어디자인공학전공',
  //   email: `example${index}@email.com`,
  //   insta: `@ggan_zi`
  // }));

  return (
    <RealWrap>
      <Sidenav />
      <MainImage style={{ backgroundImage: `url(/mainimg/main${projectData.projectId}.jpg)` }} />
      <TextContainer>
        <LeftText>
          <MainTitle>
            <Title>{projectData.title}</Title>
            <Subtitle>{projectData.subtitle}</Subtitle>
          </MainTitle>
          <StudentName>
            {projectData.teamMembers?.map((member, index) => (
              <div key={index} style={{ float: 'left', whiteSpace: 'pre-wrap' }}>
                {member.name + "  " || 'N/A'}
              </div>
            ))}
          </StudentName>
        </LeftText>
        <RightText>
          {projectData.description || 'LIFELOG는 스마트 레이더 센서인 RETINA-4SN를 활용하여\nLIFELOG는 스마트 레이더 센서인 RETINA-4SN를 활용하여\n1인 가구의 일상을 사생활 침해 없이 기록·분석하며 풍요로운 삶을 위해 \n도움을 주는 디바이스입니다. 우리는 24시간 동안 사용자와 함께하며, \n그들의 일상 속에서 안전과 건강을 최우선으로 책임집니다.'}
        </RightText>
      </TextContainer>

      <StudentImagesContainer>
        <StudentImage src={`/infoimg/info${projectData.projectId}.jpg`} alt="학생 작품 이미지" />
        {/* Vimeo 영상 추가, Vimeo URL 동적으로 받아옴 */}
        <VimeoVideoWrapper>
          <VimeoVideo
            src={vimeoLink}
            allow="fullscreen; picture-in-picture"
          />
        </VimeoVideoWrapper>
      </StudentImagesContainer>

      <ProfileTitle>DESIGNER</ProfileTitle>
      <ProfileSection>
        <ProfileWrap style={{ display: 'flex', alignItems: 'flex-start' }}>

          {projectData.teamMembers?.map((member, index) => (
            <ProfileContainer key={member.sId}>
              <ProfileBox style={{ backgroundImage: `url(/profilelow/low${member.sId}.jpg)` }} />
              <ProfileInfo>

                <Icon src={`/iceflower/icycle${member.sId}.png`}></Icon>
                <ProfileText>{member.department.slice(0, -1) + "전공"}</ProfileText>
                <ProfileTexttwo>
                  <span style={{ marginRight: '4px' }}>{member.name}</span>
                  <span>{member.englishName}</span>  {/* 영어 이름을 data.json의 engname에서 가져옴 */}
                </ProfileTexttwo>
                <ProfileText>{member.instagram}</ProfileText>
                <ProfileTexttwo>{member.email}</ProfileTexttwo>
                <GuestbookButton onClick={() => { navigate('/guestbook'); }}>GUESTBOOK</GuestbookButton>
              </ProfileInfo>
            </ProfileContainer>
          ))}
        </ProfileWrap>

        {/* <Pagination>
          <PaginationButton onClick={goToPreviousPost} disabled={currentIndex === 0}>PREV</PaginationButton>
          <Slash>/</Slash>
          <PaginationButton onClick={goToNextPost} disabled={currentIndex === postData.length - 1}>NEXT</PaginationButton>
        </Pagination> */}
      </ProfileSection>

      <Footer></Footer>
    </RealWrap>
  );
}

export default PostViewPage;
