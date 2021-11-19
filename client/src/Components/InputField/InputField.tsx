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
  isError?: boolean;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  vertical?: boolean;
};

type FieldProps = {
  vertical?: boolean;
  isError?: boolean;
};

const Field = styled.div<FieldProps>`
  width: 100%;
  display: flex;
  gap: 10px;
  flex-direction: ${(props) => (props.vertical ? 'column' : 'row')};
  ${(props) => props.vertical && 'gap: 20px;'}
  justify-content: space-between;
  align-items: center;
`;

const Input = styled.input<FieldProps>`
  width: 100%;
  border: 1px solid ${(props) => (props.isError ? '#ef9a9a' : '#d1d1d1')};
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
  const { disabled, register, label, password, value, onChange, vertical, isError } = props;
  return (
    <Field vertical={vertical}>
      <H1>{label}</H1>
      {!!register ? (
        <Input
          isError={isError}
          disabled={disabled}
          {...register}
          type={password ? 'password' : 'text'}
        />
      ) : (
        <Input
          isError={isError}
          disabled={disabled}
          type={password ? 'password' : 'text'}
          value={value && value}
          onChange={onChange}
        />
      )}
    </Field>
  );
};
