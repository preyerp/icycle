import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  max-height: 100vh;
  overflow: hidden;
  padding-top: 50px; /* Header height */
  padding-bottom: 60px; /* Input form height */
`;

const Header = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  background-color: #007aff;
  color: white;
  text-align: center;
  padding: 10px 0;
  font-size: 18px;
  z-index: 10;
`;

const MessageList = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 10px;
`;

const Message = styled.div`
  max-width: 70%;
  padding: 10px;
  margin: 5px 0;
  border-radius: 10px;
  word-wrap: break-word;
  background-color: ${(props) => (props.isMe ? '#d1c4e9' : '#e1f5fe')};
  align-self: ${(props) => (props.isMe ? 'flex-end' : 'flex-start')};
`;

const InputForm = styled.form`
  position: sticky;
  bottom: 0;
  display: flex;
  background-color: white;
  border-top: 1px solid #ccc;
  padding: 10px;
  z-index: 10;
`;

const Input = styled.input`
  flex: 1;
  border: none;
  padding: 10px;
  font-size: 16px;
  border-radius: 5px;
  margin-right: 10px;

  &:focus {
    outline: none;
  }
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #007aff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:focus {
    outline: none;
  }
`;

function TestChat() {
  const [messages, setMessages] = useState([
    { id: 1, text: '안녕하세요!', sender: 'other' },
    { id: 2, text: '안녕하세요! 반갑습니다.', sender: 'me' },
  ]);
  const [input, setInput] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    // 입력 폼에 포커스 시 자동 스크롤 방지
    const preventScroll = (e) => {
      if (inputRef.current && document.activeElement === inputRef.current) {
        e.preventDefault();
      }
    };
    document.addEventListener('touchmove', preventScroll, { passive: false });
    return () => {
      document.removeEventListener('touchmove', preventScroll);
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      setMessages([...messages, { id: Date.now(), text: input, sender: 'me' }]);
      setInput('');
    }
  };

  return (
    <ChatContainer>
      <Header>채팅</Header>
      <MessageList>
        {messages.map((msg) => (
          <Message key={msg.id} isMe={msg.sender === 'me'}>
            {msg.text}
          </Message>
        ))}
      </MessageList>
      <InputForm onSubmit={handleSubmit}>
        <Input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="메시지를 입력하세요..."
        />
        <Button type="submit">전송</Button>
      </InputForm>
    </ChatContainer>
  );
}

export default TestChat;
