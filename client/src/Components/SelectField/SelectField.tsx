import styled from 'styled-components';
import Select from 'react-select';
import { FixLater } from '../../lib/globalTypes';

type Props = {
  options: { value: string | number; label: string }[];
  name: string;
  handleChange?: (...args: FixLater) => void;
  dirColumn?: boolean;
  label: string;
};

type StyleProps = {
  dirColumn?: boolean;
};

const Wrapper = styled.div<StyleProps>`
  padding: 10px 5%;
  display: flex;
  flex-direction: ${(props) => (props.dirColumn ? 'column' : 'row')};
  justify-content: space-between;
  align-items: center;
  gap: 10px;
`;

const Label = styled.h1`
  width: 50%;
  color: var(--color-stroke);
  font-size: 12pt;
  display: flex;
  align-items: center;
`;

export const SelectField = (props: Props): JSX.Element => {
  const { dirColumn, options, name, handleChange, label } = props;

  return (
    <Wrapper dirColumn={dirColumn}>
      <Label>{label}</Label>
      <div style={{ width: '100%' }}>
        <Select placeholder={'Выбор'} name={name} options={options} onChange={handleChange} />
      </div>
    </Wrapper>
  );
};
