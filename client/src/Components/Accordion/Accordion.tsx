import { useEffect, useState } from 'react';
import styled, { Keyframes, keyframes } from 'styled-components';
import { zoomIn, zoomOut } from 'react-animations';

type Props = {
  title: string;
  isOpenAll?: boolean;
  index?: number;
  price?: number | undefined;
  children: JSX.Element | JSX.Element[];
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

const Title = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const H1 = styled.h1<{ withPrice: boolean }>`
  color: black;
  font-size: ${(props) => (props.withPrice ? '8pt' : '12pt')};
  margin: 10px 0;
`;

export const Accordion = (props: Props): JSX.Element => {
  const { title, isOpenAll, index, price, children } = props;
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
      <Title>
        <H1 withPrice={price ? true : false} onClick={handleClick}>
          {index ? index + '. ' + title : title}
        </H1>
        {price && <h4>{price}</h4>}
      </Title>
      {isOpen && (
        <Content animation={isClosing ? closeAnimation : openAnimation}>
          {children}
        </Content>
      )}
    </Wrapper>
  );
};
