import React from 'react';
import { useCallback, useEffect, useState } from 'react';
import styled, { keyframes, Keyframes } from 'styled-components';
import { FixLater } from '../../lib/globalTypes';
import arrowLeft from '../../static/arrowLeft.svg';
import arrowRight from '../../static/arrowRight.svg';

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

const NavBtnLeft = styled.button`
  position: fixed;
  left: 0;
  top: 40%;
  width: 7vw;
  height: 170px;
  border: 1px solid #f0f0f0;
  border-radius: 5px;
`;

const NavBtnRight = styled.button`
  position: fixed;
  right: 0;
  top: 40%;
  width: 7vw;
  height: 170px;
  border: 1px solid #f0f0f0;
  border-radius: 5px;
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
    (e: FixLater) => {
      setTouchStart(e.touches[0].clientX);
    },
    [touchStart],
  );

  const handleBtnLeft = () => {
    setIsClick(true);
    setSwipeDir(0);
    setSliderIndex((prev) => prev - 1);
  };

  const handleBtnRight = () => {
    setIsClick(true);
    setSwipeDir(1);
    setSliderIndex((prev) => prev + 1);
  };

  const handleTouchEnd = (e: FixLater, length: number) => {
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
    if (
      (touchEnd !== 0 &&
        (touchEnd - touchStart > 50 || touchStart - touchEnd > 50)) ||
      isClick
    ) {
      if (swipeDir === 1) {
        const animation = createAnimation(sliderIndex - 1, sliderIndex);
        setSwapAnimation(animation);
      } else {
        const animation = createAnimation(sliderIndex + 1, sliderIndex);
        setSwapAnimation(animation);
      }
    }
  }, [sliderIndex]);

  return (
    <>
      {sliderIndex > 0 && (
        <NavBtnLeft onClick={handleBtnLeft}>
          <Img src={arrowLeft} />
        </NavBtnLeft>
      )}
      {sliderIndex !== children.length - 1 && (
        <NavBtnRight onClick={handleBtnRight}>
          <Img src={arrowRight} />
        </NavBtnRight>
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
