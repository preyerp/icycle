import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import PostList from '../list/PostList';
import PostViewPage from './PostViewPage'; // PostViewPage 추가
import Sidenav from '../ui/Sidenav';
import BottomTxt from '../ui/BottomTxt.jsx';
import importedData from '../../data/data.json';
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../../firebase"; // Firebase Firestore 연결

const RealWrap = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #fff;
  margin: 0 auto;
  /* display: flex;
  flex-direction: column;*/
  padding-top: 34px;
`;

const Container = styled.div`
  width: 100%;
  height: calc(100vh - 126px);
  margin-top: 54px;
  background-color: #fff;
  box-sizing: border-box;
  position: fixed;

  
`;

const EmptyBox = styled.div`
  width: 100%;
  height: ${props => props.height};
  background-color: red;
`;

function Mainpage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedColor, setSelectedColor] = useState('#000000'); // 기본 색상 설정
  const [selectedPost, setSelectedPost] = useState(null); // 선택된 게시물 상태 추가

  // useEffect(() => {
  //   // Import data and set it in the state
  //   setPosts(importedData);
  // }, []);

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
          const allPosts = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));

          console.log("가져온 데이터:", allPosts); // 불러온 데이터를 로그로 확인
          setPosts(allPosts);
        }
      } catch (error) {
        console.error("프로젝트 데이터를 불러오는 중 오류 발생:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);


  const handleCategorySelect = (category, color) => {
    // Update selected category and color
    setSelectedCategory(category);
    setSelectedColor(color);
  };

  const handlePostClick = (postId) => {
    // PostList에서 게시물이 클릭될 때 호출
    const post = posts.find(p => p.id === postId);
    setSelectedPost(post); // 선택된 게시물을 저장
  };

  const handleBackToList = () => {
    setSelectedPost(null); // 다시 목록으로 돌아가는 함수
  };

  return (
    <RealWrap>
      <Sidenav />
      {/* <EmptyBox height={'80px'}></EmptyBox> */}
      <Container>
        {selectedPost === null ? (
          <PostList
            posts={posts}
            selectedCategory={selectedCategory} // 선택된 카테고리 전달
            onCategorySelect={handleCategorySelect}
            onPostClick={handlePostClick}  // 게시물 클릭 시 호출
          />
        ) : (
          <PostViewPage post={selectedPost} onBack={handleBackToList} />  // 선택된 게시물 전달 및 돌아가기 함수 전달
        )}
      </Container>
      <BottomTxt categoryText={selectedCategory} colorHex={selectedColor} />
    </RealWrap>
  );
}

export default Mainpage;
