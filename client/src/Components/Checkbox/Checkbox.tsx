import styled from 'styled-components';
import { FixLater } from '../../lib/globalTypes';

type Props = {
  handleChange: () => void;
  value: boolean;
  label?: string;
  fullSize?: boolean;
  register?: FixLater;
};

type WrapperProps = {
  fullSize?: boolean;
};

const H1 = styled.h1`
  font-size: 10pt;
`;

const Wrapper = styled.div<WrapperProps>`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 5px;
  width: ${(props) => props.fullSize && '100%'};
  height: 30px;
`;

const Input = styled.input`
  width: 20px;
  height: 20px;
  padding: 5px;
`;

export const Checkbox = (props: Props): JSX.Element => {
  const { handleChange, value, label, fullSize, register } = props;
  const handleClick = () => {
    handleChange();
  };
  return (
    <Wrapper fullSize={fullSize}>
      <Input
        {...register}
        type="checkbox"
        checked={value}
        onChange={handleChange}
      />
      <H1 onClick={handleClick}>{label}</H1>
    </Wrapper>
  );
};
