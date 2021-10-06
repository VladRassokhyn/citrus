//import { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { bounceInUp } from 'react-animations';
import { CollapsedItem } from '../../Components/CollapsedItem';
import { menus } from './menus';
import { useEffect, useRef, useState } from 'react';
import { FixLater } from '../../types';

const bounceShow = keyframes`${bounceInUp}`;

const Wrapper = styled.div`
  padding: 20px;
  min-height: 600px;
  display: flex;
  flex-direction: column;
  animation: 1s ${bounceShow};
  align-items: center;
  justify-content: center;
`;

const SlideBar = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: no-wrap;
  overflow-x: hidden;
`;

const Slide = styled.div`
  min-width: 100vw;
  min-height: 500px;
`;

const H1 = styled.h1`
  text-align: center;
`;

export const CmMenu = (): JSX.Element => {
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [sliderIndex, setSliderIndex] = useState(0);
  const sideBarRef: FixLater = useRef(null);

  const handleTouchStart = (e: FixLater) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: FixLater, length: number) => {
    setTouchEnd(e.changedTouches[0].clientX);
    if (touchStart > touchEnd && sliderIndex < length) {
      setSliderIndex((prev) => prev + 1);
    }
    if (touchStart < touchEnd && sliderIndex > 0) {
      setSliderIndex((prev) => prev - 1);
    }
  };

  useEffect(() => {
    console.log(sliderIndex);
    sideBarRef.current &&
      sideBarRef.current.scrollTo({
        left: sliderIndex * document.body.clientWidth,
        behavior: 'smooth',
      });
    setTouchStart(0);
    setTouchStart(0);
  }, [sliderIndex]);

  return (
    <Wrapper>
      {menus.map((menu) => (
        <CollapsedItem key={menu.id} title={menu.title}>
          <SlideBar
            ref={sideBarRef}
            onTouchStart={handleTouchStart}
            onTouchEnd={(e) => handleTouchEnd(e, menu.items.length - 1)}
          >
            {menu.items.map((item) => (
              <Slide key={item.id}>
                <H1>{item.displayName}</H1>
              </Slide>
            ))}
          </SlideBar>
        </CollapsedItem>
      ))}
    </Wrapper>
  );
};
