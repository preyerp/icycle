import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';

const SearchBarContainer = styled.div`
  position: relative;
  display: inline-block;
  cursor: text;
  color: #ffffff;
  text-align: ${props => props.textAlign || 'left'};
  width: ${props => props.width || '100px'}; 
  height: 16px;
  /* border: 1px solid red; */
  @media (max-width: 768px) {
    width: 50px;
    text-align: right; /* 모바일에서 Search가 우측에 붙도록 설정 */
  }
`;

const Searchtitle = styled.p`
  position: absolute;
  right: 0; /* 우측 정렬 */
  top: 0;
  color: #000000;
  width: 100%;
  font-size: 14px;
  height: 100%;
  line-height: 16px; /* 높이와 정렬 맞추기 */
  padding-right: 2px; /* 커서 위치를 S 앞에 맞추기 위한 패딩 */
  opacity: ${props => (props.hasValue ? '0' : props.active ? '0.5' : '1')};

  @media (max-width: 768px) {
    font-size: 12px;
  }
`;

const HiddenInput = styled.input`
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
  font-size: 14px;
  color: #000;
  background: transparent;
  padding-right: 2px; /* 커서가 S 앞에 오도록 패딩 설정 */
  box-sizing: border-box;
  opacity: ${props => (props.active ? '1' : '0')};
  position: absolute;
  right: 0;
  top: 0;
  z-index: 1;
  pointer-events: ${props => (props.active ? 'auto' : 'none')};
  @media (max-width: 768px) {
    font-size: 12px;
  }
`;

function SearchBar({ width, onSearch, textAlign }) {
  const [active, setActive] = useState(false);
  const [hasValue, setHasValue] = useState(false);
  const inputRef = useRef(null);
  const containerRef = useRef(null);

  const handleClick = () => {
    setActive(true);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleBlur = () => {
    if (inputRef.current && inputRef.current.value === '') {
      setActive(false);
    }
  };

  const handleChange = () => {
    if (inputRef.current) {
      const value = inputRef.current.value;
      setHasValue(value.length > 0);
      onSearch(value);
    }
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        handleBlur();
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  return (
    <SearchBarContainer textAlign={textAlign} width={width} ref={containerRef} onClick={handleClick}>
      <Searchtitle active={active} hasValue={hasValue}>
        SEARCH
      </Searchtitle>
      <HiddenInput
        ref={inputRef}
        type="text"
        onBlur={handleBlur}
        onChange={handleChange}
        autoFocus={active}
        active={active}
      />
    </SearchBarContainer>
  );
}

export default SearchBar;
