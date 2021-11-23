import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import { Modal } from '../Modal';

type Props = {
  confirmFn: () => void;
  children: JSX.Element;
  title?: string;
};

const Wrapper = styled.div`
  width: 100%;
`;

const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
`;

const Button = styled.button`
  width: 100%;
  margin-top: 15px;
  height: 35px;
  background-color: var(--color-button);
  border-radius: 5px;
  border: 0;
  padding: 5px;
  color: white;
  font-size: 14pt;
  min-width: 110px;
`;

const H1 = styled.h1`
  color: var(--color-stroke);
  font-size: 12pt;
`;

export const Confirm = (props: Props): JSX.Element => {
  const { confirmFn, children, title } = props;
  const [isOpen, setIsOpen] = useState(false);

  const handleOk = () => {
    confirmFn();
    handleClose();
  };

  const handleOpen = useCallback(() => {
    setIsOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <>
      {isOpen && (
        <Modal onClose={handleClose}>
          <H1>{title}</H1>
          <ButtonsContainer>
            <Button onClick={handleClose}>Отмена</Button>
            <Button onClick={handleOk}>Да</Button>
          </ButtonsContainer>
        </Modal>
      )}
      <Wrapper onClick={handleOpen}>{children}</Wrapper>
    </>
  );
};
