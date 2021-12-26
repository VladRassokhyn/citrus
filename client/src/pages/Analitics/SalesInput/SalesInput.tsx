import React, { useState } from 'react';
import styled from 'styled-components';

type Props = {
  submitFn: (value: string) => void;
};

type StyleProps = {
  disabled?: boolean;
};

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Input = styled.textarea`
  height: 100px;
  width: 100%;
  font-size: 4pt;
`;

const SubmitBlock = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 40px;
`;

const Button = styled.button<StyleProps>`
  background-color: ${(props) => (props.disabled ? '#aaa' : 'var(--color-button)')};
  color: white;
  min-width: 100px;
  height: 30px;
  border: 0;
  border-radius: 5px;
  transition: linear 0.3s;
  ${(props) =>
    !props.disabled &&
    `&:hover {
      cursor: pointer;
      background-color: #1890ff;
    }`}
`;

export const SalesInput = (props: Props): JSX.Element => {
  const { submitFn } = props;
  const [value, setValue] = useState('');

  return (
    <Wrapper>
      <Input value={value} onChange={(e) => setValue(e.target.value)} />
      <SubmitBlock>
        <Button onClick={() => submitFn(value)}>Сохранить</Button>
      </SubmitBlock>
    </Wrapper>
  );
};
