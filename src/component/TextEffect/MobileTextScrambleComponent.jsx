import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

// 스타일 정의
const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  z-index: 40;
  margin-left: 15px;
`;

const Text = styled.div`
  font-size: 12px;
  flex: 1;
  color: ${(props) => props.color};
  margin: 0;
  text-align: ${(props) => props.align || 'center'}; /* 텍스트 정렬 */
`;

class TextScramble {
  constructor(el) {
    this.el = el;
    this.chars = '!<>-_\\/[]{}—=+*^?#________';
    this.update = this.update.bind(this);
  }

  setText(newText) {
    const oldText = this.el.innerText;
    const length = Math.max(oldText.length, newText.length);
    const promise = new Promise((resolve) => (this.resolve = resolve));
    this.queue = [];
    for (let i = 0; i < length; i++) {
      const from = oldText[i] || '';
      const to = newText[i] || '';
      const start = Math.floor(Math.random() * 40);
      const end = start + Math.floor(Math.random() * 40);
      this.queue.push({ from, to, start, end });
    }
    cancelAnimationFrame(this.frameRequest);
    this.frame = 0;
    this.update();
    return promise;
  }

  update() {
    let output = '';
    let complete = 0;
    for (let i = 0, n = this.queue.length; i < n; i++) {
      let { from, to, start, end, char } = this.queue[i];
      if (this.frame >= end) {
        complete++;
        output += to;
      } else if (this.frame >= start) {
        if (!char || Math.random() < 0.28) {
          char = this.randomChar();
          this.queue[i].char = char;
        }
        output += `<span class="dud">${char}</span>`;
      } else {
        output += from;
      }
    }
    this.el.innerHTML = output;
    if (complete === this.queue.length) {
      this.resolve();
    } else {
      this.frameRequest = requestAnimationFrame(this.update);
      this.frame++;
    }
  }

  randomChar() {
    return this.chars[Math.floor(Math.random() * this.chars.length)];
  }
}

function MobileTextScrambleComponent(props) {
  const { color, phrases1, phrases2, phrases3 } = props;

  const [phrases] = useState([phrases1, phrases2, phrases3]);

  const textRefs = [useRef(null), useRef(null), useRef(null)];
  const fxRefs = useRef([null, null, null]);
  let counter = 0;

  useEffect(() => {
    const fxInstances = textRefs.map((ref, index) => new TextScramble(ref.current));
    fxRefs.current = fxInstances;

    const next = () => {
      const promises = fxRefs.current.map((fx, index) => fx.setText(phrases[index][counter]));
      Promise.all(promises).then(() => {
        setTimeout(next, 1000); // 일정한 딜레이 유지
      });
      counter = (counter + 1) % phrases1.length; // 동일한 카운터로 모두 제어
    };

    next();
  }, [phrases, phrases1.length]);

  return (
    <Container>
      <Text color={color} ref={textRefs[0]} align="left"></Text> {/* 첫 번째 텍스트 */}
      <Text color={color} ref={textRefs[1]} align="left"></Text> {/* 두 번째 텍스트 */}
      <Text color={color} ref={textRefs[2]} align="left"></Text> {/* 세 번째 텍스트 */}
    </Container>
  );
}

export default MobileTextScrambleComponent;
