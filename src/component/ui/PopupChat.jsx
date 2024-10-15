import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

// Styled Components
const MessagePopup = styled.div`
  position: fixed;
  top: 50%;
  right: 0;
  width: 450px;
  height: 100vh;
  padding: 0 15px 15px;
  background-color: white;
  border: 1px solid #ccc;
  transform: translateY(-50%);
  z-index: 1000;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow-y: auto;
  @media (max-width: 768px) {
    font-size: 12px;
    width: 100%;  
  }
`;

const ChatMessage = styled.div`
  background-color: #ffffff;
  border-radius: 10px;
  text-align: left;
  margin-bottom: 36px;
  line-height: 1.6;
`;

const UserMessage = styled.div`
  border-radius: 10px;
  text-align: right;
  margin-bottom: 36px;
  width: 80%;
  margin-left: 20%;
  line-height: 1.6;
`;

const ChatInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  justify-content: space-between;
`;

const ChatInputRow = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

const ChatInput = styled.input`
  padding: 0px;
  border: none;
  border-bottom: 1px solid #000;
  outline: none;
  width: 78%;
  box-sizing: border-box;
  height: 26px;
  @media (max-width: 768px) {
    font-size: 12px;
  }
  &::placeholder {
    color: #ccc;
  }
`;

const SendButton = styled.button`
  border: none;
  color: #000000;
  cursor: pointer;
  width: 15%;
  background-color: #fff;
  height: 26px;
  font-size: 14px;
  border-bottom: 1px solid #000000;
  line-height: 26px;
  @media (max-width: 768px) {
    font-size: 12px;
  }
`;

const ResetButton = styled.button`
  border: none;
  background-color: #ffffff;
  color: #000000;
  cursor: pointer;
  font-size: 10px;
  line-height: 26px;
  height: 26px;
  margin-right: 10px;
  width: 7%;
  @media (max-width: 768px) {
    font-size: 8px;
  }
`;

const TopWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 54px;
  border-bottom: 1px solid #eee;
`;

const TitleMenu = styled.h4`
  margin-left: 50%;
  transform: translateX(-50%);
  font-weight: 500;
  font-size: 14px;
  @media (max-width: 768px) {
    font-size: 12px;
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 14px;
  cursor: pointer;
  @media (max-width: 768px) {
    font-size: 12px;
  }
`;

const Suggestions = styled.ul`
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
  position: absolute;
  background-color: #000;
  color: #fff;
  padding: 0;
  list-style: none;
  margin: 0;
  width: 80px;
  text-align: center;
  max-height: 150px;
  overflow-y: auto;
  bottom: 50px;
  left: 10%;
  &::-webkit-scrollbar {
    display: none; /* 스크롤바를 없앰 */
  }
`;

const SuggestionItem = styled.li`
  padding: 10px;
  border-bottom: 1px solid #fff;
  cursor: pointer;
  background-color: ${({ highlighted }) => (highlighted ? '#fff' : '#000')};
  color: ${({ highlighted }) => (highlighted ? '#000' : '#fff')};
  &:hover {
    background-color: #fff;
    color: #000;
  }
`;

const Label = styled.div`
  font-weight: 500;
  font-size: 14px;
  margin-bottom: 8px;
  @media (max-width: 768px) {
    font-size: 12px;
  }
`;

function PopupChat({ refreshCount, setRefreshCount, closePopup, addComment, designerList }) {
  const [chat, setChat] = useState([
    {
      message: `졸업생들의 4년간의 성장과 노력의 결과물을 어떻게 보셨나요?\n그들을 가까이 지켜봐 온 여러분의 사랑과 응원이 담긴 메시지가\n앞으로의 졸업생들의 앞날에 큰 힘이 될 것입니다.`,
      from: 'system',
    },
    {
      message: `누구에게 남기실 건가요?\n모두 또는 남기고 싶은 사람의 이름을 입력해 주세요.`,
      from: 'system',
    },
  ]);
  const [receiver, setReceiver] = useState('');  // 받는 사람 상태
  const [message, setMessage] = useState('');    // 메시지 내용 상태
  const [sender, setSender] = useState('');      // 보낸 사람 상태
  const [step, setStep] = useState(1);           // 단계 관리
  const [nameSuggestions, setNameSuggestions] = useState([]);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [isReceiverValid, setIsReceiverValid] = useState(false);
  const inputRef = useRef(null);
  const chatContainerRef = useRef(null);


  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [step]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chat]);

  const handleInput = (e) => {
    const value = e.target.value;

    if (step === 1) {
      setReceiver(value);  // step 1에서 받는 사람 입력 처리
      const filteredSuggestions = designerList.filter((name) =>
        name.startsWith(value)
      );
      setNameSuggestions(filteredSuggestions);
      setHighlightedIndex(-1);
      setIsReceiverValid(filteredSuggestions.includes(value));
    } else if (step === 2) {
      setMessage(value);  // step 2에서 메시지 입력 처리
    } else if (step === 3) {
      setSender(value);   // step 3에서 보낸 사람 입력 처리
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (highlightedIndex >= 0 && step === 1 && nameSuggestions.length > 0) {
        handleSuggestionClick(nameSuggestions[highlightedIndex]);
      } else if (step === 1 && isReceiverValid) {
        handleSubmit(e);
      } else if (step > 1) {
        handleSubmit(e);
      }
    } else if (step === 1 && nameSuggestions.length > 0) {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setHighlightedIndex((prevIndex) =>
          prevIndex < nameSuggestions.length - 1 ? prevIndex + 1 : 0
        );
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setHighlightedIndex((prevIndex) =>
          prevIndex > 0 ? prevIndex - 1 : nameSuggestions.length - 1
        );
      }
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setReceiver(suggestion);
    setIsReceiverValid(true);
    setNameSuggestions([]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (step === 1 && receiver && isReceiverValid) {
      setChat([...chat, { message: receiver, from: 'user' }]);
      setStep(2);

      setTimeout(() => {
        setChat((prevChat) => [
          ...prevChat,
          { message: '무슨 메시지를 보내시겠습니까?', from: 'system' },
        ]);
      }, 500);
    } else if (step === 2 && message) {
      setChat([...chat, { message, from: 'user' }]);

      setTimeout(() => {
        setChat((prevChat) => [
          ...prevChat,
          { message: '누가 메시지를 보냈는지 알려주세요.', from: 'system' },
        ]);
      }, 500);

      setStep(3);
    } else if (step === 3 && sender) {
      setChat([...chat, { message: sender, from: 'user' }]);

      setStep(4);
      setTimeout(() => {
        setChat((prevChat) => [
          ...prevChat,
          { message: '감사합니다!', from: 'system' },
        ]);

        // addComment에 올바른 값 전달
        addComment(receiver, sender, message);

        setTimeout(() => {
          resetChat(); // "감사합니다"가 나오면 채팅과 인풋 초기화
          setRefreshCount(refreshCount+1);
        }, 2000);
      }, 500);
    }
  };

  const resetChat = () => {
    setReceiver('');
    setMessage('');
    setSender('');
    setStep(1);
    setChat([
      {
        message: `졸업생들의 4년간의 성장과 노력의 결과물을 어떻게 보셨나요?\n그들을 가까이 지켜봐 온 여러분의 사랑과 응원이 담긴 메시지가\n앞으로의 졸업생들의 앞날에 큰 힘이 될 것입니다.`,
        from: 'system',
      },
      {
        message: `누구에게 남기실 건가요?\n모두 또는 남기고 싶은 사람의 이름을 입력해 주세요.`,
        from: 'system',
      },
    ]);
    setNameSuggestions([]);
  };

  return (
    <MessagePopup>
      <TopWrap>
        <TitleMenu>MESSAGE</TitleMenu>
        <CloseButton onClick={closePopup}>CLOSE</CloseButton>
      </TopWrap>
      <div
        ref={chatContainerRef}
        style={{ height: 'calc(100% - 80px)', padding: '24px 0', overflow: 'hidden' }}
      >
        {chat.map((c, index) =>
          c.from === 'system' ? (
            <div key={index}>
              <Label>ICYCLE</Label>
              <ChatMessage>
                {c.message.split('\n').map((line, i) => (
                  <React.Fragment key={i}>
                    {line}
                    <br />
                  </React.Fragment>
                ))}
              </ChatMessage>
            </div>
          ) : (
            <div key={index}>
              <Label style={{ textAlign: 'right' }}>YOU</Label>
              <UserMessage>{c.message}</UserMessage>
            </div>
          )
        )}

        {step === 1 && nameSuggestions.length > 0 && (
          <Suggestions isOpen={nameSuggestions.length > 0}>
            {nameSuggestions.map((suggestion, index) => (
              <SuggestionItem
                key={index}
                highlighted={index === highlightedIndex}
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion}
              </SuggestionItem>
            ))}
          </Suggestions>
        )}
      </div>

      <ChatInputWrapper>
        <form>
          <ChatInputRow>
            <ResetButton type="button" onClick={resetChat}>
              <span class="material-symbols-outlined"
                style={{ fontWeight: '300', fontSize: '22px', marginTop: '1px' }}
              >

                forward_media
              </span>
            </ResetButton>
            {step === 1 && (
              <ChatInput
                type="text"
                value={receiver}
                placeholder="누구에게 보낼지 입력하세요"
                onChange={handleInput}
                onKeyDown={handleKeyDown}
                ref={inputRef}
              />
            )}
            {step === 2 && (
              <ChatInput
                type="text"
                value={message}
                placeholder="메시지를 입력하세요"
                onChange={handleInput}
                onKeyDown={handleKeyDown}
                ref={inputRef}
              />
            )}
            {step === 3 && (
              <ChatInput
                type="text"
                value={sender}
                placeholder="이름을 입력하세요"
                onChange={handleInput}
                onKeyDown={handleKeyDown}
                ref={inputRef}
              />
            )}
            {step === 4 && (
              <ChatInput
                type="text"
                value={sender}
                placeholder=""
                onChange={handleInput}
                onKeyDown={handleKeyDown}
                ref={inputRef}
                disabled
              />
            )}
            <SendButton
              type="button"
              onClick={handleSubmit}
              disabled={step === 1 && !isReceiverValid}
            >
              SEND
            </SendButton>
          </ChatInputRow>
        </form>
      </ChatInputWrapper>
    </MessagePopup>
  );
}

export default PopupChat;
