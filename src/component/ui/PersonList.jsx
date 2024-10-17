import React from 'react';
import styled from "styled-components";

const ListBox = styled.div`
    padding: 0 15px;
    font-size: 14px;
    color: #000;
    line-height: 1.6;
    width: 100%;
    align-items: center;

    @media (max-width: 768px) {
        font-size: 12px;
    }
`

const Title = styled.div`
    margin-bottom: 24px;
    font-weight: 900;
    line-height: 1.4;

    font-family: "Helvetica Black";
`

const TitleKorean = styled.div`
    font-family: "pretendard";
    font-weight: 700;
`

const DepartmentLine = styled.div`
    width: 20%;

    @media (max-width: 768px) {
        width: 30%;
    }
`

const DepartmentLine2 = styled.div`
    width: 20%;

    @media (max-width: 768px) {
        width: 30%;
    }
`

const Inside = styled.div`
    @media (max-width: 768px) {
        width: 50%;
    }
`

const NameLine = styled.div`
    width: 36%;

    @media (max-width: 768px) {
        width: 40%;
    }
`

const EnglishNameLine = styled.div`
    width: 20%;

    @media (max-width: 768px) {
        width: 30%;
        text-align: right;
    }
`

const GraduationList = styled.div`
    display: flex;
    font-weight: 500;
    margin-bottom: 54px;
`

const ThanksToList = styled.div`
    display: flex;
    font-weight: 500;
`

const Element = styled.div`
    margin-bottom: 24px;
`

const Element2 = styled.div`
    margin-bottom: 84px;
`

const Element3 = styled.div`
    margin-bottom: 114px;
`

const Element4 = styled.div`
    margin-bottom: 8px;
`

function PersonList(props){
    return(
        <ListBox>
            <Title>
                2024 icycle <br></br>
                <TitleKorean>제19대 졸업전시준비위원회</TitleKorean>
            </Title>

            <GraduationList>
                <DepartmentLine>
                    <Element>위원장</Element>
                    <Element>부위원장</Element>
                    <Element>총무</Element>
                    <Element2>기획</Element2>
                    <Element3>홍보</Element3>
                    <Element>디자인</Element>
                </DepartmentLine>
                <NameLine>
                    <Element>박유진</Element>
                    <Element>석상현</Element>
                    <Element>염정훈</Element>
                    <Element4>한다영</Element4>
                    <Element4>김도연</Element4>
                    <Element>신유담</Element>
                    <Element4>민지원</Element4>
                    <Element4>민예은</Element4>
                    <Element4>임혜지</Element4>
                    <Element>최진아</Element>
                    <Element4>이수민</Element4>
                    <Element4>박우진</Element4>
                    <Element>신은지</Element>
                </NameLine>
                <EnglishNameLine>
                    <Element>PARK YUJIN</Element>
                    <Element>SUK SANGHYEON</Element>
                    <Element>YEOM JEONGHOON</Element>
                    <Element4>HAN DAYOUNG</Element4>
                    <Element4>KIM DOYEON</Element4>
                    <Element>SHIN YUDAM</Element>
                    <Element4>MIN JIWON</Element4>
                    <Element4>MIN YEEUN</Element4>
                    <Element4>LIM HYEJI</Element4>
                    <Element>CHOI JINA</Element>
                    <Element4>LEE SUMIN</Element4>
                    <Element4>PARK WOOJIN</Element4>
                    <Element>SHIN EUNJI</Element>
                </EnglishNameLine>
            </GraduationList>

        <Title>
            Thanks to
        </Title>
            <ThanksToList>
                <DepartmentLine2>
                    <Inside>
                        웹 디자인 및 퍼블리싱
                    </Inside>
                </DepartmentLine2>
                <NameLine>
                    <Element4>박지원</Element4>
                    <Element4>석상현</Element4>
                    <Element4>민지원</Element4>
                    <Element4>임혜지</Element4>
                    <Element4>최진아</Element4>
                </NameLine>
                <EnglishNameLine>
                    <Element4>PARK JIWON</Element4>
                    <Element4>SUK SANGHYEON</Element4>
                    <Element4>MIN JIWON</Element4>
                    <Element4>LIM HYEJI</Element4>
                    <Element4>CHOI JINA</Element4>
                </EnglishNameLine>
            </ThanksToList>
        </ListBox>
    )
}

export default PersonList;