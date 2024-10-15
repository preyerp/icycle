import React, { useState, useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import PopupChat from '../ui/PopupChat';
import Sidenav from '../ui/Sidenav';
import data from '../../data/data.json';
import Footer from '../ui/Footer';

// 슬라이드 인 애니메이션 (오른쪽에서 왼쪽으로)
const slideIn = keyframes`
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(0);
  }
`;

// 슬라이드 아웃 애니메이션 (왼쪽에서 오른쪽으로)
const slideOut = keyframes`
  0% {
    transform: translateX(0);
    opacity: 1;
  }
  100% {
    transform: translateX(100%);
    opacity: 0;
  }
`;

// 팝업 배경 오버레이
const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.15); // 투명도 15%의 검은색
  z-index: 999; // 팝업보다 아래에 배치되도록 z-index 설정

  @media (max-width: 768px) {
    display: none;
  }
`;

// PopupChat 애니메이션 적용
const AnimatedPopupChat = styled.div`
  position: fixed;
  right: 0;
  top: 0;
  height: 100vh;
  width: 400px;
  background-color: white;
  z-index: 1000; // 팝업이 오버레이보다 위에 표시되도록 z-index 설정
  animation: ${({ isClosing }) => (isClosing ? slideOut : slideIn)} 0.5s ease-in-out;

  @media (max-width: 768px) {
    width: 100%; /* 모바일에서는 전체 너비를 차지 */
  }
`;

// GuestbookWrapper에 flex 레이아웃 적용
const GuestbookWrapper = styled.div`
  width: 100%;
  margin: 0 auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  padding-top: 134px;
  align-items: center;
  min-height: 100vh; /* 화면 전체 높이 사용 */
  justify-content: space-between; /* 푸터를 아래에 고정 */

  @media (max-width: 768px) {
    padding-top: 100px; /* 모바일에서는 패딩 조정 */
  }
`;

const HeaderWrapper = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  margin-bottom: 80px;

  @media (max-width: 768px) {
    justify-content: space-between;
    margin-bottom: 54px;
  }
`;

const GuestTitle = styled.h2`
  font-size: 14px;
  width: 20%;
  font-weight: 500;
  margin-right: 56%;

  @media (max-width: 768px) {
    margin-right: 0;
    font-size: 12px;
  }
`;

const SendMessageButton = styled.button`
  background-color: #ffffff;
  color: #000000;
  padding: 6px 8px;
  border: 2px solid #000;
  cursor: pointer;
  font-size: 14px;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  gap: 2px;
  transition: all ease .2s;

  &:hover {
    background-color:#000;
    color: #fff;
  }

  @media (max-width: 768px) {
    font-size: 12px;
  }
`;

// CommentListWrapper에 flex-grow를 추가해 유연한 영역을 채움
const CommentListWrapper = styled.div`
  width: 100%;
  margin-top: 24px;
  display: flex;
  flex-direction: column;
  flex-grow: 1; /* 유연한 공간을 채워 화면에 꽉 차도록 */
  margin-bottom: 80px;
  @media (max-width: 768px) {
    margin-top: 16px; /* 모바일에서 여백 조정 */
  }
`;

const CommentItem = styled.div`
  margin-bottom: 32px;

  @media (max-width: 768px) {
    margin-bottom: 24px;
  }
`;

const CommentDetail = styled.div`
  display: flex;
  justify-content: space-between;
  width: 34%;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const CommentHeader = styled.div`
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const CommentAuthor = styled.p`
  width: 58.8%;

  @media (max-width: 768px) {
    width: 50%;
  }
`;

const CommentReceiver = styled.div`
  width: 20%;
  display: flex;
  align-items: center;
  gap: 5px;

  @media (max-width: 768px) {
    width: 100%;
    margin-bottom: 16px;
  }
`;

const CommentBody = styled.p`
  padding-right: 5%;
  line-height: 1.6;
  width: 36%;

  @media (max-width: 768px) {
    width: 100%;
    padding-right: 0;
    margin-bottom: 12px;
  }
`;

const CommentDate = styled.span`
  width: 41.2%;

  @media (max-width: 768px) {
    width: 50%;
    text-align: right;
  }
`;

const DroprealWrap = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 100%;
`;

const DropdownWrapper = styled.div`
  position: relative;
  display: inline-block;
  width: 80px;
  cursor: pointer;
  margin: 0;
`;

const DropdownButton = styled.div`
  font-size: 14px;
  color: #000;
  background: none;
  border: none;
  position: relative;
  padding: 5px 5px 5px 0;
  cursor: pointer;
  text-align: left;

  &:after {
    content: '▼';
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 10px;
    color: #000;
  }
`;

const DropdownMenu = styled.ul`
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
  position: absolute;
  background-color: #000;
  color: #fff;
  padding: 0;
  list-style: none;
  margin: 0;
  width: 80px;
  max-height: 300px;
  overflow-y: auto;
  text-align: center;

  &::-webkit-scrollbar {
    width: 5px;
  }

  &::-webkit-scrollbar-track {
    background: #000;
  }

  &::-webkit-scrollbar-thumb {
    background: #a9a9a9;
    border-radius: 10px;
  }
`;

const DropdownItem = styled.li`
  padding: 10px;
  border-bottom: 1px solid #fff;
  cursor: pointer;

  &:hover {
    background-color: #fff;
    color: #000;
  }
`;

const Icon = styled.span`
  font-size: 20px;
  color: #000000;
  margin-right: 5px;
`;

function Guestbook() {
  const [showPopup, setShowPopup] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const dropdownRef = useRef(null);

  const [commentList, setCommentList] = useState([
    {
      id: 1,
      receiver: '홍길동',
      author: '김철수',
      body: '전시회 너무 좋았습니다!',
      date: '2024-09-24',
    },
    {
      id: 2,
      receiver: '박지성',
      author: '이영희',
      body: '작품이 인상 깊었어요!',
      date: '2024-09-25',
    },
  ]);

  const [filteredReceiver, setFilteredReceiver] = useState('SELECT');
  const [receiverList, setReceiverList] = useState([]);

  useEffect(() => {
    const receiversFromData = data.reduce((acc, item) => {
      const designers = item.designer.split(',').map((name) => name.trim());
      return [...acc, ...designers];
    }, []);

    const uniqueReceivers = [...new Set(receiversFromData)].sort();
    setReceiverList(['SELECT', ...uniqueReceivers]);
  }, []);

  const addComment = (receiver, author, body) => {
    const newComment = {
      id: commentList.length + 1,
      receiver,
      author,
      body,
      date: new Date().toLocaleDateString(),
    };
    setCommentList([...commentList, newComment]);
  };

  const toggleDropdown = (e) => {
    e.stopPropagation();
    setDropdownOpen(!dropdownOpen);
  };

  const handleReceiverSelect = (receiver) => {
    setFilteredReceiver(receiver);
    setDropdownOpen(false);
  };

  const handleOutsideClick = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleOutsideClick);
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  const filteredComments = filteredReceiver === 'SELECT'
    ? commentList
    : commentList.filter((comment) => comment.receiver === filteredReceiver);

  const handleClosePopup = () => {
    setIsClosing(true); // 닫히는 상태로 변경
  };

  const handleAnimationEnd = () => {
    if (isClosing) {
      setShowPopup(false); // 애니메이션이 끝나면 PopupChat을 숨김
      setIsClosing(false); // 초기화
    }
  };

  return (
    <GuestbookWrapper>
      <Sidenav />
      <HeaderWrapper>
        <GuestTitle>Guest({filteredComments.length})</GuestTitle>
        <SendMessageButton onClick={() => setShowPopup(true)}>Send Message<span className="material-symbols-outlined" style={{ fontSize: '16px',paddingBottom:'1px'}}>
            arrow_forward
          </span></SendMessageButton>
      </HeaderWrapper>
      <DroprealWrap>
        <DropdownWrapper ref={dropdownRef} className="dropdown-wrapper">
          <DropdownButton onClick={toggleDropdown}>
            {filteredReceiver}
          </DropdownButton>
          <DropdownMenu isOpen={dropdownOpen}>
            {receiverList.map((receiver, index) => (
              <DropdownItem key={index} onClick={() => handleReceiverSelect(receiver)}>
                {receiver}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </DropdownWrapper>
      </DroprealWrap>

      <CommentListWrapper>
        {filteredComments.map((comment) => (
          <CommentItem key={comment.id}>
            <CommentHeader>
              <CommentReceiver>
                <Icon>❄️</Icon>
                {comment.receiver}
              </CommentReceiver>
              <CommentBody>{comment.body}</CommentBody>
              <CommentDetail>
                <CommentAuthor>From. {comment.author}</CommentAuthor>
                <CommentDate>{comment.date}</CommentDate>
              </CommentDetail>
            </CommentHeader>
          </CommentItem>
        ))}
      </CommentListWrapper>

      {showPopup && (
        <>
          <Overlay /> {/* 오버레이 추가 */}
          <AnimatedPopupChat
            isClosing={isClosing}
            onAnimationEnd={handleAnimationEnd} // 애니메이션 종료 시점 확인
          >
            <PopupChat closePopup={handleClosePopup} addComment={addComment} />
          </AnimatedPopupChat>
        </>
      )}
      <Footer />
    </GuestbookWrapper>
  );
}

export default Guestbook;
