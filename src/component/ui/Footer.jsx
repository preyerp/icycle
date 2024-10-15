import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

// Styled components for the footer
const FooterContainer = styled.div`
  background-color: #ffffff;
  text-align: left;
  padding: ${props => props.padding || '15px'};
  font-size: 14px;
  display: flex;
  height: 174px;
  width: 100%;
  justify-content: space-between;

  @media (max-width: 768px) {
    height: 170px;
    flex-direction: column;
    justify-content: flex-start;
   }
`;

const LeftFooter = styled.div`
  width: 56%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const RightFooter = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: start;
  width: 44%;

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: left;
    align-items: start;
    width: 100%;
   }
`;

const FooterMenu = styled.ul`
  text-decoration: none;
  list-style: none;
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: left;
    align-items: start;
    margin-bottom: 20px;
   }
`;

const FMenu = styled.li`
  color: #000000;
  margin-right: 24px;
  cursor: pointer;

  &:hover {
    color: #555; /* 메뉴 호버 시 색상 변화 */
  }

  @media (max-width: 768px) {
    text-align: left;
    margin-bottom: 4px;
    font-size: 12px;
    line-height: 1.4;
   }
`;

const FooterText = styled.p`
  color: #000000;
  line-height: 1.4;

  @media (max-width: 768px) {
    font-size: 12px;
    margin-bottom: 8px;
   }
`;

const InstaButton = styled.a`
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-align: center;
  padding: 5px 8px;
  color: #000000;
  text-decoration: none;
  font-size: 14px;
  width: 108px;
  border: 2px solid #000000;

  &:hover {
    cursor: pointer;
    background-color:#000;
    color: #fff;
  }

  @media (max-width: 768px) {
    font-size: 12px;
    margin-bottom: 24px;
    width: 103px;
    height: 29px;
    padding: 6px 8px;
    line-height: 1.4;
    border: 1.5px solid #000000;
   }
`;

const RightLogo = styled.div`
  width: 62px;
  height: 9px;
  margin-bottom: 4px;
  margin-right: 10px;
  background-image: url(https://i.postimg.cc/cJTckPsj/Frame-1000004964.png);
  background-position: center;
  background-size: cover;

  @media (max-width: 768px) {
    margin-bottom: 8px;
   }
`;

const CopyRight = styled.p`
  color: #000000;

  @media (max-width: 768px) {
    font-size: 12px;
    line-height: 1.4;
    height: 17px;
   }
`;

const Footer = (props) => {
  const { padding } = props;
  const navigate = useNavigate(); // 페이지 이동을 위한 useNavigate 훅 사용

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup 이벤트 리스너
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <FooterContainer padding={padding}>
      <LeftFooter>
        {isMobile ? (
          null
        ) : (
          <FooterMenu>
            <FMenu onClick={() => navigate('/intro')}>MEDIA</FMenu>
            <FMenu onClick={() => navigate('/projects')}>PROJECTS</FMenu>
            <FMenu onClick={() => navigate('/index')}>INDEX</FMenu>
            <FMenu onClick={() => navigate('/guestbook')}>GUESTBOOK</FMenu>
          </FooterMenu>
        )}

        <FooterText>
          2024 TUKOREA<br />
          DESIGN ENGINEERING<br />
          19TH GRADUATION EXHIBITION
        </FooterText>
        <InstaButton href="https://www.instagram.com/tukd_grad?igsh=MWNsdWZkbWY3ZXZ1Mg==">
          INSTAGRAM
          <span className="material-symbols-outlined" style={{ fontSize: '16px', fontWeight: 300 }}>
            arrow_outward
          </span>
        </InstaButton>
      </LeftFooter>
      <RightFooter>
        <RightLogo />
        <CopyRight>© 2024 TECH UNIV KOREA. ALL RIGHTS RESERVED.</CopyRight>
      </RightFooter>
    </FooterContainer>
  );
};

export default Footer;