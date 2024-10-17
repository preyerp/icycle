import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';

// 오른쪽에서 왼쪽으로 슬라이드 인 애니메이션
const slideIn = keyframes`
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(0);
  }
`;

// 왼쪽에서 오른쪽으로 슬라이드 아웃 애니메이션
const slideOut = keyframes`
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(100%);
  }
`;

// 전체 화면을 덮는 네비게이션 바 스타일 + 애니메이션 추가
const NavigationContainer = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: 100vw;
  height: 100vh;
  background-color: #ffffff; /* 네비게이션 배경색 */
  color: #000000; /* 글자색 */
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  z-index: 999; /* 최상단에 위치 */
  padding: 0 15px;
  animation: ${({ isClosing }) => (isClosing ? slideOut : slideIn)} 0.5s ease-out; /* 애니메이션 적용 */
`;

// 네비게이션 메뉴 스타일
const NavItem = styled.button`
  background: none;
  border: none;
  color: ${({ isActive }) => (isActive ? '#999999' : '#000000')}; /* 현재 페이지는 검정, 나머지는 회색 */
  font-size: 14px;
  margin-bottom: 72px;
  cursor: pointer;
  transition: color 0.3s;

  &:hover {
    color: #000000; /* 호버 시 검정색 */
  }
`;

const SideLogo = styled.img`
  width: 24px;
`;

const Header = styled.div`
  height: 36px;
  width: 100%;
  display: flex;
  align-items: center;
  margin-bottom: 80px;
`;

const Logobutton = styled.button`
  background: 0;
  border: 0;
  color: ${props => props.isIntro ? '#fff' : '#757575'};
  padding-top: 0px;
  margin-top: 5px;
  text-align: left;
  cursor: pointer;
  flex: ${props => props.width || '1'};
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: #000000;
  font-size: 20px;
  cursor: pointer;
  padding: 10px 0px;
  text-align: right;
  font-size: 12px;
`;

const MobileNav = ({ onClose }) => {
  const navigate = useNavigate();
  const location = useLocation();

  // 애니메이션 종료 후 컴포넌트 숨기기
  const [isClosing, setIsClosing] = useState(false);

  // 애니메이션이 끝났을 때 호출
  const handleAnimationEnd = () => {
    if (isClosing) {
      onClose(); // 애니메이션이 끝나면 onClose 호출
    }
  };

  // 닫기 버튼을 누르면 슬라이드 아웃 애니메이션 실행
  const handleClose = () => {
    setIsClosing(true);
  };

  return (
    <NavigationContainer
      isClosing={isClosing}
      onAnimationEnd={handleAnimationEnd} // 애니메이션 종료 이벤트
    >
      {/* 닫기 버튼 */}
      <Header>
        <Logobutton>
          <SideLogo
            onClick={() => {
              navigate('/');
              handleClose(); // 로고 클릭 시 네비게이션 닫힘
            }}
            src="/iceflower/icycle0.png" 
            alt="Logo"
          />
        </Logobutton>
        <CloseButton onClick={handleClose}>CLOSE</CloseButton>
      </Header>

      {/* 현재 페이지와 일치하는 메뉴는 검정색으로 표시 */}
      <NavItem
        isActive={location.pathname === '/'}
        onClick={() => {
          navigate('/');
          handleClose();
        }}
      >
        HOME
      </NavItem>
      
      <NavItem
        isActive={location.pathname === '/intro'}
        onClick={() => {
          navigate('/intro');
          handleClose();
        }}
      >
        MEDIA
      </NavItem>

      <NavItem
        isActive={location.pathname === '/projects'}
        onClick={() => {
          navigate('/projects');
          handleClose();
        }}
      >
        PROJECTS
      </NavItem>

      <NavItem
        isActive={location.pathname === '/index'}
        onClick={() => {
          navigate('/index');
          handleClose();
        }}
      >
        INDEX
      </NavItem>

      <NavItem
        isActive={location.pathname === '/guestbook'}
        onClick={() => {
          navigate('/guestbook');
          handleClose();
        }}
      >
        GUESTBOOK
      </NavItem>
    </NavigationContainer>
  );
};

export default MobileNav;
