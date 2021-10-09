//import { useState, useEffect } from 'react';
import styled, { Keyframes, keyframes } from 'styled-components';
import { bounceInUp } from 'react-animations';
import { CollapsedItem } from '../../Components/CollapsedItem';
import { menus } from './menus';
import { useCallback, useEffect, useRef, useState } from 'react';
import { FixLater } from '../../types';
import { Option } from './Option';

const bounceShow = keyframes`${bounceInUp}`;

type SlideBarProps = {
  animation: Keyframes | null;
};

const Wrapper = styled.div`
  padding: 20px;
  min-height: 600px;
  display: flex;
  flex-direction: column;
  animation: 1s ${bounceShow};
  align-items: center;
  justify-content: center;
`;

const SlideBar = styled.div<SlideBarProps>`
  display: flex;
  flex-direction: row;
  flex-wrap: no-wrap;
  overflow-x: hidden;
  animation: ${(props) => props.animation} 0.3s forwards;
`;

const Slide = styled.div`
  display: flex;
  flex-direction: column;
  padding: 5vw;
  min-width: 90vw;
  min-height: 500px;
`;

const H1 = styled.h1`
  text-align: center;
  color: var(--color-stroke);
  font-size: 18pt;
`;

const H3 = styled.h1`
  color: gray;
  opacity: 0.8;
  text-align: center;
  font-size: 13pt;
  margin: 10px;
`;

const Button = styled.button`
  width: 100%;
  padding: 10px 0;
  background-color: var(--color-button);
  color: white;
  border: 0;
  border-radius: 5px;
`;

export const CmMenu = (): JSX.Element => {
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [sliderIndex, setSliderIndex] = useState(0);
  const [isOpenAll, setIsOpenAll] = useState(false);
  const [swipeAnimation, setSwapAnimation] = useState<Keyframes | null>(null);
  const [swipeDir, setSwipeDir] = useState(0);
  const sideBarRef: FixLater = useRef(null);

  const handleOpenAll = useCallback(() => {
    setIsOpenAll((prev) => !prev);
  }, []);

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
    <Wrapper>
      {menus.map((menu) => (
        <CollapsedItem key={menu.id} title={menu.title}>
          <SlideBar
            animation={swipeAnimation}
            ref={sideBarRef}
            onTouchStart={handleTouchStart}
            onTouchEnd={(e) => handleTouchEnd(e, menu.items.length - 1)}
          >
            {menu.items.map((item) => (
              <Slide key={item.id}>
                <H1>{item.displayName}</H1>
                <H3>{item.price}грн.</H3>
                <Button onClick={handleOpenAll}>Показать все</Button>
                {item.includes &&
                  item.includes.map((inc) => (
                    <Option
                      key={inc.id}
                      title={inc.title}
                      description={inc.description}
                      isOpenAll={isOpenAll}
                    />
                  ))}
              </Slide>
            ))}
          </SlideBar>
        </CollapsedItem>
      ))}
    </Wrapper>
  );
};

const createAnimation = (prevIndex: number, index: number) => {
  console.log(index, index * document.body.clientWidth);
  return keyframes`
    0% {margin-left: -${prevIndex * document.body.clientWidth}px;}
    100% {margin-left: -${index * document.body.clientWidth}px;}
    `;
};
