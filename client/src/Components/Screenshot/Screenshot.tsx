import ReactDOM from 'react-dom';
import styled, { keyframes } from 'styled-components';
import { slideInLeft, slideOutLeft } from 'react-animations';
import React, { useEffect, useState } from 'react';

type Props = {
  image: string; //base64
  onClose: (img: string | null) => void;
};

type StyleProps = {
  isClosing: boolean;
};

const inAnimation = keyframes`${slideInLeft}`;
const outAnimation = keyframes`${slideOutLeft}`;

const Wrapper = styled.div<StyleProps>`
  position: absolute;
  left: 50px;
  bottom: 15px;
  width: 150px;
  height: 230px;
  animation: ${(props) => (props.isClosing ? outAnimation : inAnimation)} 0.3s;
`;

const Img = styled.img`
  width: 150px;
  height: 230px;
`;

export const Screenshot = (props: Props): JSX.Element => {
  const parent = document.getElementById('screenshot');
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsClosing(true);
    }, 2850);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      props.onClose(null);
    }, 3000);
    return () => clearTimeout(timer);
  }, [props.image]);

  return ReactDOM.createPortal(
    <Wrapper isClosing={isClosing}>
      <Img src={props.image} />
    </Wrapper>,
    parent as Element,
  );
};
