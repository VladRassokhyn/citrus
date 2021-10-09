import { useCallback, useEffect, useRef, useState } from 'react';
import styled, { keyframes, Keyframes } from 'styled-components';
import { FixLater } from '../../types';
import { v4 as uuid } from 'uuid';

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
  console.log(index, index * document.body.clientWidth);
  return keyframes`
    0% {margin-left: -${prevIndex * document.body.clientWidth}px;}
    100% {margin-left: -${index * document.body.clientWidth}px;}
    `;
};

export const Slider = ({ children }: Props): JSX.Element => {
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [sliderIndex, setSliderIndex] = useState(0);
  const [swipeAnimation, setSwapAnimation] = useState<Keyframes | null>(null);
  const [swipeDir, setSwipeDir] = useState(0);
  const sideBarRef: FixLater = useRef(null);

  const handleTouchStart = useCallback(
    (e: FixLater) => {
      setTouchStart(e.touches[0].clientX);
    },
    [touchStart],
  );

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
    if (touchEnd !== 0) {
      if (swipeDir === 1) {
        const animation = createAnimation(sliderIndex - 1, sliderIndex);
        setSwapAnimation(animation);
      } else {
        const animation = createAnimation(sliderIndex + 1, sliderIndex);
        setSwapAnimation(animation);
      }
    }
  }, [touchEnd]);

  return (
    <SlideBar
      animation={swipeAnimation}
      ref={sideBarRef}
      onTouchStart={handleTouchStart}
      onTouchEnd={(e) => handleTouchEnd(e, children.length - 1)}
    >
      {children}
    </SlideBar>
  );
};
