import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Sidenav from '../ui/Sidenav';
import SearchBar from '../ui/SearchBar';
import data from '../../data/data.json'; // data.json import
import { useNavigate } from 'react-router-dom'; // 페이지 이동을 위한 hook
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../../firebase"; // Firebase Firestore 연결

// Styled components
const PageWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #fff;
`;

const IndexContent = styled.div`
  width: 44%;
  height: 100%;
  position: absolute;
  left: 55.8%;
  @media (max-width: 768px) {
    width: 100%;
    padding-left: 15px;
    left: 0;
  }
`;

const TopBarContainer = styled.div`
  width: 100%;
  height: 120px;
  position: relative;

  font-weight: 400;
`;
const TopBar = styled.div`
  width: 100%;
  position: absolute;
  bottom: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 15px;
  box-sizing: border-box;
  font-weight: 400;
`;
const DesignerCount = styled.div`
  font-size: 14px;
  margin-left: 56%;
  width: 20%;
  font-weight: 400;

  @media (max-width: 768px) {
    margin-left: 0;
    font-size: 12px;
    width: 50%;
  }
`;

const SearchBarWrapper = styled.div`
  width: 24%;
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    width: 50px;
  }
`;

const ContentWrapper = styled.div`
  width: 100%;
  height: calc(100vh - 120px);
  position: relative;
`;

const LeftSection = styled.div`
  width: 56%;
  height: 100vh;
  position: fixed;
  top:0;
  left:0;
  display: flex;
  justify-content: center;
  align-items: start;

  @media (max-width: 768px) {
    display: none;
  }
`;
const GridContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;

  @media (max-width: 768px) {
    display: none;
  }
`;
const IconGrid = styled.div`
  display: grid;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  grid-template-columns: repeat(10, 1fr);
  grid-template-rows: repeat(9, 1fr);
  grid-gap: 11px;
`;

const SnowflakeIcon = styled.img`
  width: 1.5vw;
  height: auto;
  opacity: 0.15;
  object-fit: cover;
`;

const Icon = styled.img`
  width: 20px;
  height: auto;
  object-fit: cover;
  margin-right: 5px;
`;

const RightSection = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  padding-top: 80px;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const InitialList = styled.div`
  display: flex;
  margin-bottom: 70px;
  align-items: flex-start;
`;

const NameSection = styled.div`
  font-size: 14px;
  font-weight: 500;
  width: 45.45%;

  @media (max-width: 768px) {
    font-size: 12px;
    width: 50%;
  }
`;

const StudentNames = styled.div`
  display: flex;
  flex-direction: column;
`;

const StudentName = styled.div`
  font-size: 14px;
  cursor: pointer;
  position: relative;
  z-index: 10;
  padding-bottom: 10px;
  text-transform: none;
  &:hover {
    color: #999999;
  }

  @media (max-width: 768px) {
    font-size: 12px;
    padding-bottom: 8px;
  }
`;
/* 120 180 */
const HoverImage = styled.div`
  position: fixed;
  top: ${(props) => props.y + 10}px;
  left: ${(props) => props.x + 20}px;
  width: 187px;
  height: 280px;
  background-image: url(${(props) => props.src});
  background-size: cover;
  background-repeat: no-repeat;
  display: ${(props) => (props.visible ? 'block' : 'none')};
  z-index: 1;
`;

const Copyright = styled.div`
  height: 100px;
  width: 100%;
  display: flex;
  align-items: center;
  padding: 0 15px 15px;
  font-size: 14px;
  font-weight: normal;
  letter-spacing: -.28px;
  line-height: 1.4;

  @media (max-width: 768px) {
    font-size: 12px;
  }
`;

const getInitial = (name) => {
  const initialMap = {
    ㄱ: /[가-깋]/,
    ㄴ: /[나-닣]/,
    ㄷ: /[다-딯]/,
    ㄹ: /[라-맇]/,
    ㅁ: /[마-밓]/,
    ㅂ: /[바-빟]/,
    ㅅ: /[사-싷]/,
    ㅇ: /[아-잏]/,
    ㅈ: /[자-짛]/,
    ㅊ: /[차-칳]/,
    ㅋ: /[카-킿]/,
    ㅌ: /[타-팋]/,
    ㅍ: /[파-핗]/,
    ㅎ: /[하-힣]/,
  };

  if (!name || typeof name !== 'string' || name.length === 0) {
    return '기타';
  }

  const firstChar = name.charAt(0);

  for (let initial in initialMap) {
    if (initialMap[initial].test(firstChar)) {
      return initial;
    }
  }

  return '기타';
};

const splitDesignerNames = (designerString) => {
  return designerString.split(',').map((name) => name.trim());
};

function IndexPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [randomName, setRandomName] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [hoveredImage, setHoveredImage] = useState({ visible: false, x: 0, y: 0, src: '' });
  const navigate = useNavigate();

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [hoveredId, setHoveredId] = useState(null); // 현재 호버된 StudentName의 ID 저장

  // Firestore에서 'projects' 컬렉션의 모든 문서 불러오기
  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      try {
        // Firestore에서 'projects' 컬렉션의 모든 문서 불러오기
        const q = query(collection(db, "newProjects"), orderBy("title", "asc"));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
          console.log("프로젝트 데이터가 없습니다.");
        } else {
          const allPosts = [];

          querySnapshot.docs.forEach(doc => {
            const data = doc.data();

            // teamMembers 배열을 순회하여 각 팀원에 대한 정보를 분리
            if (data.teamMembers && data.teamMembers.length > 0) {
              data.teamMembers.forEach((member) => {
                allPosts.push({
                  id: member.sId || '',           // 팀원 아이디
                  name: member.name || '',           // 팀원 이름
                  englishName: member.englishName || '', // 팀원 영어 이름
                  projectId: data.projectId,          // 프로젝트 ID
                });
              });
            }
          });

          console.log("index페이지에 가져온 데이터:", allPosts); // 불러온 데이터를 로그로 확인
          setPosts(allPosts); // posts 상태에 저장
        }
      } catch (error) {
        console.error("프로젝트 데이터를 불러오는 중 오류 발생:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };
  console.log("randomName")
  console.log(randomName)
  useEffect(() => {
    if (!loading) { // 로딩이 완료되면 실행
      const designerList = [];

      posts.forEach((post, index) => {
        const initial = getInitial(post.name); // 디자이너 이름에서 이니셜 추출

        console.log("post")
        console.log(post)
        if (initial !== '기타') {
          designerList.push({
            id: post.id,
            name: post.name,
            englishName: post.englishName,
            initial: initial,
            projectId: post.projectId,
          });
        }
      });

      setRandomName(designerList);

      const filtered = designerList.filter((entry) =>
        entry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entry.englishName.toLowerCase().includes(searchTerm.toLowerCase())
      );


      // filtered.sort((a, b) => {
      //   const choOrder = 'ㄱㄴㄷㄹㅁㅂㅅㅇㅈㅊㅋㅌㅍㅎ';
      //   return choOrder.indexOf(a.initial) - choOrder.indexOf(b.initial);
      // });

      filtered.sort((a, b) => a.name.localeCompare(b.name));

      setFilteredData(filtered);
    }
  }, [loading, searchTerm, posts]); // loading, searchTerm, posts가 변경될 때 실행

  const totalDesigners = filteredData.length;

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleNameClick = (postNumber) => {
    navigate(`/projects/${postNumber}`);
  };

  const handleMouseEnter = (e, imageSrc, id) => {
    setHoveredId(id); // 마우스를 올린 StudentName의 ID 저장
    setHoveredImage({ visible: true, x: e.clientX, y: e.clientY, src: imageSrc });
  };

  const handleMouseLeave = () => {
    setHoveredId(null); // 마우스가 떠나면 hoveredId를 null로 설정
    setHoveredImage({ visible: false, x: 0, y: 0, src: '' });
  };

  const groupedByInitial = filteredData.reduce((acc, { id, name, englishName, initial, projectId }) => {
    if (!acc[initial]) acc[initial] = [];
    acc[initial].push({ id, name, englishName, projectId });
    return acc;
  }, {});

  return (
    <PageWrapper>
      <Sidenav />
      <TopBarContainer>
        <TopBar>
          <DesignerCount>DESIGNERS ({totalDesigners})</DesignerCount>
          <SearchBarWrapper>
            <SearchBar onSearch={handleSearch} />
          </SearchBarWrapper>
        </TopBar>
      </TopBarContainer>
      <LeftSection>
        <GridContainer>
          <IconGrid>
            {randomName.map((designer) => (
              <SnowflakeIcon
                key={designer.id}
                src={`/iceflower/icycle${designer.id}.png`}
                style={{
                  opacity: hoveredId && hoveredId !== designer.id ? 0.2 : 1, // hoveredId와 일치하지 않으면 투명도 0.5
                  transition: 'opacity 0.3s ease' // 부드러운 전환 효과
                }}
              />
            ))}
          </IconGrid>
        </GridContainer>
      </LeftSection>

      <ContentWrapper>
        <IndexContent>
          <RightSection>
            {Object.entries(groupedByInitial).map(([initial, designers]) => (
              <InitialList key={initial}>
                <NameSection>{`${initial} (${designers.length})`}</NameSection>
                <StudentNames>
                  {designers.map(({ id, name, englishName, projectId }) => (
                    <StudentName
                      key={id}
                      onClick={() => handleNameClick(projectId)}
                      onMouseEnter={(e) => handleMouseEnter(e, `/profilelow/low${id}.jpg`, id)}
                      onMouseLeave={handleMouseLeave}
                      dangerouslySetInnerHTML={{ __html: `${name}&nbsp;&nbsp;&nbsp;${englishName}` }}
                    />

                  ))}
                </StudentNames>
              </InitialList>
            ))}
          </RightSection>
        </IndexContent>
      </ContentWrapper>

      <HoverImage
        src={hoveredImage.src}
        x={hoveredImage.x}
        y={hoveredImage.y}
        visible={hoveredImage.visible}
      />
    </PageWrapper>
  );
}

export default IndexPage;
