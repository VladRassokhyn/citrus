import { useEffect, useState } from 'react';
import styled, { Keyframes, keyframes } from 'styled-components';
import { zoomIn, zoomOut } from 'react-animations';

type Props = {
  title: string;
  description: string;
  isOpenAll: boolean;
};

type ContentProps = {
  animation: Keyframes;
};

const openAnimation = keyframes`${zoomIn}`;
const closeAnimation = keyframes`${zoomOut}`;
const heightOn = keyframes`0%{height: 30px} 100% {height: 100%}`;
const heightClose = keyframes`0%{height: 110px} 100% {height: 30px}`;

const Wrapper = styled.div<ContentProps>`
  height: 30px;
  width: 100%;
  animation: ${(props) => props.animation} 0.3s forwards;
`;

const Content = styled.div<ContentProps>`
  margin-left: 10px;
  animation: ${(props) => props.animation} 0.3s forwards;
`;

const H1 = styled.h1`
  color: black;
  font-size: 14pt;
  margin: 10px 0;
`;

const H2 = styled.h1`
  color: gray;
  font-size: 10pt;
`;

export const Option = (props: Props): JSX.Element => {
  const { title, description, isOpenAll } = props;
  const [isOpen, setIsOpen] = useState(isOpenAll);
  const [isClosing, setIsClosing] = useState(false);

  const handleClick = () => {
    if (isOpen) {
      setIsClosing(true);
    } else {
      setIsOpen(true);
    }
  };

  useEffect(() => {
    setIsOpen(isOpenAll);
  }, [isOpenAll]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (isClosing) {
        setIsOpen(false);
        setIsClosing(false);
      }
    }, 200);
    return () => clearTimeout(timer);
  }, [isClosing]);

  return (
    <Wrapper animation={!isOpen || isClosing ? heightClose : heightOn}>
      <H1 onClick={handleClick}>{title}</H1>
      {isOpen && (
        <Content animation={isClosing ? closeAnimation : openAnimation}>
          <H2>{description}</H2>
        </Content>
      )}
    </Wrapper>
  );
};
