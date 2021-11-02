import React from 'react';
import ReactDOM from 'react-dom';
import styled, { keyframes } from 'styled-components';
import { bounceInUp } from 'react-animations';

type Props = {
  children: JSX.Element | JSX.Element[];
  onClose: () => void;
};

const bounceAnimation = keyframes`${bounceInUp}`;

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: black;
  opacity: 0.6;
  z-index: 999;
`;

const Content = styled.div`
  position: absolute;
  left: 5%;
  top: 30%;
  padding: 5%;
  width: 80%;
  min-height: 100px;
  background-color: white;
  opacity: 1;
  z-index: 1000;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  animation: ${bounceAnimation} 0.5s forwards;
`;

export const Modal = (props: Props): JSX.Element => {
  const { children, onClose } = props;
  const modalRoot = document.getElementById('modal');
  return ReactDOM.createPortal(
    <>
      <Wrapper onClick={onClose}></Wrapper>
      <Content>{children}</Content>
    </>,
    modalRoot!,
  );
};
