import React, { useCallback } from 'react';
import { useEffect, useState } from 'react';
import styled, { Keyframes, keyframes } from 'styled-components';
import { zoomIn, zoomOut } from 'react-animations';

type Props = {
  title: string;
  isOpenAll?: boolean;
  index?: number;
  price?: number | undefined;
  children: JSX.Element | JSX.Element[] | string;
  titleBgColor?: string;
  titleColor?: string;
  marginContent?: boolean;
};

type ContentProps = {
  animation: Keyframes;
  marginContent?: boolean;
};

type TitleProps = {
  bgColor?: string;
  titleColor?: string;
  withPrice?: boolean;
};

const openAnimation = keyframes`${zoomIn}`;
const closeAnimation = keyframes`${zoomOut}`;
const heightOn = keyframes`0%{height: 30px} 100% {height: 100%}`;
const heigthClose = keyframes`0%{height: 110px} 100% {height: 30px}`;

const Wrapper = styled.div<ContentProps>`
  min-height: 30px;
  width: 100%;
  animation: ${(props) => props.animation} 0.3s forwards;
`;

const Content = styled.div<ContentProps>`
  margin-left: ${(props) => props.marginContent && '30px'};
  animation: ${(props) => props.animation} 0.3s forwards;
`;

const Title = styled.div<TitleProps>`
  display: flex;
  padding-left: 10px;
  align-items: center;
  justify-content: space-between;
  background-color: ${(props) => props.bgColor};
  &:hover {
    cursor: pointer;
  }
`;

const H1 = styled.h1<TitleProps>`
  width: 100%;
  color: ${(props) => (props.titleColor ? props.titleColor : 'black')};
  font-size: ${(props) => (props.withPrice ? '8pt' : '12pt')};
  margin: 10px 0;
`;

export const Accordion = (props: Props): JSX.Element => {
  const {
    title,
    isOpenAll,
    index,
    price,
    children,
    titleBgColor,
    titleColor,
    marginContent,
  } = props;

  const [isOpen, setIsOpen] = useState(isOpenAll);
  const [isClosing, setIsClosing] = useState(false);

  const handleClick = useCallback(() => {
    if (isOpen) {
      setIsClosing(true);
    } else {
      setIsOpen(true);
    }
  }, [isOpen]);

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
    <Wrapper animation={!isOpen || isClosing ? heigthClose : heightOn}>
      <Title bgColor={titleBgColor && titleBgColor}>
        <H1
          titleColor={titleColor && titleColor}
          withPrice={price ? true : false}
          onClick={handleClick}
        >
          {index ? index + '. ' + title : title}
        </H1>
        {price && <h4>{price}</h4>}
      </Title>
      {isOpen && (
        <Content
          marginContent={marginContent}
          animation={isClosing ? closeAnimation : openAnimation}
        >
          {children}
        </Content>
      )}
    </Wrapper>
  );
};
