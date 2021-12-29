import React, { useCallback, TouchEvent, useEffect, useState } from 'react';
import styled, { keyframes, Keyframes } from 'styled-components';
import arrowLeft from '@static/arrowLeft.svg';
import arrowRight from '@static/arrowRight.svg';

type Props = {
  children: JSX.Element[];
};

type SlideBarProps = {
  animation: Keyframes | null;
};

const SlideBar = styled.div<SlideBarProps>`
  display: flex;
  flex-direction: row;
  flex-wrap: no-wrap;
  overflow-x: hidden;
  animation: ${(props) => props.animation} 0.3s forwards;
`;

const createAnimation = (prevIndex: number, index: number) => {
  return keyframes`
    0% {margin-left: -${prevIndex * document.body.clientWidth}px;}
    100% {margin-left: -${index * document.body.clientWidth}px;}
    `;
};

const NavBtn = styled.button<{ isLeft?: boolean }>`
  position: fixed;
  ${(props) => (props.isLeft ? 'left: 0' : 'right: 0')};
  top: 40%;
  width: 7vw;
  height: 170px;
  border: 1px solid #f0f0f0;
  border-radius: 5px;
  @media (min-width: 559px) {
    width: 50px;
    &:hover {
      cursor: pointer;
    }
  }
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
`;

export const Slider = ({ children }: Props): JSX.Element => {
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [sliderIndex, setSliderIndex] = useState(0);
  const [swipeAnimation, setSwapAnimation] = useState<Keyframes | null>(null);
  const [swipeDir, setSwipeDir] = useState(0);
  const [isClick, setIsClick] = useState(false);

  const handleTouchStart = useCallback(
    (e: TouchEvent<HTMLDivElement>) => {
      setTouchStart(e.touches[0].clientX);
    },
    [touchStart],
  );

  const handleBtnLeft = useCallback(() => {
    setIsClick(true);
    setSwipeDir(0);
    setSliderIndex((prev) => prev - 1);
  }, []);

  const handleBtnRight = useCallback(() => {
    setIsClick(true);
    setSwipeDir(1);
    setSliderIndex((prev) => prev + 1);
  }, []);

  const handleTouchEnd = (e: TouchEvent<HTMLDivElement>, length: number) => {
    const end = e.changedTouches[0].clientX;
    setTouchEnd(e.changedTouches[0].clientX);
    if (touchStart > end && sliderIndex < length && touchStart - end > 50) {
      setSliderIndex((prev) => prev + 1);
      setSwipeDir(1);
    }
    if (touchStart < touchEnd && sliderIndex > 0 && end - touchStart > 50) {
      setSliderIndex((prev) => prev - 1);
      setSwipeDir(0);
    }
  };

  useEffect(() => {
    if ((touchEnd !== 0 && (touchEnd - touchStart > 50 || touchStart - touchEnd > 50)) || isClick) {
      const direction = swipeDir === 1 ? sliderIndex - 1 : sliderIndex + 1;
      const animation = createAnimation(direction, sliderIndex);
      setSwapAnimation(animation);
    }
  }, [sliderIndex]);

  return (
    <>
      {sliderIndex > 0 && (
        <NavBtn isLeft onClick={handleBtnLeft}>
          <Img src={arrowLeft} />
        </NavBtn>
      )}
      {sliderIndex !== children.length - 1 && (
        <NavBtn onClick={handleBtnRight}>
          <Img src={arrowRight} />
        </NavBtn>
      )}
      <SlideBar
        animation={swipeAnimation}
        onTouchStart={handleTouchStart}
        onTouchEnd={(e) => handleTouchEnd(e, children.length - 1)}
      >
        {children}
      </SlideBar>
    </>
  );
};
