import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import CategoryBar from '../ui/CategoryBar';
import SearchBar from '../ui/SearchBar';
import MobileCategoryBar from '../ui/MobileCategoryBar';
import ImageGrid from './ImageGrid';

const RealWrap = styled.div`
  width: 100%;
  height: 100%;
  background-color: #fff;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: #fff;
  position: relative;
  overflow-y: scroll;
`;

const TableRow = styled.div`
  display: flex;
  box-sizing: border-box;
  font-weight: 500;
  align-items: center;
  margin-bottom: ${props => props.marginBottom || '0px'};
  padding-bottom: ${props => props.paddingBottom || '0px'};
  padding-left: ${props => props.paddingLeft || '0px'};
  padding-right: ${props => props.paddingRight || '0px'};
  position: relative;
  z-index: 10;
  cursor: pointer;
  

  @media (max-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: start;
    width: 100%;
    margin-bottom: ${props => props.MmarginBottom || '0px'};
  }
`;
const TableRow2 = styled.div`
  display: flex;
  box-sizing: border-box;
  font-weight: 500;
  align-items: center;
  margin-bottom: ${props => props.marginBottom || '0px'};
  padding-bottom: ${props => props.paddingBottom || '0px'};
  padding-left: ${props => props.paddingLeft || '0px'};
  padding-right: ${props => props.paddingRight || '0px'};
  position: relative;
  z-index: 10;
  cursor: pointer;
  
  &:hover {
    color: #999999;
  }

  @media (max-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: start;
    width: 100%;
    margin-bottom: ${props => props.MmarginBottom || '0px'};
  }
`;

const TableCell = styled.div`
  box-sizing: border-box;
  width: ${props => props.width || '25%'};
  text-align: left;
  font-weight: 500;
  position: relative;
  z-index: 10;

  @media (max-width: 768px) {
    width: ${props => props.mobileWidth || '33%'};
    font-size: 12px;
    text-align: ${props => props.textAlign || 'left'};
    ${props => props.hideOnMobile && 'display: none;'} /* 모바일에서 숨김 처리 */
  }
`;

const CardUI = styled.div`
  text-align: left;
  font-weight: 500;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const HoverImage = styled.div`
  position: absolute;
  display: ${props => (props.visible ? 'block' : 'none')};
  top: ${props => `${props.y}px`};
  left: ${props => `${props.x}px`};
  z-index: 5;
  width: ${props => `${props.width}px`};
  height: ${props => `${props.height}px`};
  background-image: url(${props => props.src});
  background-size: cover;
  background-repeat: no-repeat;
  pointer-events: none;
`;

const Arrow = styled.span`
  display: inline-block;
  width: 0;
  height: 0;
  margin-left: 8px;
  vertical-align: middle;
  border-left: ${props => props.size || '4px'} solid transparent;
  border-right: ${props => props.size || '4px'} solid transparent;
  border-top: ${props => props.size || '4px'} solid ${props => props.color || '#000'};
  transform: ${props => (props.direction === 'up' ? 'rotate(180deg)' : 'none')};
`;

const GridWrapper = styled.div`
  display: grid;

  @media (min-width: 769px) {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    row-gap: 80px;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr 1fr;
    column-gap: 0;
    row-gap: 24px;
    font-size: 12px;
  }
`;

const MobileCategoryContainer = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: ${props => (props.isMobileCategoryVisible ? 'block' : 'none')};
    width: 100%;
    padding: 10px 0;
  }
`;

const NumberSearchWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    margin-top: 10px;
    margin-bottom: 24px;
  }
`;

const TNumberSearchWrapper = styled.div`
  width: 20%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    margin-top: 10px;
    margin-bottom: 24px;
  }
`;

const DesktopSearchBarWrapper = styled.div`
  @media (max-width: 768px) {
    display: none;
  }
`;


const ProjImg = styled.img`
  transition: filter 0.3s ease; /* 부드럽게 변화하도록 트랜지션 추가 */

  &:hover {
    filter: grayscale(100%);
  }
`;
const MobileSearchBarWrapper = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: block;
  }
`;
const FixTop = styled.div`
  position: static;
  top:0;
  width: 100%;

  @media (max-width: 768px) {
  }
`;



function PostList({ posts, onCategorySelect }) {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState('IMG');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [hoverImage, setHoverImage] = useState({ visible: false, src: '', x: 0, y: 0, width: 200, height: 150 });
  const [sortOrder, setSortOrder] = useState('asc');
  const [searchTerm, setSearchTerm] = useState('');
  const [isMobileCategoryVisible, setIsMobileCategoryVisible] = useState(false);

  const [test, setTest] = useState(''); //썸네일테스트용

  useEffect(() => {
    updateFilteredPosts(posts, selectedCategory, searchTerm);

  }, [posts, selectedCategory, sortOrder, searchTerm]);

  const updateFilteredPosts = useCallback((posts, category, searchTerm) => {  // 필터함수같고
    console.log(category)
    let filtered = [];
    if (category === 'all') {
      filtered = posts;
    } else if (category === 'ai & robot') {
      filtered = posts.filter(post => post.projectId.startsWith('A'));
    } else if (category === 'education & kids') {
      filtered = posts.filter(post => post.projectId.startsWith('E'));
    } else if (category === 'health care') {
      filtered = posts.filter(post => post.projectId.startsWith('H'));
    } else if (category === 'it & tech') {
      filtered = posts.filter(post => post.projectId.startsWith('I'));
    } else if (category === 'living') {
      filtered = posts.filter(post => post.projectId.startsWith('L'));
    } else if (category === 'mobility') {
      filtered = posts.filter(post => post.projectId.startsWith('M'));
    }

    if (searchTerm) {
      filtered = filtered.filter(post => {
        const matchesTitle = post.title.toLowerCase().includes(searchTerm.toLowerCase());

        // 팀원이 여러 명일 경우에도 처리
        const matchesDesigner = post.teamMembers.some(member =>
          member.name.toLowerCase().includes(searchTerm.toLowerCase())
        );

        const matchesSubheading = viewMode === 'TXT' && post.subtitle.toLowerCase().includes(searchTerm.toLowerCase());

        return matchesTitle || matchesDesigner || matchesSubheading;
      });
    }

    filtered = sortPosts(filtered);
    setFilteredPosts(filtered);
  }, [sortOrder, viewMode]);

  const sortPosts = (posts, order = sortOrder) => { // 정렬 함수 같고
    return posts.sort((a, b) => {
      if (a.projectId.charAt(0) !== b.projectId.charAt(0)) {
        return order === 'asc'
          ? a.projectId.charAt(0).localeCompare(b.projectId.charAt(0))
          : b.projectId.charAt(0).localeCompare(a.projectId.charAt(0));
      }
      return order === 'asc'
        ? compareNumbers(a.projectId, b.projectId)
        : compareNumbers(b.projectId, a.projectId);
    });
  };

  const compareNumbers = (num1, num2) => {
    const parseNumber = (num) => parseInt(num.replace(/[^0-9]/g, ''), 10) || 0;
    return parseNumber(num1) - parseNumber(num2);
  };

  const handleViewToggle = () => {
    setViewMode(prevMode => (prevMode === 'IMG' ? 'TXT' : 'IMG'));
  };

  const handleCategorySelect = (category, color) => {
    setSelectedCategory(category);
    if (typeof onCategorySelect === 'function') {
      onCategorySelect(category, color);
    }
  };

  const handleSortChange = () => {
    const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    setSortOrder(newSortOrder);
    const sortedPosts = sortPosts([...filteredPosts], newSortOrder);
    setFilteredPosts(sortedPosts);
  };

  const handleMouseEnter = (imageSrc, originalWidth, originalHeight) => {
    // 현재 스크롤 위치
    const scrollX = window.scrollX;
    const scrollY = window.scrollY;

    // 랜덤 좌표 설정 (화면 내 위치에 이미지 표시)
    const x = scrollX + Math.random() * (window.innerWidth - originalWidth);
    const y = scrollY + Math.random() * (window.innerHeight - originalHeight);
    console.log("scrollY")
    console.log(scrollY)
    console.log("x,y")
    console.log(x, y)

    setHoverImage({
      visible: true,
      src: imageSrc,
      x,
      y,
      width: originalWidth,
      height: originalHeight,
    });
  };



  const handleMouseLeave = () => {
    setHoverImage({ visible: false, src: '', x: 0, y: 0, width: 200, height: 150 });
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handlePostClick = (postNumber) => {
    navigate(`/projects/${postNumber}`);
  };


  return (
    <RealWrap>
      <FixTop>
        {/* 상단: CategoryBar, SearchBar */}
        <TableRow style={{}} marginBottom="36px" MmarginBottom="54px" paddingLeft="15px" paddingRight="15px">
          <TableCell width="20%" mobileWidth='52%'>Projects ({filteredPosts.length})</TableCell>
          <TableCell width="36%" mobileWidth='30%' onClick={() => setIsMobileCategoryVisible(!isMobileCategoryVisible)}>
            <CategoryBar
              width="100%"
              selectedCategory={selectedCategory}
              onCategorySelect={handleCategorySelect}
            />
          </TableCell>
          <TableCell width="20%" mobileWidth='18%' textAlign='right'>
            {/* 모드 전환 버튼 */}
            <span
              onClick={handleViewToggle}
              style={{ cursor: 'pointer', color: viewMode === 'IMG' ? '#000' : '#888' }}
            >
              IMG
            </span>
            <span> / </span>
            <span
              onClick={handleViewToggle}
              style={{ cursor: 'pointer', color: viewMode === 'TXT' ? '#000' : '#888' }}
            >
              TXT
            </span>
          </TableCell>
          {/* 기존 SearchBar는 데스크탑에서만 보이게 */}
          <DesktopSearchBarWrapper >
            <SearchBar width="200px" onSearch={handleSearch} />
          </DesktopSearchBarWrapper>
        </TableRow>

        {/* 모바일에서만 카테고리 바 보이기 */}
        <MobileCategoryContainer isMobileCategoryVisible={isMobileCategoryVisible}>
          <MobileCategoryBar selectedCategory={selectedCategory} onCategorySelect={handleCategorySelect} />
        </MobileCategoryContainer>
      </FixTop>

      {viewMode === 'TXT' && (
        <>
          <TableRow key="header" marginBottom="24px" paddingLeft="15px" paddingRight="15px">
            <TNumberSearchWrapper>
              <TableCell width="50%" onClick={handleSortChange}>
                Number
                <Arrow direction={sortOrder === 'asc' ? 'down' : 'up'} color="#000" size="5px" />
              </TableCell>
              <MobileSearchBarWrapper>
                <SearchBar width="100px" textAlign='left' onSearch={handleSearch} />
              </MobileSearchBarWrapper>
            </TNumberSearchWrapper>
            <TableCell width="36%" hideOnMobile>Subtitle</TableCell>
            <TableCell width="20%" hideOnMobile>Title</TableCell>
            <TableCell width="24%" hideOnMobile>Designer</TableCell>
          </TableRow>
        </>
      )}

      {viewMode === 'IMG' && (
        <>
          <TableRow key="sort-button" paddingLeft="15px" paddingRight="15px" marginBottom="24px">
            <NumberSearchWrapper>
              <TableCell onClick={handleSortChange}>
                Number
                <Arrow direction={sortOrder === 'asc' ? 'down' : 'up'} color="#000" size="5px" />
              </TableCell>
              <MobileSearchBarWrapper>
                <SearchBar width="100px" textAlign='left' onSearch={handleSearch} />
              </MobileSearchBarWrapper>
            </NumberSearchWrapper>
          </TableRow>
        </>
      )}
      <Container>
        {viewMode === 'TXT' && (
          <>
            {filteredPosts.map((post, index) => (
              <TableRow2
                paddingLeft="5px"
                paddingRight="15px"
                paddingBottom="10px"
                hoverColor="#9d9d9d"
                key={post.projectId}
                onMouseEnter={() => handleMouseEnter(`/thumbs/${post.projectId}.jpg`, 270, 360)}
                // onMouseEnter={() => handleMouseEnter(Math.random() < 0.5 ? post.images.thumbnail : post.images.mainImage)}
                // onMouseEnter={() => handleMouseEnter(Math.random() < 0.5 ? post.images.thumbnail : test)}
                onMouseLeave={handleMouseLeave}
                onClick={() => handlePostClick(post.projectId)}
                style={{ marginBottom: index === filteredPosts.length - 1 ? '50px' : '0px' }}
              >
                <TableCell width="20%">{post.projectId || 'N/A'}</TableCell>
                {/* 모바일에서 subheading 숨김 */}
                <TableCell width="36%" hideOnMobile={true}>{post.subtitle || 'N/A'}</TableCell>
                <TableCell width="20%">{post.title || 'N/A'}</TableCell>
                <TableCell textAlign='right' width="24%">
                  {post.teamMembers?.map((member, index) => (
                    <div key={index} style={{ float: 'right', whiteSpace: 'pre-wrap' }}>
                      {member.name + "  " || 'N/A'}
                    </div>
                  ))}
                </TableCell>
              </TableRow2>
            ))}
          </>
        )}

        {viewMode === 'IMG' && (
          <>
            <GridWrapper style={{ marginBottom: '100px' }}>
              {filteredPosts.map(post => (
                <>
                  {/* {post.projectId === 'A01' && setTest(post.images.thumbnail)} */}
                  <CardUI
                    key={post.projectId}
                    onClick={() => handlePostClick(post.projectId)}
                  >
                    <ProjImg
                      src={`/thumbs/${post.projectId}.jpg`}
                      // src={test}
                      alt={post.title}
                      // loading="lazy"
                      style={{
                        width: '100%',
                        height: 'auto',
                        aspectRatio: '3.2 / 4.2',
                        objectFit: 'cover',
                        marginBottom: '16px'
                      }}
                    />
                    <div style={{ paddingLeft: '15px', lineHeight: '1.4', marginBottom: '8px', fontWeight: '500' }}>
                      <div>{post.projectId || 'N/A'}</div>
                      <div>{post.title || 'N/A'}</div>
                    </div>
                    <div style={{ paddingLeft: '15px', fontSize: '14px', color: '#000000' }}>
                      {post.teamMembers?.map((member, index) => (
                        <div key={index} style={{ float: 'left', whiteSpace: 'pre-wrap' }}>
                          {member.name + "  " || 'N/A'}
                        </div>
                      ))}
                    </div>
                  </CardUI>
                </>
              ))}
            </GridWrapper>
          </>
        )}

        <HoverImage
          visible={hoverImage.visible}
          src={hoverImage.src}
          x={hoverImage.x}
          y={hoverImage.y}
          width={hoverImage.width}
          height={hoverImage.height}
        // width={"428px"}
        // height={"320px"}
        />
      </Container>
    </RealWrap>
  );
}

export default PostList;
