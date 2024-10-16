import React, { useState } from 'react';
import styled from "styled-components";
import { useNavigate, useLocation } from 'react-router-dom';
import MobileNav from './Mobilenav';

const SideNavContent = styled.div`
  width: 100%;
  background-color: ${props => props.isIntro ? '#000' : '#fff'};
  color: ${props => props.isIntro ? '#fff' : '#000'};
  z-index: 88;
  position: fixed;
  top: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 15px;
  box-sizing: border-box;
`;

const ButtonGroup = styled.div`
  display: flex;
  flex: 1;
  justify-content: space-between;
  height: 36px;

  @media (max-width: 768px) {
    height: 36px;
  }
`;

const Menubutton = styled.button`
  background: 0;
  border: 0;
  color: ${props => props.isActive ? '#999999' : props.isIntro ? '#fff' : '#000'};
  padding: 10px 0px;
  text-align: left;
  cursor: pointer;
  flex: ${props => props.width || '1'};
  font-weight: 500;
  &:last-child {
    text-align: right;
  }

  @media (max-width: 768px) {
    display: none;
  }
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

const MobileMenubutton = styled.button`
  background: 0;
  border: 0;
  color: ${props => props.isActive ? '#757575' : props.isIntro ? '#fff' : '#000'};
  padding: 10px 0px;
  text-align: right;
  cursor: pointer;
  font-size: 12px;
  display: none;
  flex: ${props => props.width || '1'};

  @media (max-width: 768px) {
    display: block;
  }
`;
/*
const MobileMenubutton = styled.button`
  background: 0;
  border: 0;
  color: ${props => props.isActive ? '#757575' : props.isIntro ? '#fff' : '#000'};
  padding: 10px 0px;
  text-align: right;
  cursor: pointer;
  font-size: 12px;
  display: none;
  flex: ${props => props.width || '1'};

  @media (max-width: 768px) {
    display: block;
  }
`;*/

const SideLogo = styled.img`
  width: 24px;
  cursor: pointer;
  filter: ${props => props.isIntro ? 'invert(100%) brightness(100) saturate(100%)' : 'none'};

  @media (max-width: 768px) {
    width: 24px;
  }
`;

function Sidenav() {
  const navigate = useNavigate();
  const location = useLocation();
  const isIntro = location.pathname === '/intro';
  
  // MobileNav 표시 여부를 관리하는 상태
  const [showMobileNav, setShowMobileNav] = useState(false);

  return (
    <>
      {/* 기존 사이드 네비게이션 */}
      <SideNavContent isIntro={isIntro}>
        <ButtonGroup>
          <Logobutton width="20%" isIntro={isIntro} onClick={() => { navigate('/'); }}>
            <SideLogo 
              isIntro={isIntro} 
              onClick={() => { navigate('/'); }} 
              // src="https://i.postimg.cc/FHnJ8vM2/Group-1000004358.png" 
              src="/iceflower/icycle모두에게.png" 
              alt="Logo" 
            />
          </Logobutton>

          <Menubutton
            width="36%"
            isActive={location.pathname === '/intro'}
            isIntro={isIntro}
            onClick={() => { navigate('/intro'); }}
          >
            MEDIA
          </Menubutton>

          <Menubutton
            width="20%"
            isActive={location.pathname === '/projects'}
            isIntro={isIntro}
            onClick={() => { navigate('/projects'); }}
          >
            PROJECTS
          </Menubutton>

          <Menubutton
            width="14%"
            isActive={location.pathname === '/index'}
            isIntro={isIntro}
            onClick={() => { navigate('/index'); }}
          >
            INDEX
          </Menubutton>

          <Menubutton
            width="10%"
            isActive={location.pathname === '/guestbook'}
            isIntro={isIntro}
            onClick={() => { navigate('/guestbook'); }}
            style={{ textAlign: 'Right' }}
          >
            GUESTBOOK
          </Menubutton>

          {/* 모바일용 메뉴 버튼 */}
          <MobileMenubutton
            width="10%"
            isIntro={isIntro}
            onClick={() => setShowMobileNav(true)} // 버튼 클릭 시 MobileNav 표시
          >
            MENU
          </MobileMenubutton>
        </ButtonGroup>
      </SideNavContent>

      {/* MobileNav가 true일 때만 표시 */}
      {showMobileNav && <MobileNav onClose={() => setShowMobileNav(false)} />}
    </>
  );
}

export default Sidenav;
