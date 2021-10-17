import React from 'react';
import { ChangeEvent } from 'react';
import styled from 'styled-components';
import { FixLater } from '../../lib/globalTypes';

type Props = {
  disabled?: boolean;
  register?: FixLater;
  label?: string;
  password?: boolean;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  vertical?: boolean;
};

type FieldProps = {
  vertical?: boolean;
};

const Field = styled.div<FieldProps>`
  width: 100%;
  display: flex;
  flex-direction: ${(props) => (props.vertical ? 'column' : 'row')};
  ${(props) => props.vertical && 'gap: 20px;'}
  justify-content: space-between;
  align-items: center;
`;

const Input = styled.input`
  width: 70%;
  border: 1px solid #d1d1d1;
  border-radius: 5px;
  padding: 3px;
  height: 25px;
  font-size: 10pt;
`;

const H1 = styled.h1`
  font-size: 12pt;
  color: var(--color-stroke);
`;

export const InputField = (props: Props): JSX.Element => {
  const {
    disabled,
    register,
    label,
    password,
    value,
    onChange,
    vertical,
  } = props;
  return (
    <Field vertical={vertical}>
      <H1>{label}</H1>
      <Input
        disabled={disabled}
        {...register}
        type={password && 'password'}
        value={value && value}
        onChange={onChange}
      />
    </Field>
  );
};
