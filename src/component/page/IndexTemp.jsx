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
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #fff;
`;

const IndexContent = styled.div`
  margin-top: 80px;
`;

const TopBar = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 15px;
  box-sizing: border-box;
  z-index: 100;
  font-weight: 500;
`;

const DesignerCount = styled.div`
  font-size: 14px;
  margin-left: 56%;
  width: 20%;
  font-weight: 500;

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
  display: flex;
  width: 100%;
  padding: 0 15px;
  margin-top: 80px;
`;

const LeftSection = styled.div`
  width: 56%;
  display: flex;
  justify-content: center;
  align-items: start;
  padding-top: 5vh;

  @media (max-width: 768px) {
    display: none;
  }
`;

const IconGrid = styled.div`
  display: grid;
  position: fixed;
  grid-template-columns: repeat(10, 1fr);
  grid-template-rows: repeat(9, 1fr);
  grid-gap: 11px;
`;

const SnowflakeIcon = styled.div`
  width: 30px;
  height: 30px;
  background-color: #000000;
  border-radius: 50%;
`;

const RightSection = styled.div`
  width: 44%;
  overflow-y: auto;

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
  &:hover {
    color: #999999;
  }

  @media (max-width: 768px) {
    font-size: 12px;
    padding-bottom: 8px;
  }
`;

const HoverImage = styled.div`
  position: fixed;
  top: ${(props) => props.y + 10}px;
  left: ${(props) => props.x + 20}px;
  width: 120px;
  height: 180px;
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
  const [filteredData, setFilteredData] = useState([]);
  const [hoveredImage, setHoveredImage] = useState({ visible: false, x: 0, y: 0, src: '' });
  const navigate = useNavigate();

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Firestore에서 'projects' 컬렉션의 모든 문서 불러오기
  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      try {
        // Firestore에서 'projects' 컬렉션의 모든 문서 불러오기
        const q = query(collection(db, "projects"), orderBy("title", "asc"));
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



  useEffect(() => {
    const designerList = [];

    posts.forEach(post => {
      const initial = getInitial(post.name); // 디자이너 이름에서 이니셜 추출
      if (initial !== '기타') {
        designerList.push({
          name: post.name,
          englishName: post.englishName,
          initial: initial,
          projectId: post.projectId
        });
      }
    });

    const filtered = designerList.filter((entry) =>
      entry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.englishName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    console.log("filtered")
    console.log(filtered)
    filtered.sort((a, b) => {
      const choOrder = 'ㄱㄴㄷㄹㅁㅂㅅㅇㅈㅊㅋㅌㅍㅎ';
      return choOrder.indexOf(a.initial) - choOrder.indexOf(b.initial);
    });

    setFilteredData(filtered);
  }, [searchTerm]);

  const totalDesigners = filteredData.length;

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleNameClick = (postNumber) => {
    navigate(`/projects/${postNumber}`);
  };

  const handleMouseEnter = (e, imageSrc) => {
    setHoveredImage({ visible: true, x: e.clientX, y: e.clientY, src: imageSrc });
  };

  const handleMouseLeave = () => {
    setHoveredImage({ visible: false, x: 0, y: 0, src: '' });
  };

  const groupedByInitial = filteredData.reduce((acc, { designer, engname, initial, id }) => {
    if (!acc[initial]) acc[initial] = [];
    acc[initial].push({ designer, engname, id });
    return acc;
  }, {});

  return (
    <PageWrapper>
      <Sidenav />
      <IndexContent>
        <TopBar>
          <DesignerCount>DESIGNERS ({totalDesigners})</DesignerCount>
          <SearchBarWrapper>
            <SearchBar onSearch={handleSearch} />
          </SearchBarWrapper>
        </TopBar>

        <ContentWrapper>
          <LeftSection>
            <IconGrid>
              {Array.from({ length: 90 }).map((_, index) => (
                <SnowflakeIcon key={index} />
              ))}
            </IconGrid>
          </LeftSection>

          <RightSection>
            {Object.entries(groupedByInitial).map(([initial, designers]) => (
              <InitialList key={initial}>
                <NameSection>{`${initial} (${designers.length})`}</NameSection>
                <StudentNames>
                  {designers.map(({ designer, engname, id }) => (
                    <StudentName
                      key={id}
                      onClick={() => handleNameClick(id)}
                      onMouseEnter={(e) => handleMouseEnter(e, 'https://via.placeholder.com/240x360')}
                      onMouseLeave={handleMouseLeave}
                      dangerouslySetInnerHTML={{ __html: `${designer}&nbsp;&nbsp;&nbsp;${engname}` }}
                    />

                  ))}
                </StudentNames>
              </InitialList>
            ))}
          </RightSection>
        </ContentWrapper>
      </IndexContent>

      {/* Hover Image */}
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
