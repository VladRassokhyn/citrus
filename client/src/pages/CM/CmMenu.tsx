//import { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { bounceInUp } from 'react-animations';
import { CollapsedItem } from '../../Components/CollapsedItem';
import { menus } from './menus';
import { useEffect, useRef, useState } from 'react';
import { FixLater } from '../../types';
import { Option } from './Option';

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

export const CmMenu = (): JSX.Element => {
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [sliderIndex, setSliderIndex] = useState(0);
  const sideBarRef: FixLater = useRef(null);

  const handleTouchStart = (e: FixLater) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: FixLater, length: number) => {
    const end = e.changedTouches[0].clientX;
    setTouchEnd(e.changedTouches[0].clientX);
    if (touchStart > end && sliderIndex < length && touchStart - end > 50) {
      setSliderIndex((prev) => prev + 1);
    }
    if (touchStart < touchEnd && sliderIndex > 0 && end - touchStart > 50) {
      setSliderIndex((prev) => prev - 1);
    }
  };

  useEffect(() => {
    sideBarRef.current &&
      sideBarRef.current.scrollTo({
        left: sliderIndex * document.body.clientWidth,
        behavior: 'smooth',
      });
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
                <H3>{item.price}грн.</H3>
                {item.includes &&
                  item.includes.map((inc) => (
                    <Option
                      key={inc.id}
                      title={inc.title}
                      description={inc.description}
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
