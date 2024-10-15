import React, { useState, useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import PopupChat from '../ui/PopupChat';
import Sidenav from '../ui/Sidenav';
import Footer from '../ui/Footer';
import { db } from "../../firebase"; // Firebase Firestore 연결
import { collection, Timestamp, addDoc, getDocs, query, where, orderBy } from 'firebase/firestore';



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
  opacity: ${({ isClosing }) => (isClosing ? 0 : 1)};
  transition: all 0.5s ease;

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
  opacity: ${({ isClosing }) => (isClosing ? 0 : 1)};
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
  font-weight: 400;
  margin-right: 56%;

  @media (max-width: 768px) {
    margin-right: 0;
    font-size: 12px;
  font-weight: 400;
  }
`;

const SendMessageButton = styled.button`
  background-color: #ffffff;
  color: #000000;
  padding: 6px 8px;
  border: 1.5px solid #000;
  cursor: pointer;
  font-size: 14px;
  text-transform: uppercase;
  display: flex;
  align-items: center;
    justify-content: center;
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
  height: 40vh;
  margin-top: 24px;
  display: flex;
  flex-direction: column;
  flex-grow: 1; /* 유연한 공간을 채워 화면에 꽉 차도록 */
  overflow-y: scroll;
  margin-bottom: 20px;
  @media (max-width: 768px) {
    margin-top: 16px; /* 모바일에서 여백 조정 */
  margin-bottom: 0px;
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
    margin-bottom:24px;
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
  color: #999999;

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
  @media (max-width: 768px) {
  width: 70px;
  }
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
  @media (max-width: 768px) {
  font-size: 12px;
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
const StudentImage = styled.img`
  width: 100%;
  height: auto;
  object-fit: cover;
  display: block;
  box-sizing: border-box;
`;
const Icon = styled.img`
  width: 20px;
  height: auto;
  object-fit: cover;
  margin-right: 5px;
`;

function Guestbook() {
  const [showPopup, setShowPopup] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const dropdownRef = useRef(null);

  const [filteredReceiver, setFilteredReceiver] = useState('SELECT');


  const [nameData, setNameData] = useState([]);
  const [messages, setMessages] = useState([]);
  const [filteredMessages, setFilteredMessages] = useState([]); // 필터링된 메시지 저장

  const [refreshCount, setRefreshCount] = useState(0); // 부모 컴포넌트의 상태


  useEffect(() => {
    fetchDesigners();
    fetchAllMessages();
  }, []);

  useEffect(() => {
    fetchAllMessages();
  }, [refreshCount]);

  // Firestore에서 디자이너 목록 불러오기
  const fetchDesigners = async () => {
    try {
      const designerCollection = collection(db, 'designers');
      const designerSnapshot = await getDocs(designerCollection);

      // 디자이너 목록과 이름 배열을 동시에 생성
      const designerList = designerSnapshot.docs.map((doc) => ({
        id: doc.id,
        name: doc.data().name,
      }));

      const nameArrayTemp = designerList.map(designer => designer.name); // name 필드만 추출한 배열

      const nameData = nameArrayTemp.sort((a, b) => a.localeCompare(b, "ko"));

      nameData.unshift("모두에게");
      nameData.unshift("SELECT");
      setNameData(nameData);

    } catch (error) {
      console.error("디자이너 데이터를 불러오는 중 오류 발생: ", error);
    }
  };

  // Firestore에서 모든 편지 목록 불러오기 (최근 작성 순)
  const fetchAllMessages = async () => {
    try {
      const messagesCollection = collection(db, 'messages');
      const q = query(messagesCollection, orderBy('timestamp', 'desc')); // Timestamp 필드로 최신순 정렬
      const querySnapshot = await getDocs(q);
      const fetchedMessages = querySnapshot.docs.map((doc) => doc.data());

      setMessages(fetchedMessages); // 모든 편지를 저장
      setFilteredMessages(fetchedMessages); // 초기에는 필터링 없이 모든 편지 표시
    } catch (error) {
      console.error("메시지를 불러오는 중 오류 발생:", error);
    }
  };

  // 디자이너 필터링 함수
  const filterMessages = () => {
    if (filteredReceiver === 'SELECT') {
      setFilteredMessages(messages); // 'SELECT' 상태일 때는 모든 메시지 출력
    } else {
      const filtered = messages.filter((message) => message.receiver === filteredReceiver);
      setFilteredMessages(filtered); // 선택한 디자이너에 해당하는 메시지들만 저장
    }
  };

  // 필터링 조건이 변경될 때마다 메시지 필터링
  useEffect(() => {
    filterMessages();
  }, [filteredReceiver, messages]);


  const addComment = async (receiver, author, body) => {    // 메시지작성 수정함
    const messagesCollection = collection(db, 'messages');


    await addDoc(messagesCollection, {
      author,
      body,
      receiver: receiver,
      timestamp: Timestamp.now()
    });
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
        <GuestTitle>Guest ({filteredMessages.length})</GuestTitle>
        <SendMessageButton onClick={() => setShowPopup(true)}>Send Message<span className="material-symbols-outlined" style={{ fontSize: '16px', paddingBottom: '1px' }}>
          arrow_forward
        </span></SendMessageButton>
      </HeaderWrapper>
      <DroprealWrap>
        <DropdownWrapper ref={dropdownRef} className="dropdown-wrapper">
          <DropdownButton onClick={toggleDropdown}>
            {filteredReceiver}
          </DropdownButton>
          <DropdownMenu isOpen={dropdownOpen}>
            {nameData.map((receiver, index) => (
              <DropdownItem key={index} onClick={() => handleReceiverSelect(receiver)}>
                {receiver}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </DropdownWrapper>
      </DroprealWrap>

      <CommentListWrapper>
        {filteredMessages.map((message, index) => (
          <CommentItem key={index}>
            <CommentHeader>
              <CommentReceiver>
                <Icon src={`/iceflower/icycle${message.receiver}.png`}></Icon>
                {message.receiver}
              </CommentReceiver>
              <CommentBody>{message.body}</CommentBody>
              <CommentDetail>
                <CommentAuthor>From. {message.author}</CommentAuthor>

                <CommentDate>
                  {message.timestamp && (
                    (() => {
                      const date = message.timestamp.toDate(); // Firestore Timestamp를 Date 객체로 변환
                      const formattedDate = date.toISOString().split('T')[0]; // YYYY-MM-DD 형식으로 변환
                      return formattedDate;
                    })()
                  )}
                </CommentDate>
              </CommentDetail>
            </CommentHeader>
          </CommentItem>
        ))}
      </CommentListWrapper>

      {showPopup && (
        <>
          <Overlay isClosing={isClosing} /> {/* 오버레이 추가 */}
          <AnimatedPopupChat
            isClosing={isClosing}
            onAnimationEnd={handleAnimationEnd} // 애니메이션 종료 시점 확인
          >
            <PopupChat refreshCount={refreshCount} setRefreshCount={setRefreshCount} closePopup={handleClosePopup} addComment={addComment} designerList={nameData} />
          </AnimatedPopupChat>
        </>
      )}
    </GuestbookWrapper>
  );
}

export default Guestbook;
