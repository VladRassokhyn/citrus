import styled from 'styled-components';

type Props = {
  children: JSX.Element | JSX.Element[];
  onClose: () => void;
};

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
  z-index: 100;
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
  z-index: 200;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
`;

export const Modal = (props: Props): JSX.Element => {
  const { children, onClose } = props;
  return (
    <>
      <Wrapper onClick={onClose}></Wrapper>
      <Content>{children}</Content>
    </>
  );
};