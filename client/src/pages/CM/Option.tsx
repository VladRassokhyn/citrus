import { useEffect, useState } from 'react';
import styled, { Keyframes, keyframes } from 'styled-components';
import { zoomIn, zoomOut } from 'react-animations';

type Props = {
  title: string;
  description: string;
};

type ContentProps = {
  animation: Keyframes;
};

const openAnimation = keyframes`${zoomIn}`;
const closeAnimation = keyframes`${zoomOut}`;

const Wrapper = styled.div`
  width: 100%;
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
  max-height: 200px;
  color: gray;
  font-size: 10pt;
`;

export const Option = (props: Props): JSX.Element => {
  const { title, description } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const handleClick = () => {
    if (isOpen) {
      setIsClosing(true);
    } else {
      setIsOpen(true);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (isClosing) {
        setIsOpen(false);
        setIsClosing(false);
      }
    }, 100);
    return () => clearTimeout(timer);
  }, [isClosing]);

  return (
    <Wrapper>
      <H1 onClick={handleClick}>{title}</H1>
      {isOpen && (
        <Content animation={isClosing ? closeAnimation : openAnimation}>
          <H2>{description}</H2>
        </Content>
      )}
    </Wrapper>
  );
};
