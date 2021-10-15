import { useState } from 'react';
import styled, { Keyframes, keyframes } from 'styled-components';
import { FixLater } from '../../lib/globalTypes';

type Props = {
  title: string;
  children?: JSX.Element | JSX.Element[];
  width?: string;
  height?: string;
  sized?: boolean;
};

type Position = {
  x: number;
  y: number;
  height: number;
  width: number;
};

type WrapperProps = {
  height?: string;
  width?: string;
  isOpen: boolean;
  openAnimation?: Keyframes | null;
};

type TitleProps = {
  isOpen: boolean;
};

type ContentProps = {
  isOpen: boolean;
};

const Wrapper = styled.div<WrapperProps>`
  width: ${(props) => props.width || ''}px;
  height: ${(props) => props.height || '50'}px;
  animation: ${(props) =>
      props.isOpen ? props.openAnimation : props.openAnimation}
    0.3s forwards;
  background-color: white;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h1<TitleProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16pt;
  width: 100%;
  min-height: 50px;
  background-color: ${(props) =>
    props.isOpen ? 'var(--color-button)' : 'white'};
  color: ${(props) => (props.isOpen ? 'white' : 'var(--color-stroke)')};
  transition: linear 0.3s;
`;

const Content = styled.div<ContentProps>`
    
    transition: linear: 0.3s;
`;

export const CollapsedItem = (props: Props): JSX.Element => {
  const { title, children, width, height, sized = false } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [openAnimation, setOpenAnimation] = useState<Keyframes | null>(null);
  const [closePosition, setClosePosition] = useState<Position | null>(null);

  const handleOpen = (e: FixLater) => {
    if (!isOpen) {
      const elemRect = e.target.getBoundingClientRect();
      setClosePosition({
        x: elemRect.x,
        y: elemRect.y,
        width: elemRect.width,
        height: elemRect.height,
      });
      const animation = createAnimation(
        false,
        elemRect.x,
        elemRect.y,
        elemRect.width,
        elemRect.height,
        sized,
      );
      setOpenAnimation(animation);
    } else {
      if (closePosition) {
        const animation = createAnimation(
          true,
          closePosition.x,
          closePosition.y,
          closePosition.width,
          closePosition.height,
          sized,
        );
        setOpenAnimation(animation);
      }
    }
    setIsOpen((prev) => !prev);
  };

  return (
    <Wrapper
      openAnimation={openAnimation}
      isOpen={isOpen}
      width={width}
      height={height}
    >
      <Title onClick={handleOpen} isOpen={isOpen}>
        {title}
      </Title>
      <Content isOpen={isOpen}>{isOpen && children}</Content>
    </Wrapper>
  );
};

const createAnimation = (
  isOpen: boolean,
  x: number,
  y: number,
  w: number,
  h: number,
  sized: boolean,
) => {
  if (sized) {
    return keyframes`
      ${isOpen ? '0' : '100'}% {
            height: ${isOpen ? h : '100'}%
        }
        ${!isOpen ? '0' : '100'}% {
            height: ${isOpen ? h : '100'}%
        }
    `;
  }

  return keyframes`
        ${isOpen ? '0' : '100'}% {
            position: absolute;
            top: 50px;
            left: 0;
            width: 100vw;
            height: 100vh;
        }
        ${!isOpen ? '0' : '100'}% {
            ${!isOpen && 'position: absolute;'}
            top: ${y}px;
            left: ${x}px;
            width: ${w}px;
            height: ${h}px;
        }
    `;
};
