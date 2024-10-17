import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

// Styled components
const Container = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
    font-family: 'OCR A Std', sans-serif;
`
const Container2 = styled.div`
    width: 80px;
    @media (max-width: 768px) {
    width: 70px;
  }
`
const HexContainer = styled.div`
    
`

const CategoryContainer = styled.div`
    
`
const Title = styled.p`
    color: #999999;
    font-size: 14px;
    -webkit-font-smoothing: antialiased;  /* 텍스트 렌더링 최적화 */
    -moz-osx-font-smoothing: grayscale;
    margin: 0;
    margin-bottom: 8px;
    white-space: nowrap;

    @media (max-width: 768px) {
        font-size: 12px;
  }
`;
const Category = styled.p`
    color: #000;
    font-size: 14px;
    -webkit-font-smoothing: antialiased;  /* 텍스트 렌더링 최적화 */
    -moz-osx-font-smoothing: grayscale;
    margin: 0;
    white-space: nowrap;

    @media (max-width: 768px) {
        font-size: 12px;
  }
`;
const Hex = styled.div`
    color: #000;
    font-size: 14px;
    -webkit-font-smoothing: antialiased;  /* 텍스트 렌더링 최적화 */
    -moz-osx-font-smoothing: grayscale;
    margin: 0;
    white-space: nowrap;
    display: flex;
    align-items: center;

    /* color-box 스타일 */
    .color-box {
        margin-right: 4px;
        width: 6px;
        height: 6px;
        background-color: ${props => props.color};  // Immediate color change
    }

    /* hex-code 스타일 */
    .hex-code {
        color: #000;
    }

    @media (max-width: 768px) {
        font-size: 12px;
  }
`;



// Function to animate text with a fixed speed
const animateText = (text, callback, speed) => {
    let index = 0;
    const intervalId = setInterval(() => {
        callback(text.slice(0, index + 1));
        index += 1;
        if (index >= text.length) {
            clearInterval(intervalId);
        }
    }, speed);
};

function MainTxt({ categoryText, colorHex, runNow }) {
    runNow = 1;
    const [displayCategoryText, setDisplayCategoryText] = useState('');
    const [displayPrintText, setDisplayPrintText] = useState('');
    const [displayAirobotText, setDisplayAirobotText] = useState('');
    const [displayAirobotHexText, setDisplayAirobotHexText] = useState('');
    const [displayEduText, setDisplayEduText] = useState('');
    const [displayEduHexText, setDisplayEduHexText] = useState('');
    const [displayHealthText, setDisplayHealthText] = useState('');
    const [displayHealthHexText, setDisplayHealthHexText] = useState('');
    const [displayItText, setDisplayItText] = useState('');
    const [displayItHexText, setDisplayItHexText] = useState('');
    const [displayLivingText, setDisplayLivingText] = useState('');
    const [displayLivingHexText, setDisplayLivingHexText] = useState('');
    const [displayMobilText, setDisplayMobilText] = useState('');
    const [displayMobilHexText, setDisplayMobilHexText] = useState('');
    const [isAnimating, setIsAnimating] = useState(true); // 애니메이션 상태

    // Define individual animation speeds
    const speed40 = 40; // Speed for category text animation
    const speed50 = 50;    // Speed for color hex animation
    const speed70 = 70;        // Speed for bcode text animation
    const speed80 = 100;       // Speed for bcode2 text animation

    useEffect(() => {
        // Animate only if the page loads (i.e., initial render or when category or color changes)
        setIsAnimating(true);

        const category = 'CATEGORY';
        const print = 'PRINT';
        const airobot = 'AI & ROBOT';
        const airobotHex = '#D2D6D7';
        const edu = 'EDUCATION & KIDS';
        const eduHex = '#F2E5A0';
        const health = 'HEALTH CARE';
        const healthHex = '#69E0CB';
        const it = 'IT & TECH';
        const itHex = '#4E6873';
        const living = 'LIVING';
        const livingHex = '#D7CBBC';
        const mobil = 'MOBILITY';
        const mobilHex = '#5E8ABF';

        if (runNow) {
            // Animate texts with specified speeds
            animateText(category, setDisplayCategoryText, speed70);
            animateText(print, setDisplayPrintText, speed80);
            animateText(airobot, setDisplayAirobotText, speed50);
            animateText(airobotHex, setDisplayAirobotHexText, speed70);
            animateText(edu, setDisplayEduText, speed40);
            animateText(eduHex, setDisplayEduHexText, speed70);
            animateText(health, setDisplayHealthText, speed50);
            animateText(healthHex, setDisplayHealthHexText, speed70);
            animateText(it, setDisplayItText, speed80);
            animateText(itHex, setDisplayItHexText, speed70);
            animateText(living, setDisplayLivingText, speed80);
            animateText(livingHex, setDisplayLivingHexText, speed70);
            animateText(mobil, setDisplayMobilText, speed70);
            animateText(mobilHex, setDisplayMobilHexText, speed70);
        }


        // Disable animation after texts are fully updated
        const maxAnimationTime = Math.max(
            speed70 * (category.length + 1),
            speed80 * (print.length + 1),
            speed50 * (airobot.length + 1),
            speed70 * (airobotHex.length + 1),
            speed40 * (edu.length + 1),
            speed70 * (eduHex.length + 1),
            speed50 * (health.length + 1),
            speed70 * (healthHex.length + 1),
            speed80 * (it.length + 1),
            speed70 * (itHex.length + 1),
            speed80 * (living.length + 1),
            speed70 * (livingHex.length + 1),
            speed70 * (mobil.length + 1),
            speed70 * (mobilHex.length + 1)
        );

        const animationTimer = setTimeout(() => {
            setIsAnimating(false);
        }, maxAnimationTime);

        return () => clearTimeout(animationTimer); // Clean up timeout on unmount
    }, [categoryText, colorHex, runNow]);

    return (
        <>
            <Container>
                <CategoryContainer>
                    <Title animate={isAnimating}>{displayCategoryText}</Title>
                    <Category animate={isAnimating}>{displayAirobotText}</Category>
                    <Category animate={isAnimating}>{displayEduText}</Category>
                    <Category animate={isAnimating}>{displayHealthText}</Category>
                    <Category animate={isAnimating}>{displayItText}</Category>
                    <Category animate={isAnimating}>{displayLivingText}</Category>
                    <Category animate={isAnimating}>{displayMobilText}</Category>
                </CategoryContainer>
                <HexContainer>
                    <Container2>
                        <Title animate={isAnimating}>{displayPrintText}</Title>
                        <Hex color={displayAirobotHexText}>
                            <div className="color-box"></div>
                            <span className="hex-code">{displayAirobotHexText}</span>
                        </Hex>
                        <Hex color={displayEduHexText}>
                            <div className="color-box"></div>
                            <span className="hex-code">{displayEduHexText}</span>
                        </Hex>
                        <Hex color={displayHealthHexText}>
                            <div className="color-box"></div>
                            <span className="hex-code">{displayHealthHexText}</span>
                        </Hex>
                        <Hex color={displayItHexText}>
                            <div className="color-box"></div>
                            <span className="hex-code">{displayItHexText}</span>
                        </Hex>
                        <Hex color={displayLivingHexText}>
                            <div className="color-box"></div>
                            <span className="hex-code">{displayLivingHexText}</span>
                        </Hex>
                        <Hex color={displayMobilHexText}>
                            <div className="color-box"></div>
                            <span className="hex-code">{displayMobilHexText}</span>
                        </Hex>
                    </Container2>
                </HexContainer>
            </Container>

        </>


    );
}

export default MainTxt;
