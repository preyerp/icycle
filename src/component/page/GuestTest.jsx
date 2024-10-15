import React, { useState, useEffect } from 'react';
import { collection, addDoc, getDocs, query, where, orderBy } from 'firebase/firestore';

import { db } from "../../firebase"; // Firebase Firestore 연결
import styled from 'styled-components';

// Styled Components
const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
`;

const Input = styled.input`
  margin: 10px 0;
  padding: 10px;
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 4px;
  position: relative;
`;

const Button = styled.button`
  padding: 10px 20px;
  margin: 20px 0;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  
  &:hover {
    background-color: #45a049;
  }
`;

const DesignerList = styled.ul`
  list-style: none;
  padding: 0;
  text-align: left;
  position: absolute;
  width: 100%;
  max-height: 200px;
  overflow-y: auto;
  background-color: white;
  border: 1px solid #ccc;
  z-index: 1000;
`;

const DesignerItem = styled.li`
  padding: 10px;
  cursor: pointer;
  border-bottom: 1px solid #ccc;
  
  &:hover {
    background-color: #f0f0f0;
  }
`;

const MessageContainer = styled.div`
  margin-top: 20px;
  text-align: left;
`;

const MessageItem = styled.div`
  border: 1px solid #ccc;
  padding: 15px;
  margin: 10px 0;
  border-radius: 4px;
  background-color: #f9f9f9;
`;

const FilterContainer = styled.div`
  margin-bottom: 20px;
  text-align: left;
`;

const FilterButton = styled(Button)`
  width: 100%;
`;

const FilterList = styled.ul`
  list-style: none;
  padding: 0;
  max-height: 200px;
  overflow-y: auto;
  display: ${(props) => (props.visible ? 'block' : 'none')};
  background-color: white;
  border: 1px solid #ccc;
`;

const GuestTest = () => {
    const [designers, setDesigners] = useState([]);
    const [nameData, setNameData] = useState([]);
    const [filteredDesigners, setFilteredDesigners] = useState([]);
    const [selectedDesigner, setSelectedDesigner] = useState('');
    const [message, setMessage] = useState('');
    const [author, setAuthor] = useState('');
    const [messages, setMessages] = useState([]);
    const [showDesignerList, setShowDesignerList] = useState(false); // 텍스트 입력 필터 팝업 여부
    const [showFilterList, setShowFilterList] = useState(false); // 하단 필터 버튼 슬라이드 여부

    useEffect(() => {
        fetchDesigners();
        fetchAllMessages();
    }, []);

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

            const nameData = designerList.map(designer => designer.name); // name 필드만 추출한 배열
            setNameData(nameData);
            setDesigners(designerList); // 전체 디자이너 목록 저장
            setFilteredDesigners(designerList); // 초기값: 모든 디자이너 표시
            console.log(nameData); // ['홍길동', '박지성', '박상현', ...] 형태로 출력

        } catch (error) {
            console.error("디자이너 데이터를 불러오는 중 오류 발생: ", error);
        }
    };


    // Firestore에서 모든 편지 목록 불러오기 (최근 작성 순)
    const fetchAllMessages = async () => {
        const messagesCollection = collection(db, 'messages');
        const q = query(messagesCollection, orderBy('timestamp', 'desc'));
        const querySnapshot = await getDocs(q);
        const fetchedMessages = querySnapshot.docs.map((doc) => doc.data());
        setMessages(fetchedMessages); // 모든 편지를 최근 순으로 저장
    };

    // 디자이너 이름 필터링 (텍스트 필드에 사용)
    const filterDesigners = (searchTerm) => {
        const filtered = designers.filter((designer) =>
            designer.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredDesigners(filtered);
        setShowDesignerList(true); // 검색어 입력 시 팝업 목록 표시
    };

    // 텍스트 필드에서 디자이너 선택 시 동작
    const handleDesignerSelect = (designerName) => {
        setSelectedDesigner(designerName);
        setShowDesignerList(false); // 팝업 목록 숨김
    };

    // 디자이너 선택 후 편지 작성 로직
    const submitMessage = async () => {
        if (!author || !message || !selectedDesigner) {
            alert('모든 필드를 입력해주세요.');
            return;
        }

        if (author.length > 20) {
            alert('작성자 이름은 20자 이내로 입력해주세요.');
            return;
        }

        const messagesCollection = collection(db, 'messages');
        await addDoc(messagesCollection, {
            author,
            message,
            to: selectedDesigner,
            timestamp: new Date(),
        });

        alert('편지가 성공적으로 작성되었습니다.');
        setMessage('');
        setAuthor('');
        fetchAllMessages(); // 새로 작성된 편지를 업데이트하기 위해 호출
    };

    // 필터 목록에서 디자이너 선택 시 동작 (편지 목록 필터링)
    const handleFilterClick = async (designerName) => {
        if (designerName === '모두에게') {
            fetchAllMessages(); // '모두에게' 선택 시 모든 편지 표시
        } else {
            const messagesCollection = collection(db, 'messages');
            const q = query(messagesCollection, where('to', '==', designerName));
            const querySnapshot = await getDocs(q);
            const fetchedMessages = querySnapshot.docs.map((doc) => doc.data());
            setMessages(fetchedMessages); // 선택한 디자이너의 편지 목록 설정
        }
        setShowFilterList(false); // 필터 슬라이드 닫기
    };

    return (
        <Container>
            <h1>방명록 페이지</h1>

            <h3>디자이너 선택</h3>
            <Input
                type="text"
                placeholder="디자이너 이름을 검색하세요..."
                onChange={(e) => filterDesigners(e.target.value)}
                value={selectedDesigner}
                onFocus={() => setShowDesignerList(true)} // 포커스 시 팝업 표시
            />

            {showDesignerList && (
                <DesignerList>
                    {filteredDesigners.map((designer) => (
                        <DesignerItem
                            key={designer.id}
                            onClick={() => handleDesignerSelect(designer.name)}
                        >
                            {designer.name}
                        </DesignerItem>
                    ))}
                </DesignerList>
            )}

            <h3>편지 작성</h3>
            <Input
                type="text"
                placeholder="작성자 이름 (20자 이내)"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
            />
            <Input
                type="text"
                placeholder="편지를 작성하세요..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />

            <Button onClick={submitMessage}>편지 보내기</Button>

            <FilterContainer>
                <FilterButton onClick={() => setShowFilterList(!showFilterList)}>
                    필터 선택
                </FilterButton>

                <FilterList visible={showFilterList}>
                    {designers.map((designer) => (
                        <DesignerItem
                            key={designer.id}
                            onClick={() => handleFilterClick(designer.name)}
                        >
                            {designer.name}
                        </DesignerItem>
                    ))}
                </FilterList>
            </FilterContainer>

            <MessageContainer>
                <h3>작성된 편지 목록</h3>
                {messages.length === 0 ? (
                    <p>작성된 편지가 없습니다.</p>
                ) : (
                    messages.map((msg, index) => (
                        <MessageItem key={index}>
                            <p><strong>{msg.author}:</strong> {msg.message}</p>
                        </MessageItem>
                    ))
                )}
            </MessageContainer>
        </Container>
    );
};

export default GuestTest;
