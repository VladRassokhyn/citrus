import styled from 'styled-components';
import Selector from 'react-select';

type Props = {
  isOpen: boolean;
};

type StyleProps = {
  isOpen?: boolean;
};

const Wrapper = styled.div<StyleProps>`
  width: 100%;
  opacity: ${(props) => (props.isOpen ? '1' : '0')};
  height: ${(props) => (props.isOpen ? '100px' : '0px')};
  transition: height 0.3s;
`;

export const TodoFilters = (props: Props): JSX.Element => {
  const { isOpen } = props;
  return (
    <Wrapper isOpen={isOpen}>
      <Selector defaultValue={{ label: 'Сначала Важные', value: 'Важно' }} />
    </Wrapper>
  );
};
