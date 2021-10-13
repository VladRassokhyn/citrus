import styled from 'styled-components';
import { FixLater } from '../../lib/globalTypes';

type Props = {
  disabled?: boolean;
  register?: FixLater;
  label?: string;
  password?: boolean;
};

const Field = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
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
  const { disabled, register, label, password } = props;
  return (
    <Field>
      <H1>{label}</H1>
      <Input disabled={disabled} {...register} type={password && 'password'} />
    </Field>
  );
};
