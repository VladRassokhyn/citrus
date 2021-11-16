import React from 'react';
import styled from 'styled-components';
import { FixLater } from '../../lib/globalTypes';

type Props = {
  handleChange?: () => void;
  value: boolean;
  label?: string;
  fullSize?: boolean;
  register?: FixLater;
};

type WrapperProps = {
  fullSize?: boolean;
  value?: boolean;
};

const H1 = styled.h1<WrapperProps>`
  height: 20px;
  width: 100%;
  padding: 8px;
  display: flex;
  align-items: center;
  color: ${(props) => props.value && 'white'};
  font-size: 10pt;
  transition: linear 0.3s;
`;

const Wrapper = styled.div<WrapperProps>`
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: ${(props) => props.value && 'var(--color-button)'};
  width: ${(props) => props.fullSize && '100%'};
  height: 30px;
`;

const Input = styled.input`
  width: 20px;
  height: 20px;
`;

export const Checkbox = (props: Props): JSX.Element => {
  const { handleChange, value, label, fullSize, register } = props;
  const handleClick = () => {
    handleChange && handleChange();
  };
  return (
    <Wrapper fullSize={fullSize} value={value}>
      <Input {...register} type="checkbox" checked={value} onChange={handleChange} />
      <H1 value={value} onClick={handleClick}>
        {label}
      </H1>
    </Wrapper>
  );
};
